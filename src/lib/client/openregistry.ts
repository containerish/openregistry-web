import { env } from '$env/dynamic/public';
import {
	ForgotPasswordSchema,
	ResetPasswordSchema,
	SignInSchema,
	SignUpSchema,
	WebAuthnSignInSchema,
	WebAuthnSignUpSchema
} from '$lib/formSchemas';
import type { WebAuthnSignUpType } from '$lib/types/webauthn';
import {
	supported,
	get,
	create,
	parseCreationOptionsFromJSON,
	type CredentialCreationOptionsJSON,
	type CredentialRequestOptionsJSON,
	parseRequestOptionsFromJSON
} from '@github/webauthn-json/browser-ponyfill';
import { fail, type Cookies, error, json } from '@sveltejs/kit';
import { ZodError } from 'zod';
import { parse, splitCookiesString } from 'set-cookie-parser';

type OpenRegistryGenericError = {
	message: string;
	error: string;
};

type WebAuthnError = {
	code: number;
	error: Error;
	message: string;
};

type WebAuthnRegisterResponse = {
	options: CredentialCreationOptionsJSON;
	error?: WebAuthnError;
};

type WebAuthnBeginLoginResponse = {
	options: CredentialRequestOptionsJSON;
	error?: WebAuthnError;
};

type WebAuthnLoginResponse = {
	message: string;
	error?: WebAuthnError;
};

type OpenRegistryAuthError = OpenRegistryGenericError & {
	code: number;
};

export class OpenRegistryClient {
	private readonly apiEndpoint: string;
	private fetcher: typeof fetch;

	constructor(apiEndpoint: string, fetcher: typeof fetch) {
		this.apiEndpoint = apiEndpoint;
		this.fetcher = fetcher;
	}

	set withFetch(fetcher: typeof fetch) {
		this.fetcher = fetcher;
	}

	async signIn(formData: FormData) {
		const rawUser = Object.fromEntries(formData);
		try {
			const user = SignInSchema.parse(rawUser);
			const response = await this.fetcher('/apis/auth/signin', {
				method: 'POST',
				body: JSON.stringify(user)
			});

			if (response.status === 200) {
				return null;
			}
			const data = (await response.json()) as OpenRegistryGenericError;
			return fail(response.status, {
				error: data.message,
				message: data.message,
				data: user,
				formErrors: [data.message]
			});
		} catch (err) {
			if (err instanceof ZodError) {
				const { formErrors, fieldErrors } = err.flatten();
				const { password, ...rest } = rawUser;

				return fail(400, {
					errors: fieldErrors,
					formErrors: formErrors,
					data: formData
				});
			}
			const fetchError = err as OpenRegistryGenericError;
			return fail(500, {
				errors: fetchError.error,
				formErrors: fetchError.message,
				data: rawUser
			});
		}
	}

