import type { PageServerLoad } from "./$types";
import type { GitHubActionsProjectService } from "@buf/containerish_openregistry.connectrpc_es/services/kon/github_actions/v1/build_project_connect";
import type { PromiseClient } from "@connectrpc/connect";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ parent, locals, cookies }) => {
    const { user } = await parent();
    let projects: any[] = [];

    try {
        const client = locals.ghProjectsClient as PromiseClient<
            typeof GitHubActionsProjectService
        >;

        const response = await client.listProjects({
            ownerId: {
                value: cookies.get("session_id")?.split(":")[0],
            },
        });
        projects = response.projects.map((p) => {
            return {
                projectName: p.projectName,
                ownerId: p.ownerId?.value,
                environmentVariables:
                    p.environmentVariables?.environmentVariables,
                buildSettings: {
                    ...p.buildSettings,
                },
                id: p.id?.value,
                createdAt: p.createdAt?.toDate(),
            };
        });
    } catch (err) {
        projects = [];
    }

    if (!projects || projects.length === 0) {
        throw redirect(303, "/apps/github/connect");
    }

    return {
        authenticated: !!user,
        projects,
    };
};
