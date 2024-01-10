import { z } from 'zod';

export const AddUserToOrgRequest = z.object({
	organization_id: z.string(),
	users: z.array(
		z.object({
			id: z.string(),
			push: z.boolean(),
			pull: z.boolean(),
			is_admin: z.boolean(),
		})
	),
});

export type AddUserToOrgRequest = z.infer<typeof AddUserToOrgRequest>;

export const UpdateUserPermissionsRequest = z.object({
	push: z.boolean(),
	pull: z.boolean(),
	is_admin: z.boolean(),
	organization_id: z.string(),
	user_id: z.string(),
});

export type UpdateUserPermissionsRequest = z.infer<typeof UpdateUserPermissionsRequest>;