	async signOut(cookies: Cookies, locals: App.Locals) {
		try {
			const response = await this.fetcher(`/apis/auth/signout`, {
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
	}

	async signUp(formData: FormData) {
		const rawUser = Object.fromEntries(formData);

		try {
			const body = SignUpSchema.parse(rawUser);
			const response = await this.fetcher('/apis/auth/signup', {
				method: 'POST',
				body: JSON.stringify(body)
			});
			const data = (await response.json()) as OpenRegistryGenericError;
			if (response.status !== 201) {
				return fail(response.status, {
					data: body,
					error: data.error,
					formErrors: [data.message],
					message: data.message
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
			const fetchError = err as OpenRegistryGenericError;
			return fail(500, {
				errors: fetchError.error,
				formErrors: fetchError.message,
				data: rawUser
			});
		}
	}

	async resetPassword(fd: FormData) {
		const formData = Object.fromEntries(fd);
		try {
			const body = ResetPasswordSchema.parse(formData);
			const response = await this.fetcher('/apis/auth/reset-password', {
				method: 'POST',
				body: JSON.stringify(body)
			});

			if (response.status !== 202) {
				const data = (await response.json()) as OpenRegistryGenericError;
				return fail(response.status, {
					data: body,
					error: data.message,
					formErrors: [data.message],
					message: data.message
				});
			}
			const data = (await response.json()) as { message: string };
			return {
				success: true,
				message: data.message,
				formErrors: []
			};
		} catch (err) {
			if (err instanceof ZodError) {
				const { fieldErrors, formErrors } = err.flatten();
				return fail(400, {
					errors: fieldErrors,
					fieldErrors: fieldErrors,
					formErrors: formErrors,
					data: formData
				});
			}
			const fetchError = err as OpenRegistryGenericError;
			return fail(500, {
				errors: fetchError.error,
				formErrors: fetchError.message,
				data: formData
			});
		}
	}

	async forgotPassword(fd: FormData) {
		const formData = Object.fromEntries(fd);
		try {
			const { email } = ForgotPasswordSchema.parse(formData);
			const url = `/apis/auth/forgot-password?email=${email}`;
			const response = await this.fetcher(url);
			if (response.status !== 202) {
				const data = (await response.json()) as OpenRegistryGenericError;
				return fail(response.status, {
					data: { email },
					error: data.message,
					formErrors: [data.message],
					message: data.message
				});
			}
			const data = (await response.json()) as { message: string };
			return {
				success: true,
				message: data.message,
				formErrors: []
			};
		} catch (err) {
			if (err instanceof ZodError) {
				const { fieldErrors, formErrors } = err.flatten();
				return fail(400, {
					errors: fieldErrors,
					fieldErrors: fieldErrors,
					formErrors: formErrors,
					data: formData
				});
			}
			const fetchError = err as OpenRegistryGenericError;
			return fail(500, {
				errors: fetchError.error,
				formErrors: fetchError.message,
				data: formData
			});
		}
	}

	async webAuthnBeginRegister(body: WebAuthnSignUpType): Promise<WebAuthnRegisterResponse> {
		try {
			const url = new URL(
				'/auth/webaauthn/registration/begin',
				env.PUBLIC_OPEN_REGISTRY_BACKEND_URL
			);
			const response = await this.fetcher(url, {
				method: 'POST',
				body: JSON.stringify(body)
			});

			if (response.status !== 200) {
				const data = (await response.json()) as OpenRegistryGenericError;
				return {
					error: {
						code: response.status,
						error: new Error(data.error),
						message: data.message
					}
				} as WebAuthnRegisterResponse;
			}
			const data = (await response.json()) as WebAuthnRegisterResponse;
			const options = data.options;
			return {
				options
			} as WebAuthnRegisterResponse;
		} catch (err) {
			return {
				error: {
					code: 500,
					error: err as Error,
					message: (err as Error).message
				}
			} as WebAuthnRegisterResponse;
		}
	}

	async webAuthnFinishRegister(
		username: string,
		credentialCreationOpts: CredentialCreationOptionsJSON
	) {
		const options = parseCreationOptionsFromJSON(credentialCreationOpts);
		const url = new URL('/auth/webauthn/registration/finish', env.PUBLIC_OPEN_REGISTRY_BACKEND_URL);
		url.searchParams.set('username', username);

		const body = await create(options);
		const response = await this.fetcher(url, {
			method: 'POST',
			body: JSON.stringify(body)
		});
		const data = await response.json();
		console.log('data in finishregister: ', data);
		return response;
	}

	async webAuthnRegister(fd: FormData) {
		const formData = Object.fromEntries(fd);
		const body = WebAuthnSignUpSchema.parse(formData);
		const { error, options } = await this.webAuthnBeginRegister(body);
		if (error) {
			if (error.error instanceof ZodError) {
				const { fieldErrors, formErrors } = error.error.flatten();
				return fail(400, {
					errors: fieldErrors,
					fieldErrors: fieldErrors,
					formErrors: formErrors,
					data: body
				});
			}

			return fail(500, {
				errors: [error.error],
				formErrors: error.message,
				data: body
			});
		}

		const finishResponse = await this.webAuthnFinishRegister(body.username, options);
		return finishResponse;
	}

	async webAuthBeginLogin(username: string) {
		try {
			const url = new URL('/auth/webauthn/login/begin', env.PUBLIC_OPEN_REGISTRY_BACKEND_URL);
			url.searchParams.set('username', username);
			const response = await this.fetcher(url);
			if (response.status !== 200) {
				const data = (await response.json()) as OpenRegistryGenericError;
				return {
					error: {
						code: response.status,
						error: new Error(data.error),
						message: data.message
					}
				} as WebAuthnBeginLoginResponse;
			}
			const data = (await response.json()) as WebAuthnBeginLoginResponse;
			const options = data.options;
			return { options } as WebAuthnBeginLoginResponse;
		} catch (err) {
			return {
				error: {
					code: 500,
					error: err as Error,
					message: (err as Error).message
				}
			} as WebAuthnBeginLoginResponse;
		}
	}

	async webAauthFinishLogin(
		username: string,
		credentialRequestOptions: CredentialRequestOptionsJSON
	) {
		const options = parseRequestOptionsFromJSON(credentialRequestOptions);
		const credentials = await get(options);
		const url = new URL('/auth/webauthn/login/finish', env.PUBLIC_OPEN_REGISTRY_BACKEND_URL);
		url.searchParams.set('username', username);
		const response = await this.fetcher(url, {
			method: 'POST',
			body: JSON.stringify(credentials),
			credentials: 'include'
		});
		if (!response.ok) {
			const data = (await response.json()) as OpenRegistryGenericError;
			return {
				code: response.status,
				error: new Error(data.error),
				message: data.message
			} as WebAuthnError;
		}
		const cookieList = parse(splitCookiesString(response.headers.get('set-cookie')!), {
			silent: true,
			decodeValues: true
		});
		console.log('respionse headers', cookieList, response.headers.get('set-cookie'));
		const data = (await response.json()) as { message: string };
		return data;
	}

	async webAuthnLogin(fd: FormData): Promise<WebAuthnLoginResponse> {
		if (!supported()) {
			return {
				error: {
					error: new Error('Browser does not support WebAuthN')
				}
			} as WebAuthnLoginResponse;
		}
		const formdata = Object.fromEntries(fd);
		try {
			const user = WebAuthnSignInSchema.parse(formdata);
			const { error, options } = await this.webAuthBeginLogin(user.username);
			if (error) {
				throw error;
			}
			const finishResponse = await this.webAauthFinishLogin(user.username, options);
			return finishResponse;
		} catch (err) {
			const werror = err as WebAuthnError;
			// if (werror.error instanceof ZodError) {
			// const { fieldErrors, formErrors } = werror.error.flatten();
			return {
				error: {
					error: err as Error,
					message: (err as Error).message
				}
				// errors: fieldErrors,
				// fieldErrors: fieldErrors,
				// formErrors: formErrors,
				// data: formdata
			} as WebAuthnLoginResponse;
			// }
			// return {
			// 	errors: [werror.error],
			// 	formErrors: werror.message,
			// 	data: formdata
			// };
		}
	}
}
