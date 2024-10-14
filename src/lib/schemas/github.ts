import { z } from 'zod';

export const GitHubPullRequestSchema = z.object({
	dockerfile_path: z.string(),
	repository_name: z.string(),
});

export type GitHubPullRequestType = z.infer<typeof GitHubPullRequestSchema>;
