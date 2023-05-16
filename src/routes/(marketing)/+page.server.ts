import { error, fail, json, redirect } from '@sveltejs/kit';
import type { AxiosResponseHeaders } from 'axios';
import * as c from 'cookie';
import type { Actions } from './$types';
import { Auth } from '$apis/auth';
import type { RequestEvent } from './$types';
import { ZodError } from 'zod';
import { SignInSchema, SignUpSchema } from '$lib/formSchemas';
import { env } from '$env/dynamic/public';
import { dataset_dev } from 'svelte/internal';

const auth = new Auth();

export const actions: Actions = {
	signin: async (event: RequestEvent) => {
		const { request, cookies, setHeaders, fetch } = event;
		const formData = Object.fromEntries(await request.formData());

		try {
			const user = SignInSchema.parse(formData);
			const response = await fetch('/apis/auth/signin', {
				method: 'POST',
				body: JSON.stringify(user),
				credentials: 'include'
			});
			const data = await response.json();
			if (response.status === 200) {
				console.log('response: ', data);
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
	},
	signout: async (event: RequestEvent) => {
		const { cookies, locals, fetch } = event;

		try {
			const response = await fetch(`/apis/auth/signout`, {
				method: 'DELETE'
			});
			if (response.status === 202) {
				const data = await response.json();
				cookies.delete('session_id');
				cookies.delete('access');
				cookies.delete('refresh');
				locals.user = null;
				locals.sessionId = '';
				locals.authenticated = false;

				return {
					data: data
				};
			}

			throw error(400, {
				message: JSON.stringify(await response.json())
			});
		} catch (err) {
			return fail(400, {
				error: err
			});
		}
	},
	signup: async (event: RequestEvent) => {
		const { fetch, request } = event;
		const formData = Object.fromEntries(await request.formData());

		try {
			const body = SignUpSchema.parse(formData);
			const response = await fetch('/apis/auth/signup', {
				method: 'POST',
				body: JSON.stringify(body)
			});
			const data = await response.json();
			if (response.status !== 201) {
				return fail(response.status, {
					data: body,
					error: data,
					formErrors: [data.message],
					message: 'Error signing up'
				});
			}
			return {
				success: true,
				message: data.message
			};
		} catch (err) {
			if (err instanceof ZodError) {
				const { fieldErrors, formErrors } = err.flatten();
				return fail(400, {
					fieldErrors: fieldErrors,
					formErrors: formErrors,
					data: formData
				});
			}
		}
	},
	noop: async () => {
		console.log('this one does not do anything');
	}
};
