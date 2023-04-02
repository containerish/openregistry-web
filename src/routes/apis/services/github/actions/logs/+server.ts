import type { RequestHandler } from './$types';
import { createConnectTransport } from '@bufbuild/connect-web';
import { createPromiseClient } from '@bufbuild/connect';
import { GitHubActionsLogsService } from '@buf/containerish_openregistry.bufbuild_connect-es/services/kone/github_actions/v1/build_logs_connect';

export const GET = (async ({ locals }) => {
	console.log('locals:', locals);

	const transport = createConnectTransport({
		baseUrl: 'http://100.77.248.53:5001'
	});
	const ghLogsClient = createPromiseClient(GitHubActionsLogsService, transport);

	const response = ghLogsClient.streamWorkflowRunLogs({
		repoName: 'Adv360-Pro-ZMK',
		repoOwner: 'jay-dee7',
		runId: BigInt(4521071102)
	});

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
}) satisfies RequestHandler;
