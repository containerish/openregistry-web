import {
	ForgotPasswordSchema,
	OpenRegistryUserSchema,
	ResetPasswordSchema,
	SignInSchema,
	SignUpSchema,
} from '$lib/formSchemas';
import type {
	WebAuthnBeginLoginResponseType,
	WebAuthnBeginRegisterResponseType,
	WebAuthnFinishLoginResponseType,
	WebAuthnFinishRegisterResponseType,
	WebAuthnSignUpType,
	WebAuthnFinishLoginRequestType,
} from '$lib/types/webauthn';
import {
	supported,
	get,
	create,
	parseCreationOptionsFromJSON,
	parseRequestOptionsFromJSON,
} from '@github/webauthn-json/browser-ponyfill';
import type {
	CredentialCreationOptionsJSON,
	CredentialRequestOptionsJSON,
	RegistrationPublicKeyCredential,
	AuthenticationPublicKeyCredential,
} from '@github/webauthn-json/browser-ponyfill';
import { fail, error } from '@sveltejs/kit';
import type { Cookies } from '@sveltejs/kit';
import { ZodError } from 'zod';
import type { OpenRegistryOrgMember, OpenRegistryUserType } from '$lib/types/user';
import { RepositoryCatalog, type RepositoryCatalogResponse } from '$lib/types/registry';
import type { CreateReposioryRequest, RegistryAPIError } from '$lib/types/registry';
import {
	SubmitManifestToScanResponse,
	GetVulnerabilityReportResponse,
} from '@buf/containerish_openregistry.bufbuild_es/services/yor/clair/v1/clair_pb';
import type { AddUserToOrgRequest, UpdateUserPermissionsRequest } from '$lib/types/permissions';
import { PUBLIC_OPEN_REGISTRY_BACKEND_URL } from '$env/static/public';

type OpenRegistryGenericError = {
	message: string;
	error: string;
	success: false;
};

type OpenRegistryResponse<Output> = OpenRegistrySuccessResponse<Output> | OpenRegistryGenericError;

type OpenRegistrySuccessResponse<T> = {
	success: true;
	data: T;
};

export class OpenRegistryClient {
	private fetcher: typeof fetch;
	private readonly apiHost: string;

	constructor(fetcher: typeof fetch, apiHost: string) {
		this.fetcher = fetcher;
		this.apiHost = apiHost;
	}

	withFetch(fetcher: typeof fetch) {
		this.fetcher = fetcher;
	}

	private getEndpoint(path: string) {
		if (!path.startsWith('/')) {
			path = '/' + path;
		}

		const url = new URL(['/api/proxy', path].join(''), this.apiHost);
		console.log('getEndpoint: url: ', url.toString());
		return url;
	}

