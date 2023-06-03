import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { RequestEvent } from './$types';
import { ZodError } from 'zod';
import { SignInSchema } from '$lib/formSchemas';

export const actions: Actions = {
	default: async (event: RequestEvent) => {
		const { request, fetch } = event;
		const formData = Object.fromEntries(await request.formData());

		try {
			const user = SignInSchema.parse(formData);
			const response = await fetch('/apis/auth/signin', {
				method: 'POST',
				body: JSON.stringify(user)
			});
			const data = await response.json();
			if (response.status === 200) {
				throw redirect(303, '/repositories');
			} else {
				return fail(response.status, {
					error: data,
					message: data.message,
					data: user,
					formErrors: [data.message]
				});
			}
		} catch (err) {
			if (err instanceof ZodError) {
				const { formErrors, fieldErrors } = err.flatten();
				const { password, ...rest } = formData;

				return fail(400, {
					errors: fieldErrors,
					formErrors: formErrors,
					data: formData
				});
			}
		}
	}
};
