import { ghStore } from '$lib/stores';
import { error, redirect } from '@sveltejs/kit';
import type { AuthorisedRepository } from '../../../../../(marketing)/+layout.server';
import type { PageServerLoadEvent } from './$types';
import { VITE_OPEN_REGISTRY_BACKEND_URL } from '$env/static/private';

export const load = async (event: PageServerLoadEvent) => {
	const { cookies, url, fetch } = event;

	const sessionId = cookies.get('session_id');
	const installationId = url.searchParams.get('installation_id');
	const action = url.searchParams.get('setup_action');

	if (action && (action === 'install' || action === 'update')) {
		try {
			const setupResp = await fetch(
				`${VITE_OPEN_REGISTRY_BACKEND_URL}/github/app/setup/finish?installation_id=${installationId}`,
				{
					method: 'POST',
					headers: {
						cookie: `session_id=${sessionId}`
					},
					credentials: 'include',
					redirect: 'follow'
				} as RequestInit
			);
			const resp = await setupResp.json();
			if (setupResp.status !== 200) {
				throw error(400, {
					message: resp?.message
				});
			}
		} catch (err) {
			throw error(err?.status, {
				message: err?.body.message as string
			});
		}
	}

	const resp = await fetch(`${VITE_OPEN_REGISTRY_BACKEND_URL}/github/app/repo/list`, {
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
			repoList: jsonResp,
			githubUsername: repository?.owner?.login
		};
	}

	throw error(500, {
		message: 'Got invalid response from GitHub Server'
	});
};
