import { StreamLogsRequestSchema } from "$lib/schemas/logs-api";
import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";
import type { ZodError } from "zod";
import { createPromiseClient } from "@connectrpc/connect";
import { GitHubActionsLogsService } from "@buf/containerish_openregistry.connectrpc_es/services/kon/github_actions/v1/build_logs_connect";

export const POST = (async ({ request, locals }) => {
	try {
		const ghLogsClient = createPromiseClient(
			GitHubActionsLogsService,
			locals.transport
		);
		const body = StreamLogsRequestSchema.parse(await request.json());
		const response = ghLogsClient.streamWorkflowRunLogs(body);

		const ac = new AbortController();
		const stream = new ReadableStream({
			start: async (controller) => {
				for await (const { logMessage } of response) {
					controller.enqueue(logMessage);
				}
			},
			cancel: () => {
				ac.abort();
			},
		});

		return new Response(stream, {
			headers: {
				"content-type": "text/event-stream",
			},
		});
	} catch (err) {
		console.log("error in logs:", err);
		return json((err as ZodError).flatten(), {
			status: 400,
		});
	}
}) satisfies RequestHandler;
