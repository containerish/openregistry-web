import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { RequestEvent } from './$types';

export const actions: Actions = {
	signin: async (event: RequestEvent) => {
		const { request, locals } = event;
		const err = await locals.openRegistry.signIn(await request.formData());

		if (!err) {
			throw redirect(303, '/repositories');
		}
		return err;
	},
	signout: async (event: RequestEvent) => {
		const { cookies, locals } = event;

		const response = await locals.openRegistry.signOut(cookies, locals);
		return response;
	},
	signup: async (event: RequestEvent) => {
		const { request, locals } = event;

		const response = await locals.openRegistry.signUp(await request.formData());
		return response;
	},
	forgot_password: async (event: RequestEvent) => {
		const { request, locals } = event;

		const response = await locals.openRegistry.forgotPassword(await request.formData());
		return response;
	},
	noop: async () => {
		console.log('this one does not do anything');
	}
};
