import { StreamLogsRequestSchema } from '$lib/schemas/logs-api';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import type { ZodError } from 'zod';
import { createConnectTransport } from '@bufbuild/connect-web';
import { createPromiseClient } from '@bufbuild/connect';
import { GitHubActionsLogsService } from '@buf/containerish_openregistry.bufbuild_connect-es/services/kone/github_actions/v1/build_logs_connect';
import { env } from '$env/dynamic/public';

export const POST = (async ({ locals, request }) => {
	console.log('url:', env.PUBLIC_OPEN_REGISTRY_BACKEND_PROTOBUF_URL);
	try {
		const transport = createConnectTransport({
			baseUrl: env.PUBLIC_OPEN_REGISTRY_BACKEND_PROTOBUF_URL
		});

		const ghLogsClient = createPromiseClient(GitHubActionsLogsService, transport);
		const body = StreamLogsRequestSchema.parse(await request.json());
		const response = ghLogsClient.streamWorkflowRunLogs({ ...body });

		console.log('response:', response);
		const ac = new AbortController();
		const stream = new ReadableStream({
			start: async (controller) => {
				for await (const { logMessage } of response) {
					controller.enqueue(logMessage);
				}
			},
			cancel: () => {
				ac.abort();
			}
		});

		return new Response(stream, {
			headers: {
				'content-type': 'text/event-stream'
			}
		});
	} catch (err) {
		console.log('error in logs:', err);
		return json((err as ZodError).flatten(), {
			status: 400
		});
	}
}) satisfies RequestHandler;