	async signIn(formData: FormData) {
		const rawUser = Object.fromEntries(formData);
		try {
			const user = SignInSchema.parse(rawUser);
			const response = await this.fetcher('/api/auth/signin', {
				method: 'POST',
				body: JSON.stringify(user),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.status === 200) {
				return null;
			}
			const data = (await response.json()) as OpenRegistryGenericError;
			return fail(response.status, {
				error: data.message,
				message: data.message,
				data: user,
				formErrors: [data.message],
			});
		} catch (err) {
			if (err instanceof ZodError) {
				const { formErrors, fieldErrors } = err.flatten();

				return fail(400, {
					errors: fieldErrors,
					formErrors: formErrors,
					data: rawUser,
				});
			}
			const fetchError = err as OpenRegistryGenericError;
			return fail(500, {
				errors: fetchError.error,
				formErrors: fetchError.message,
				data: rawUser,
			});
		}
	}

	async signOut(cookies: Cookies, locals: App.Locals) {
		try {
			const response = await this.fetcher(`/apis/auth/signout`, {
				method: 'DELETE',
				headers: {
					cookie: `session_id=${cookies.get('session_id')}`,
				},
			});

			const data = await response.json();
			if (response.status === 202) {
				cookies.delete('session_id', {
					path: '/',
				});
				cookies.delete('access_token', {
					path: '/',
				});
				cookies.delete('refresh_token', {
					path: '/',
				});
				locals.user = null;
				locals.sessionId = '';
				locals.authenticated = false;

				return {
					data: data,
				};
			}

			error(400, {
				message: JSON.stringify(await response.json()),
			});
		} catch (err) {
			return fail(400, {
				error: err,
			});
		}
	}

	async signUp(formData: FormData) {
		const rawUser = Object.fromEntries(formData);

		try {
			const body = SignUpSchema.parse(rawUser);
			const response = await this.fetcher('/apis/auth/signup', {
				method: 'POST',
				body: JSON.stringify(body),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = (await response.json()) as OpenRegistryGenericError;
			if (response.status !== 201) {
				return fail(response.status, {
					data: body,
					error: data.error,
					formErrors: [data.message],
					message: data.message,
				});
			}
			return {
				success: true,
				message: data.message,
			};
		} catch (err) {
			if (err instanceof ZodError) {
				const { fieldErrors, formErrors } = err.flatten();
				return fail(400, {
					fieldErrors: fieldErrors,
					formErrors: formErrors,
					data: formData,
				});
			}
			const fetchError = err as OpenRegistryGenericError;
			return fail(500, {
				errors: fetchError.error,
				formErrors: fetchError.message,
				data: rawUser,
			});
		}
	}

	async resetPassword(fd: FormData) {
		const formData = Object.fromEntries(fd);
		try {
			const body = ResetPasswordSchema.parse(formData);
			const response = await this.fetcher('/apis/auth/reset-password', {
				method: 'POST',
				body: JSON.stringify(body),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.status !== 202) {
				const data = (await response.json()) as OpenRegistryGenericError;
				return fail(response.status, {
					data: body,
					error: data.message,
					formErrors: [data.message],
					message: data.message,
				});
			}
			const data = (await response.json()) as { message: string };
			return {
				success: true,
				message: data.message,
				formErrors: [],
			};
		} catch (err) {
			if (err instanceof ZodError) {
				const { fieldErrors, formErrors } = err.flatten();
				return fail(400, {
					errors: fieldErrors,
					fieldErrors: fieldErrors,
					formErrors: formErrors,
					data: formData,
				});
			}
			const fetchError = err as OpenRegistryGenericError;
			return fail(500, {
				errors: fetchError.error,
				formErrors: fetchError.message,
				data: formData,
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
					message: data.message,
				});
			}
			const data = (await response.json()) as { message: string };
			return {
				success: true,
				message: data.message,
				formErrors: [],
			};
		} catch (err) {
			if (err instanceof ZodError) {
				const { fieldErrors, formErrors } = err.flatten();
				return fail(400, {
					errors: fieldErrors,
					fieldErrors: fieldErrors,
					formErrors: formErrors,
					data: formData,
				});
			}
			const fetchError = err as OpenRegistryGenericError;
			return fail(500, {
				errors: fetchError.error,
				formErrors: fetchError.message,
				data: formData,
			});
		}
	}

	// THIS MUST ALWAYS BE A DIRECT CALL. WE ANYWAY SEEN THE SESSION ID WHICH CAN BE PASSED TO VIA THE ARGUMENTS
	async getUserBySession(sessionId: string): Promise<OpenRegistryUserType | null> {
		const uri = new URL('/auth/sessions/me', PUBLIC_OPEN_REGISTRY_BACKEND_URL);
		const response = await this.fetcher(uri, {
			headers: {
				cookie: `session_id=${sessionId}`,
			},
		});
		const data = await response.json();
		const parsed = OpenRegistryUserSchema.safeParse(data);
		if (parsed.success) {
			return parsed.data;
		}
		console.warn('error parsing user object:', parsed);

		return null;
	}

	async getUserRepositoryCatalog(visibility?: 'Public' | 'Private'): Promise<RepositoryCatalogResponse> {
		const url = this.getEndpoint('/v2/ext/catalog/user');
		if (visibility) {
			url.searchParams.set('visibility', visibility);
		}

		const response = await this.fetcher(url);
		const data = await response.json();

		if (response.status === 200) {
			const parsed = RepositoryCatalog.safeParse(data);
			if (parsed.success) {
				return parsed.data as RepositoryCatalogResponse;
			}

			return {
				error: 'Error listing user repository catalog',
			} as RepositoryCatalogResponse;
		}
		return {
			error: 'Failed to list user catalog',
		} as RepositoryCatalogResponse;
	}

	async webAuthnBeginRegister(body: WebAuthnSignUpType): Promise<WebAuthnBeginRegisterResponseType> {
		try {
			const url = this.getEndpoint('/auth/webauthn/registration/begin');
			const response = await this.fetcher(url, {
				method: 'POST',
				body: JSON.stringify(body),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				const data = (await response.json()) as OpenRegistryGenericError;
				return {
					error: { code: response.status, message: data.message },
				};
			}
			return (await response.json()) as WebAuthnBeginRegisterResponseType;
		} catch (err) {
			return {
				error: { code: 500, message: (err as Error).message },
			};
		}
	}

	async webAuthnFinishRegister(
		username: string,
		credentialCreationOpts: CredentialCreationOptionsJSON
	): Promise<WebAuthnFinishRegisterResponseType> {
		const options = parseCreationOptionsFromJSON(credentialCreationOpts);
		const url = this.getEndpoint('/auth/webauthn/registration/finish');
		url.searchParams.set('username', username);
		let body: RegistrationPublicKeyCredential;
		try {
			body = await create(options);
		} catch (err) {
			return {
				error: { code: 400, message: (err as Error).message },
			};
		}

		const response = await this.fetcher(url, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = (await response.json()) as { message: string };
		if (!response.ok) {
			return {
				error: { code: response.status, message: data.message },
			};
		}
		return {
			message: data.message,
		};
	}

	async webAuthnRegister(body: WebAuthnSignUpType): Promise<WebAuthnFinishRegisterResponseType> {
		const { error, options } = await this.webAuthnBeginRegister(body);
		if (error) {
			return { error };
		}
		const finishResponse = await this.webAuthnFinishRegister(body.username, options!);
		return finishResponse;
	}

	async webAuthBeginLogin(username: string): Promise<WebAuthnBeginLoginResponseType> {
		try {
			const url = this.getEndpoint('/auth/webauthn/login/begin');
			url.searchParams.set('username', username);
			const response = await this.fetcher(url);
			if (!response.ok) {
				const data = (await response.json()) as OpenRegistryGenericError;
				return {
					error: {
						code: response.status,
						message: data.message,
					},
				};
			}
			return (await response.json()) as WebAuthnBeginLoginResponseType;
		} catch (err) {
			return {
				error: {
					code: 500,
					message: (err as Error).message,
				},
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
					message: (err as Error).message,
				},
			};
		}

		const body: WebAuthnFinishLoginRequestType = {
			username,
			credentials,
		};

		const url = `/apis/webauthn/finish-login?username=${username}`;
		try {
			const response = await this.fetcher(url, {
				method: 'POST',
				body: JSON.stringify(body),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				const data = (await response.json()) as OpenRegistryGenericError;
				return {
					error: {
						code: response.status,
						message: data.message,
					},
				};
			}

			return (await response.json()) as { message: string };
		} catch (err) {
			return {
				error: {
					code: 500,
					message: (err as Error).message,
				},
			};
		}
	}

	async webAuthnLogin(username: string): Promise<WebAuthnFinishLoginResponseType> {
		if (!supported()) {
			return {
				error: {
					code: 400,
					message: 'Browser does not support WebAuthN',
				},
			};
		}

		const { error: err, options } = await this.webAuthBeginLogin(username);
		if (err) {
			console.log('sdk webAuthnLogin err: ', err);
			return { error: err };
		}
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const finishResponse = await this.webAuthFinishLogin(username, options!);
		return finishResponse;
	}

	async verifyEmail(token: string) {
		const url = this.getEndpoint('/auth/signup/verify');
		url.searchParams.set('token', token);

		const response = await this.fetcher(url);
		const data = await response.json();
		return data;
	}

	async sendInvites(emails: string) {
		const url = this.getEndpoint('/auth/send-email/welcome');
		const body = {
			emails: emails,
		};
		const response = await this.fetcher(url, {
			body: JSON.stringify(body),
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	}

	async forgotPasswordCallback(newPassword: string, token: string) {
		const url = this.getEndpoint('/auth/reset-forgotten-password');
		const body = {
			new_password: newPassword,
		};

		const response = await this.fetcher(url, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Authorization': 'Bearer' + token,
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();
		return data;
	}

	async createRepository(input: CreateReposioryRequest): Promise<OpenRegistryResponse<string>> {
		const uri = this.getEndpoint('/v2/ext/repository/create');
		console.log('request uri: ', uri.toString());
		const response = await this.fetcher(uri, {
			method: 'POST',
			body: JSON.stringify(input),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();
		if (response.status !== 201) {
			const err = data as OpenRegistryGenericError;
			if (err.error.includes('duplicate key value')) {
				return {
					...err,
					message: 'You already have a repository with that name, please try a different repository name',
					success: false,
				};
			}
			return {
				...err,
				success: false,
			};
		}

		return {
			success: true,
			data: (data as { message: string }).message,
		};
	}

	async convertAccountToOrg(userId: string): Promise<OpenRegistryResponse<string>> {
		const uri = this.getEndpoint('/api/org/migrate');

		const response = await this.fetcher(uri, {
			method: 'POST',
			body: JSON.stringify({
				user_id: userId,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();
		if (response.status !== 200) {
			const err = data as RegistryAPIError;
			return {
				success: false,
				message: err?.message ?? '',
				error: err?.error ?? '',
			};
		}

		const successResp = data as { message: string };
		return {
			success: true,
			data: successResp.message,
		};
	}

	async listOrgUsers(orgId: string): Promise<OpenRegistryResponse<OpenRegistryOrgMember[]>> {
		const uri = this.getEndpoint('/api/org/users');
		uri.searchParams.set('org_id', orgId);

		const response = await this.fetcher(uri);

		const data = await response.json();
		if (response.status !== 200) {
			const err = data as RegistryAPIError;
			return {
				success: false,
				message: err?.message ?? '',
				error: err?.error ?? '',
			};
		}

		return {
			success: true,
			data: data as OpenRegistryOrgMember[],
		};
	}

	async searchUsers(q: string): Promise<OpenRegistryResponse<OpenRegistryUserType[]>> {
		const uri = this.getEndpoint('/api/users/search');
		uri.searchParams.set('query', q);

		const response = await this.fetcher(uri);

		const data = await response.json();
		if (response.status !== 200) {
			const err = data as RegistryAPIError;
			return {
				success: false,
				message: err?.message ?? '',
				error: err?.error ?? '',
			};
		}

		return {
			success: true,
			data: data as OpenRegistryUserType[],
		};
	}
	async addUsersToOrg(body: AddUserToOrgRequest): Promise<OpenRegistryResponse<{ message: string }>> {
		const uri = this.getEndpoint('/api/org/users');

		const response = await this.fetcher(uri, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();
		if (response.status !== 200) {
			const err = data as RegistryAPIError;
			return {
				success: false,
				message: err?.message ?? '',
				error: err?.error ?? '',
			};
		}

		return {
			success: true,
			data,
		};
	}

	async changeRepositoryVisibility(
		visibility_mode: 'Public' | 'Private',
		repository_id: string
	): Promise<OpenRegistryResponse<{ message: string }>> {
		const uri = this.getEndpoint('/v2/ext/repository/visibility');
		const response = await this.fetcher(uri, {
			method: 'POST',
			body: JSON.stringify({
				visibility_mode,
				repository_id,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();
		if (response.status !== 200) {
			const err = data as RegistryAPIError;
			return {
				success: false,
				message: err?.message ?? '',
				error: err?.error ?? '',
			};
		}

		return {
			success: true,
			data: data as { message: string },
		};
	}

	async submitManifestForVulnScan(manifestHash: string): Promise<OpenRegistryResponse<SubmitManifestToScanResponse>> {
		const response = await this.fetcher('/apis/services/clair', {
			method: 'POST',
			body: JSON.stringify({
				hash: manifestHash,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();
		if (response.status !== 200) {
			const err = data as RegistryAPIError;
			return {
				success: false,
				message: err?.message ?? '',
				error: err?.error ?? '',
			};
		}

		return {
			success: true,
			data: new SubmitManifestToScanResponse().fromJson(data),
		};
	}

	async getVulnReport(manifestHash: string): Promise<OpenRegistryResponse<GetVulnerabilityReportResponse>> {
		const uri = `/apis/services/clair?hash=${manifestHash}`;

		const response = await this.fetcher(uri);

		const data = await response.json();
		if (response.status !== 200) {
			const err = data as RegistryAPIError;
			return {
				success: false,
				message: err?.message ?? '',
				error: err?.error ?? '',
			};
		}

		return {
			success: true,
			data: new GetVulnerabilityReportResponse().fromJson(data),
		};
	}

	async updateUserPermissions(
		body: UpdateUserPermissionsRequest
	): Promise<OpenRegistryResponse<{ message: string }>> {
		const uri = this.getEndpoint('/api/org/permissions/users');

		const response = await this.fetcher(uri, {
			method: 'PATCH',
			body: JSON.stringify(body),
		});

		const data = await response.json();
		if (response.status !== 200) {
			const err = data as RegistryAPIError;
			return {
				success: false,
				message: err?.message ?? '',
				error: err?.error ?? '',
			};
		}

		return {
			success: true,
			data,
		};
	}
}
