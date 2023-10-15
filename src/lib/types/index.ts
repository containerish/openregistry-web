import type { Timestamp } from "@bufbuild/protobuf";

export * from "./webauthn";
export * from "./user";
export * from "./registry";

export type CreateProjectState = {
	id: string;
	owner: string;
	createdAt: Timestamp;
	projectName: string;
	buildSettings: {
		buildTool: string;
		execCommand: string;
		worfklowFile: string;
	};
	productionBranch: string;
	environmentVariables: {
		environmentVariables: {
			key: string;
			value: string;
			encrypted: boolean;
		}[];
	};
};
