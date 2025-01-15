import type { AuthorisedRepository, OpenRegistryUserType } from '$lib/types';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	return {
		authenticated: locals.authenticated,
	};
};

export type LayoutResponse = {
	user?: OpenRegistryUserType;
	username?: string;
	repo?: string;
	authenticated: boolean;
	error: Error | string | undefined;
	locals?: { username: string };
	pathname?: string;
	githubUsername?: string;
	repoList?: AuthorisedRepository[];
};
