import { Auth } from '../../apis/auth';
import type { LayoutServerLoadEvent } from './$types';
import type { User } from '../../apis/auth';
import { session } from '../../stores/session';
import * as cookie from 'cookie';
import { redirect } from '@sveltejs/kit';

export const load = async (loadEvent: LayoutServerLoadEvent) => {
	const { cookies, locals } = loadEvent;
	if (locals.authenticated && locals.user) {
		// throw redirect(303, '/repositories')
		return {
			user: locals.user,
			isAuthenticated: locals.authenticated,
		}

	}
	// const auth = new Auth();
	// const { request, url, cookies } = loadEvent;

	// try {
	// 	const sessionId = cookies.get('session_id')
	// 	const { data, error, status } = await auth.GetUserWithSession(sessionId);
	// 	if (data) {
	// 		sessionStore.set({ user: data, isAuthenticated: true })
	// 		loadEvent.locals.sessionId = sessionId
	// 		return {
	// 			user: data,
	// 			authenticated: true,
	// 			locals: { username: data.username },
	// 			pathname: url.pathname
	// 		} as LayoutResponse;
	// 	}
	//
	// 	throw Error(`status: ${status} - error: ${error} `);
	// } catch (error) {
	// 	return {
	// 		error: JSON.stringify(error.message),
	// 		authenticated: false
	// 	} as LayoutResponse;
	// }
}

export type AuthorisedRepository = {
	branches: Branch[];
	repository: Repository;
};

export type Organization = {
	login?: string;
	id?: number;
	avatar_url?: string;
	html_url?: string;
	name?: string;
	company?: string;
	blog?: string;
	location?: string;
	email?: string;
	twitter_username?: string;
	description?: string;
	public_repos?: number;
	followers?: number;
	following?: number;
	created_at?: Date;
	updated_at?: Date;
	total_private_repos?: number;
	owned_private_repos?: number;
	private_gists?: number;
	disk_usage?: number;
	collaborators?: number;
	type?: string;
	is_verified?: boolean;
	has_organization_projects?: boolean;
	has_repository_projects?: boolean;
	default_repository_permission?: string;
	default_repository_settings?: string;
	members_can_create_repositories?: boolean;
	members_can_create_public_repositories?: boolean;
	members_can_create_private_repositories?: boolean;
	members_can_create_internal_repositories?: boolean;
	members_can_fork_private_repositories?: boolean;
	members_allowed_repository_creation_type?: string;
	members_can_create_pages?: boolean;
	members_can_create_public_pages?: boolean;
	members_can_create_private_pages?: boolean;
	url?: string;
	events_url?: string;
	hooks_url?: string;
	issues_url?: string;
	members_url?: string;
	public_members_url?: string;
	repos_url?: string;
};

export type SecurityAndAnalysis = {
	advanced_security?: AdvancedSecurity;
	secret_scanning?: SecretScanning;
};

export type AdvancedSecurity = {
	status?: string;
};

export type SecretScanning = {
	status?: string;
};

export type GithubUser = {
	login?: string;
	id?: number;
	node_id?: string;
	avatar_url?: string;
	html_url?: string;
	gravatar_id?: string;
	name?: string;
	company?: string;
	blog?: string;
	location?: string;
	email?: string;
	hireable?: boolean;
	bio?: string;
	twitter_username?: string;
	public_repos?: number;
	public_gists?: number;
	followers?: number;
	following?: number;
	created_at?: Date;
	updated_at?: Date;
	suspended_at?: Date;
	type?: string;
	site_admin?: boolean;
	total_private_repos?: number;
	owned_private_repos?: number;
	private_gists?: number;
	disk_usage?: number;
	collaborators?: number;
	two_factor_authentication?: boolean;
	ldap_dn?: string;
	url?: string;
	events_url?: string;
	following_url?: string;
	followers_url?: string;
	gists_url?: string;
	organizations_url?: string;
	received_events_url?: string;
	repos_url?: string;
	starred_url?: string;
	subscriptions_url?: string;
	permissions?: { [key: string]: boolean };
	role_name?: string;
};

export type Repository = {
	id?: number;
	node_id?: string;
	owner?: GithubUser;
	name?: string;
	full_name?: string;
	description?: string;
	homepage?: string;
	default_branch?: string;
	master_branch?: string;
	created_at?: Date;
	pushed_at?: Date;
	updated_at?: Date;
	html_url?: string;
	clone_url?: string;
	git_url?: string;
	mirror_url?: string;
	ssh_url?: string;
	svn_url?: string;
	language?: string;
	fork?: boolean;
	forks_count?: number;
	network_count?: number;
	open_issues_count?: number;
	open_issues?: number;
	stargazers_count?: number;
	subscribers_count?: number;
	watchers_count?: number;
	watchers?: number;
	size?: number;
	auto_init?: boolean;
	parent?: Repository;
	source?: Repository;
	template_repository?: Repository;
	organization?: Organization;
	permissions?: { [key: string]: boolean };
	allow_rebase_merge?: boolean;
	allow_update_branch?: boolean;
	allow_squash_merge?: boolean;
	allow_merge_commit?: boolean;
	allow_auto_merge?: boolean;
	allow_forking?: boolean;
	delete_branch_on_merge?: boolean;
	use_squash_pr_title_as_default?: boolean;
	topics?: string[];
	archived?: boolean;
	disabled?: boolean;
	private?: boolean;
	has_issues?: boolean;
	has_wiki?: boolean;
	has_pages?: boolean;
	has_projects?: boolean;
	has_downloads?: boolean;
	is_template?: boolean;
	license_template?: string;
	gitignore_template?: string;
	security_and_analysis?: SecurityAndAnalysis;
	team_id?: number;
	url?: string;
	archive_url?: string;
	assignees_url?: string;
	blobs_url?: string;
	branches_url?: string;
	collaborators_url?: string;
	comments_url?: string;
	commits_url?: string;
	compare_url?: string;
	contents_url?: string;
	contributors_url?: string;
	deployments_url?: string;
	downloads_url?: string;
	events_url?: string;
	forks_url?: string;
	git_commits_url?: string;
	git_refs_url?: string;
	git_tags_url?: string;
	hooks_url?: string;
	issue_comment_url?: string;
	issue_events_url?: string;
	issues_url?: string;
	keys_url?: string;
	labels_url?: string;
	languages_url?: string;
	merges_url?: string;
	milestones_url?: string;
	notifications_url?: string;
	pulls_url?: string;
	releases_url?: string;
	stargazers_url?: string;
	statuses_url?: string;
	subscribers_url?: string;
	subscription_url?: string;
	tags_url?: string;
	trees_url?: string;
	teams_url?: string;
	visibility?: string;
	role_name?: string;
};

export type Branch = {
	name: string;
	commit: { sha: string; url: string };
	protected: string;
};

export type LayoutResponse = {
	user?: User;
	username?: string;
	repo?: string;
	authenticated: boolean;
	error: Error | string | undefined;
	locals?: { username: string };
	pathname?: string;
	githubUsername?: string;
	repoList?: AuthorisedRepository[];
};
