import { z } from 'zod';

export const StreamLogsRequestSchema = z.object({
	repoName: z.string(),
	repoOwner: z.string(),
	runId: z.number().transform((num) => BigInt(num))
});
