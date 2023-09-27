import { env } from '$env/dynamic/public';
import {
	ForgotPasswordSchema,
	OpenRegistryUserSchema,
	ResetPasswordSchema,
	SignInSchema,
	SignUpSchema
} from '$lib/formSchemas';
import type {
	WebAuthnBeginLoginResponseType,
	WebAuthnBeginRegisterResponseType,
	WebAuthnFinishLoginResponseType,
	WebAuthnFinishRegisterResponseType,
	WebAuthnSignUpType,
	WebAuthnFinishLoginRequestType
} from '$lib/types/webauthn';
import {
	supported,
	get,
	create,
	parseCreationOptionsFromJSON,
	parseRequestOptionsFromJSON
} from '@github/webauthn-json/browser-ponyfill';
import type {
	CredentialCreationOptionsJSON,
	CredentialRequestOptionsJSON,
	RegistrationPublicKeyCredential,
	AuthenticationPublicKeyCredential
} from '@github/webauthn-json/browser-ponyfill';
import { fail, error } from '@sveltejs/kit';
import type { Cookies } from '@sveltejs/kit';
import { ZodError } from 'zod';
import type { OpenRegistryUserType } from '$lib/types/user';
import {
	CreateRepositoryResponse,
	RepositoryCatalog,
	type RepositoryCatalogResponse
} from '$lib/types/registry';

type OpenRegistryGenericError = {
	message: string;
	error: string;
};

export class OpenRegistryClient {
	private fetcher: typeof fetch;

