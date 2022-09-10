import type { PageServerLoadEvent } from ".svelte-kit/types/src/routes/auth/[slug]/$types";
import * as cookie from 'cookie';

export async function load(loadEvent: PageServerLoadEvent) {
	const cookies = cookie.parse(loadEvent.request.headers.get('cookie') || '');
	const sessionId = cookies['session_id']
	const installationId = loadEvent.url.searchParams.get('installation_id')
	const action = loadEvent.url.searchParams.get('setup_action')

	if (action && action !== 'update') {
		const setupResp = await fetch(`http://localhost:5000/github/app/setup/finish?installation_id=${installationId}`, {
			method: 'POST',
			headers: {
				'cookie': `session_id=${sessionId}`
			}
		})
	}

	const resp = await fetch("http://localhost:5000/github/app/repo/list", {
		headers: {
			'cookie': `session_id=${sessionId}`
		}
	})
	const jsonResp = await resp.json()

	return {
		repoList: jsonResp,
		githubUsername: jsonResp[0].repository.owner.login,
	}

}
