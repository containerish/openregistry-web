import { z } from 'zod';

// {"dockerfile_path": "Dockerfile", "repository_name": "Adv360-Pro-ZMK"}
export const GitHubPullRequestSchema = z.object({
	dockerfile_path: z.string(),
	repository_name: z.string()
});

export type GitHubPullRequestType = z.infer<typeof GitHubPullRequestSchema>;
