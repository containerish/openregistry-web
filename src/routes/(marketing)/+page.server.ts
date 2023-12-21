import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	signin: async ({ request, locals }) => {
		const err = await locals.openRegistry.signIn(await request.formData());

		if (!err) {
			redirect(303, '/repositories');
		}
		return err;
	},
	signout: async ({ fetch, locals, cookies }) => {
		const response = await locals.openRegistry.signOut(cookies, locals);
		return response;
	},
	signup: async ({ locals, fetch, request }) => {
		const response = await locals.openRegistry.signUp(await request.formData());
		return response;
	},
	forgot_password: async ({ locals, fetch, request }) => {
		const response = await locals.openRegistry.forgotPassword(await request.formData());
		return response;
	},
	noop: async () => {
		console.log('this one does not do anything');
	},
};