	constructor(fetcher: typeof fetch) {
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

				return fail(400, {
					errors: fieldErrors,
					formErrors: formErrors,
					data: rawUser
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
				method: 'DELETE',
				headers: {
					cookie: `session_id=${cookies.get('session_id')}`
				}
			});

			const data = await response.json();
			if (response.status === 202) {
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

	async getUserBySession(sessionId: string): Promise<OpenRegistryUserType | null> {
		try {
			const uri = new URL('/auth/sessions/me', env.PUBLIC_OPEN_REGISTRY_BACKEND_URL);
			const response = await this.fetcher(uri, {
				headers: {
					cookie: `session_id=${sessionId}`
				}
			});
			const data = await response.json();
			return OpenRegistryUserSchema.parse(data);
		} catch (err) {
			console.warn('error getting user from session: ', err);
			return null;
		}
	}

	async webAuthnBeginRegister(
		body: WebAuthnSignUpType
	): Promise<WebAuthnBeginRegisterResponseType> {
		try {
			const url = new URL(
				'/auth/webauthn/registration/begin',
				env.PUBLIC_OPEN_REGISTRY_BACKEND_URL
			);
			const response = await this.fetcher(url, {
				method: 'POST',
				body: JSON.stringify(body)
			});

			const parsed = await response.json();
			if (!response.ok) {
				const data = parsed as OpenRegistryGenericError;
				return {
					error: { code: response.status, message: data.message }
				};
			}
			return parsed as WebAuthnBeginRegisterResponseType;
		} catch (err) {
			return {
				error: { code: 500, message: (err as Error).message }
			};
		}
	}

	async webAuthnFinishRegister(
		username: string,
		credentialCreationOpts: CredentialCreationOptionsJSON
	): Promise<WebAuthnFinishRegisterResponseType> {
		const options = parseCreationOptionsFromJSON(credentialCreationOpts);
		const url = new URL(
			'/auth/webauthn/registration/finish',
			env.PUBLIC_OPEN_REGISTRY_BACKEND_URL
		);
		url.searchParams.set('username', username);
		let body: RegistrationPublicKeyCredential;
		try {
			body = await create(options);
		} catch (err) {
			return {
				error: { code: 400, message: (err as Error).message }
			};
		}

		const response = await this.fetcher(url, {
			method: 'POST',
			body: JSON.stringify(body)
		});

		const data = (await response.json()) as { message: string };
		if (!response.ok) {
			return {
				error: { code: response.status, message: data.message }
			};
		}
		return {
			message: data.message
		};
	}

	async webAuthnRegister(body: WebAuthnSignUpType): Promise<WebAuthnFinishRegisterResponseType> {
		const { error, options } = await this.webAuthnBeginRegister(body);
		if (error) {
			return { error };
		}

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const finishResponse = await this.webAuthnFinishRegister(body.username, options!);
		return finishResponse;
	}

	async webAuthBeginLogin(username: string): Promise<WebAuthnBeginLoginResponseType> {
		try {
			const url = new URL('/auth/webauthn/login/begin', env.PUBLIC_OPEN_REGISTRY_BACKEND_URL);
			url.searchParams.set('username', username);
			const response = await this.fetcher(url);
			if (!response.ok) {
				const data = (await response.json()) as OpenRegistryGenericError;
				return {
					error: {
						code: response.status,
						message: data.message
					}
				};
			}
			return (await response.json()) as WebAuthnBeginLoginResponseType;
		} catch (err) {
			return {
				error: {
					code: 500,
					message: (err as Error).message
				}
			};
		}
	}

	async webAuthFinishLogin(
		username: string,
		credentialRequestOptions: CredentialRequestOptionsJSON
	): Promise<WebAuthnFinishLoginResponseType> {
		let credentials = {} as AuthenticationPublicKeyCredential;
		try {
			const options = parseRequestOptionsFromJSON(credentialRequestOptions);
			credentials = await get(options);
		} catch (err) {
			return {
				error: {
					code: 400,
					message: (err as Error).message
				}
			};
		}

		const body: WebAuthnFinishLoginRequestType = {
			username,
			credentials
		};

		const url = `/apis/webauthn/finish-login?username=${username}`;
		try {
			const response = await this.fetcher(url, {
				method: 'POST',
				body: JSON.stringify(body)
			});

			if (!response.ok) {
				const data = (await response.json()) as OpenRegistryGenericError;
				return {
					error: {
						code: response.status,
						message: data.message
					}
				};
			}

			return (await response.json()) as { message: string };
		} catch (err) {
			return {
				error: {
					code: 500,
					message: (err as Error).message
				}
			};
		}
	}

	async webAuthnLogin(username: string): Promise<WebAuthnFinishLoginResponseType> {
		if (!supported()) {
			return {
				error: {
					code: 400,
					message: 'Browser does not support WebAuthN'
				}
			};
		}

		const { error: err, options } = await this.webAuthBeginLogin(username);
		if (err) {
			return { error: err };
		}
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const finishResponse = await this.webAuthFinishLogin(username, options!);
		return finishResponse;
	}

	async verifyEmail(token: string) {
		const url = new URL('/auth/signup/verify', env.PUBLIC_OPEN_REGISTRY_BACKEND_URL);
		url.searchParams.set('token', token);

		const response = await this.fetcher(url);
		const data = await response.json();
		return data;
	}

	async sendInvites(emails: string) {
		const url = new URL('/auth/send-email/welcome', env.PUBLIC_OPEN_REGISTRY_BACKEND_URL);
		const body = {
			emails: emails
		};
		const response = await this.fetcher(url, {
			body: JSON.stringify(body),
			method: 'POST'
		});
		const data = await response.json();
		return data;
	}

	async forgotPasswordCallback(newPassword: string, token: string) {
		const url = new URL('/auth/reset-forgotten-password', env.PUBLIC_OPEN_REGISTRY_BACKEND_URL);
		const body = {
			new_password: newPassword
		};

		const response = await this.fetcher(url, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				Authorization: 'Bearer' + token
			}
		});

		const data = await response.json();
		return data;
	}

	async createRepository(
		name: string,
		visibility: 'Public' | 'Private' = 'Private',
		description = ''
	) {
		const url = new URL('/v2/ext/repository/create', env.PUBLIC_OPEN_REGISTRY_BACKEND_URL);
		const body = {
			name,
			visibility,
			description
		};

		const response = await this.fetcher(url, {
			method: 'POST',
			body: JSON.stringify(body),
			credentials: 'include'
		});

		const parsed = CreateRepositoryResponse.safeParse(await response.json());
		if (parsed.success) {
			return parsed.data;
		}
		return {
			error: 'error creating repository'
		};
	}

	async getUserRepositoryCatalog(
		visibility?: 'Public' | 'Private'
	): Promise<RepositoryCatalogResponse> {
		const url = new URL('/v2/ext/catalog/user', env.PUBLIC_OPEN_REGISTRY_BACKEND_URL);
		if (visibility) {
			url.searchParams.set('visibility', visibility);
		}

		const response = await this.fetcher(url, { credentials: 'include' });
		const data = await response.json();

		if (response.status === 200) {
			const parsed = RepositoryCatalog.safeParse(data);
			if (parsed.success) {
				return parsed.data as RepositoryCatalogResponse;
			}

			return {
				error: 'Error listing user repository catalog'
			} as RepositoryCatalogResponse;
		}
		return {
			error: 'Failed to list user catalog'
		} as RepositoryCatalogResponse;
	}
}
