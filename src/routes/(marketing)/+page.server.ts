import { error, fail, redirect } from '@sveltejs/kit';
import type { AxiosResponseHeaders } from 'axios';
import * as c from 'cookie';
import type { Actions } from './$types';
import { Auth } from '$apis/auth';
import type { RequestEvent } from './$types';
import { ZodError } from 'zod';
import { SignInSchema, SignUpSchema } from '$lib/formSchemas';
import { env } from '$env/dynamic/public';

const auth = new Auth();

export const actions: Actions = {
	signin: async (event: RequestEvent) => {
		const { request, cookies, setHeaders, fetch } = event;
		const formData = Object.fromEntries(await request.formData());

		try {
			const user = SignInSchema.parse(formData);
			const { data, error: err, status, headers } = await auth.Login(user.email, user.password);
			if (status === 200) {
				const cookieList = (headers as AxiosResponseHeaders)['set-cookie'];
				cookieList!.forEach((cookie, i) => {
					const cookieParts = cookie.split('=');
					const cookieValue = cookieParts.splice(1).join('=').split(';')[0];
					const cookieOptions = c.parse(cookie.split('=').splice(1).join('='));
					cookies.set(cookieParts[0], cookieValue, {
						domain: cookieOptions.Domain,
						httpOnly: true,
						sameSite: 'lax',
						secure: false,
						path: '/',
						expires: new Date(cookieOptions.Expires)
					});
				});
				throw redirect(303, '/repositories');
			} else {
				return fail(status, {
					error: err,
					message: 'Error logging in',
					data: user,
					formErrors: [err.message]
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
			const resp = await fetch(`${env.PUBLIC_OPEN_REGISTRY_BACKEND_URL}/auth/signout`, {
				method: 'DELETE',
				credentials: 'include',
				headers: {
					cookie: `session_id=${cookies.get('session_id')}`
				}
			});
			if (resp.status === 202) {
				const data = await resp.json();
				cookies.delete('session_id');
				cookies.delete('access_token');
				cookies.delete('refresh_token');
				locals.user = null;
				locals.sessionId = '';
				locals.authenticated = false;

				return {
					data: data
				};
			}

			throw error(400, {
				message: JSON.stringify(await resp.json())
			});
		} catch (err) {
			return fail(400, {
				error: err
			});
		}
	},
	signup: async (event: RequestEvent) => {
		const { request } = event;

		const formData = Object.fromEntries(await request.formData());

		try {
			const body = SignUpSchema.parse(formData);
			const {
				error: err,
				status,
				data
			} = await auth.Signup(body.username, body.email, body.password);
			if (err || status !== 201) {
				return fail(status, {
					data: body,
					error: err,
					formErrors: [err.message],
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
