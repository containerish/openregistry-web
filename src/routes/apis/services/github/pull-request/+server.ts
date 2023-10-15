import { env } from '$env/dynamic/public';
import { GitHubPullRequestSchema } from '$lib/schemas/github';
import type { GitHubPullRequestType } from '$lib/schemas/github';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ fetch, request }) => {
	let body: GitHubPullRequestType;

	try {
		body = GitHubPullRequestSchema.parse(await request.json());
	} catch (err) {
		return json({ error: err }, { status: 400 });
	}

	const uri = new URL('/github/app/workflows/create', env.PUBLIC_OPEN_REGISTRY_BACKEND_URL);
	const response = await fetch(uri, {
		method: 'POST',
		body: JSON.stringify(body),
		credentials: 'include',
		redirect: 'manual'
	});
	console.log('pull request: ', response.status);

	// not modified, indicating that GitHub action is already setup
	if (response.status === 202) {
		return new Response(null, { status: response.status });
	}

	switch (response.status) {
		case 202:
			return new Response(null, { status: response.status });
		case 201:
			return json(await response.json(), { status: response.status });
		default:
			return json(await response.json(), { status: 400 });
	}
};
