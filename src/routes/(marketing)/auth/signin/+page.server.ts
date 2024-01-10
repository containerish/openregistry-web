import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	signin: async ({ locals, request }) => {
		const err = await locals.openRegistry.signIn(await request.formData());

		if (!err) {
			redirect(303, '/repositories');
		}

		console.log('error: ', err);
		return err;
	},
	forgotPassword: async ({ request, locals, fetch }) => {
		locals.openRegistry.withFetch(fetch);

		const response = await locals.openRegistry.forgotPassword(await request.formData());
		return response;
	},
};
