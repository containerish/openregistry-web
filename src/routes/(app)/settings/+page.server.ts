import type { Actions } from './$types';

export const actions: Actions = {
	reset_password: async ({ locals, request }) => {
		const response = await locals.openRegistry.resetPassword(await request.formData());

		return response;
	},
};
