import type { CreateRepository } from "$lib/shared/types/automation";
import type { GithubActionsBuildService } from "@buf/containerish_openregistry.connectrpc_es/services/kon/github_actions/v1/build_job_connect";
import type { GitHubActionsLogsService } from "@buf/containerish_openregistry.connectrpc_es/services/kon/github_actions/v1/build_logs_connect";
import type { GitHubActionsProjectService } from "@buf/containerish_openregistry.connectrpc_es/services/kon/github_actions/v1/build_project_connect";
import { Code, ConnectError, type PromiseClient } from "@connectrpc/connect";

export type AutomationResponse<T> =
	| ResponseSuccess<T>
	| OpenRegistryGenericError;

export type ResponseSuccess<Output> = {
	success: true;
	data: Output;
};

type OpenRegistryGenericError = {
	success: false;
	message: string;
	error: string;
	code: Code;
};

export class OpenRegistryAutomationClient {
	private fetcher: typeof fetch;
	private readonly ghProjectsClient: PromiseClient<
		typeof GitHubActionsProjectService
	>;
	private readonly ghLogsClient: PromiseClient<
		typeof GitHubActionsLogsService
	>;
	private readonly ghBuildClient: PromiseClient<
		typeof GithubActionsBuildService
	>;

	constructor(locals: App.Locals, fetcher?: typeof fetch) {
		this.fetcher = fetcher ?? fetch;
		this.ghProjectsClient = locals.ghProjectsClient;
		this.ghLogsClient = locals.ghLogsClient;
		this.ghBuildClient = locals.ghBuildClient;
	}

	set withFetch(fetcher: typeof fetch) {
		this.fetcher = fetcher;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async createProject(
		input: CreateRepository,
	): Promise<AutomationResponse<string>> {
		try {
			const response = await this.ghProjectsClient.createProject(input);

			return {
				success: true,
				data: response.message,
			};
		} catch (err) {
			const parsedErr = ConnectError.from(err);
			return {
				success: false,
				message:
					"Could not connect to the server, pelase try again later",
				error: parsedErr.message,
				code: parsedErr.code,
			};
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async getProject(name: string): Promise<AutomationResponse<any>> {
		try {
			const response = await this.ghProjectsClient.getProject({
				id: { value: name },
			});

			return {
				success: true,
				data: response,
			};
		} catch (err) {
			const parsedErr = ConnectError.from(err);
			return {
				success: false,
				error: parsedErr.message,
				message: "Could not find the project, please again",
				code: parsedErr.code,
			};
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async listProjects(ownerId: string): Promise<AutomationResponse<any>> {
		try {
			const response = await this.ghProjectsClient.listProjects({
				ownerId: { value: ownerId },
			});

			return {
				success: true,
				data: response.projects,
			};
		} catch (err) {
			const parsedErr = ConnectError.from(err);
			return {
				success: false,
				code: parsedErr.code,
				message: "could not get the project list, please try again",
				error: parsedErr.message,
			};
		}
	}

	async deleteProject(id: string): Promise<AutomationResponse<string>> {
		try {
			const response = await this.ghProjectsClient.deleteProject({
				id: { value: id },
			});
			return {
				success: true,
				data: response.message,
			};
		} catch (err) {
			const parsedErr = ConnectError.from(err);
			return {
				success: false,
				code: parsedErr.code,
				message: "could not delete project, please try again later",
				error: parsedErr.message,
			};
		}
	}
}
