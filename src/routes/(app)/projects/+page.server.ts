import type { PageServerLoad } from './$types';
import type { GitHubActionsProjectService } from '@buf/containerish_openregistry.connectrpc_es/services/kon/github_actions/v1/build_project_connect';
import type { PromiseClient } from '@connectrpc/connect';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ parent, locals, cookies }) => {
    const { user } = await parent();

    try {
        const client = locals.ghProjectsClient as PromiseClient<typeof GitHubActionsProjectService>;

        const response = await client.listProjects({
            ownerId: {
                value: cookies.get('session_id')?.split(':')[0],
            },
        });

        if (!response.projects || response.projects.length === 0) {
            redirect(303, '/apps/github/connect');
        }

        return {
            authenticated: !!user,
            projects: response.toJson(),
        };
    } catch (err) {
        return {
            authenticated: !!user,
            projects: null,
        };
    }
};
