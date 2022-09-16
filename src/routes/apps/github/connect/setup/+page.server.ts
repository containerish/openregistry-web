import { ghStore } from '$lib/stores';
import type { PageServerLoadEvent } from '.svelte-kit/types/src/routes/auth/[slug]/$types';
import { error, redirect } from '@sveltejs/kit';
import * as cookie from 'cookie';
import type { AuthorisedRepository } from 'src/routes/+layout.server';

export async function load(loadEvent: PageServerLoadEvent) {
	const cookies = cookie.parse(loadEvent.request.headers.get('cookie') || '');
	const sessionId = cookies['session_id'];
	const installationId = loadEvent.url.searchParams.get('installation_id');
	const action = loadEvent.url.searchParams.get('setup_action');
	console.log('action: ', action);

	if (action && action === 'install') {
		try {
			const setupResp = await fetch(
				`http://localhost:5000/github/app/setup/finish?installation_id=${installationId}`,
				{
					method: 'POST',
					headers: {
						cookie: `session_id=${sessionId}`
					}
				}
			);

			console.log('resp from setup github app: ', setupResp.status);
		} catch (err) {
			throw error(500, err);
		}
	}

	const resp = await fetch('http://localhost:5000/github/app/repo/list', {
		headers: {
			cookie: `session_id=${sessionId}`
		}
	});

	console.log('just response: ', resp);

	const jsonResp = (await resp.json()) as AuthorisedRepository[];
	console.log('json response: ', jsonResp);

	ghStore.setGithubUsername(jsonResp[0].repository.owner.login);
	return {
		repoList: jsonResp,
		githubUsername: jsonResp[0].repository.owner.login
	};
}
