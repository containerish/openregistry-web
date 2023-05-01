import type { Actions } from './$types';
import type { RequestEvent } from './$types';

export const actions: Actions = {
	reset_password: async (event: RequestEvent) => {
		const { request, locals } = event;
		const response = await locals.openRegistry.resetPassword(await request.formData());

		return response;
	}
};
