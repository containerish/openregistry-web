import { ghStore } from '$lib/stores';
import { error } from '@sveltejs/kit';
import type { AuthorisedRepository } from '../../../../../(marketing)/+layout.server';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/public';

export const load = (async ({ cookies, url, fetch }) => {
	const sessionId = cookies.get('session_id');
	const installationId = url.searchParams.get('installation_id');
	const action = url.searchParams.get('setup_action');

	if (action && (action === 'install' || action === 'update')) {
		const uri = `${env.PUBLIC_OPEN_REGISTRY_BACKEND_URL}/github/app/setup/finish?installation_id=${installationId}`;

		const setupResp = await fetch(uri, {
			method: 'POST',
			headers: {
				cookie: `session_id=${sessionId}`
			}
		});

		if (setupResp.status !== 202) {
			const resp = await setupResp.json();
			throw error(400, {
				message: resp.error
			});
		}
	}

	const resp = await fetch(`${env.PUBLIC_OPEN_REGISTRY_BACKEND_URL}/github/app/repo/list`, {
		headers: {
			cookie: `session_id=${sessionId}`
		}
	});

	const jsonResp = (await resp.json()) as AuthorisedRepository[];
	if (jsonResp) {
		const repository = jsonResp[0]?.repository;
		const ghUsername = repository?.owner?.login;
		ghStore.setGithubUsername(ghUsername!);
		return {
			repoList: jsonResp.filter((item) => item.branches.length > 0),
			githubUsername: repository?.owner?.login
		};
	}

	throw error(500, {
		message: 'Got invalid response from GitHub Server'
	});
}) satisfies PageServerLoad;
