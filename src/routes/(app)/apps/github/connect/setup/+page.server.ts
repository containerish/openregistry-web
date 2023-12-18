import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/public';
import type { AuthorisedRepository } from '$lib/types';

export const load: PageServerLoad = async ({ cookies, url, fetch }) => {
    const sessionId = cookies.get('session_id')!;
    const installationId = url.searchParams.get('installation_id');

    await handleGitHubAppInstallation(url, sessionId);
    const resp = await fetch(`${env.PUBLIC_OPEN_REGISTRY_BACKEND_URL}/github/app/repo/list`, {
        headers: {
            cookie: `session_id=${sessionId}`,
        },
    });

    const data = await resp.json();
    if (resp.status === 200) {
        const jsonResp = data as AuthorisedRepository[];
        if (jsonResp && jsonResp.length > 0) {
            const repository = jsonResp[0].repository;
            return {
                repoList: jsonResp.filter((item) => item.branches.length > 0),
                githubUsername: repository.owner?.login,
                githubAppInstallationId: Number(installationId),
            };
        }
    }

    const errMsg = (data as { error: string; }).error;
    console.log('error response from GH: ', resp.status, data);
    if (resp.status === 400 && errMsg.includes('GitHub identity not found')) {
        // we need to initialise & perform the GitHub auth flow
        redirect(307, '/apps/github/connect');
    }

    return {
        repoList: [] as AuthorisedRepository[],
        githubUsername: undefined,
        githubAppInstallationId: Number(installationId),
    };
};

async function handleGitHubAppInstallation(url: URL, sessionId: string) {
    const installationId = url.searchParams.get('installation_id');
    const action = url.searchParams.get('setup_action');

    if (action && (action === 'install' || action === 'update')) {
        const uri = `${env.PUBLIC_OPEN_REGISTRY_BACKEND_URL}/github/app/setup/finish?installation_id=${installationId}`;

        const setupResp = await fetch(uri, {
            method: 'POST',
            headers: {
                cookie: `session_id=${sessionId}`,
            },
        });

        if (setupResp.status !== 202) {
            const resp = await setupResp.json();
            error(400, {
                message: resp.error,
            });
        }
    }
}
