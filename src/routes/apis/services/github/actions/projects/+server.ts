import { createPromiseClient } from "@connectrpc/connect";
import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";
import { GitHubActionsProjectService } from "@buf/containerish_openregistry.connectrpc_es/services/kon/github_actions/v1/build_project_connect";

export const POST: RequestHandler = async ({ locals, request, cookies }) => {
	const body = await request.json();
	const userId = cookies.get("session_id")?.split(":")[1];
	console.log("userid: ", userId);
	body.owner = userId;
	body.owner_id = userId;

	const ghProjectsClient = createPromiseClient(
		GitHubActionsProjectService,
		locals.transport,
	);
	const response = await ghProjectsClient.createProject({
		id: {
			value: crypto.randomUUID(),
		},
		ownerId: {
			value: userId,
		},
		projectName: body.name,
		buildSettings: body.buildSettings,
		productionBranch: body.productionBranch,
		environmentVariables: body.environmentVariables,
	});

	return json({ message: response.message }, { status: 200 });
};
