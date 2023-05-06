import type { WebAuthnSignInSchema, WebAuthnSignUpSchema } from '$lib/formSchemas';
import type {
	CredentialCreationOptionsJSON,
	CredentialRequestOptionsJSON
} from '@github/webauthn-json/browser-ponyfill';
import type { z } from 'zod';

export type WebAuthnFormErrors = string[] | null;
export type WebAuthnFieldErrors = {
	[x: string]: string[] | undefined;
	[x: number]: string[] | undefined;
	[x: symbol]: string[] | undefined;
};

export type WebAuthnState = {
	formErrors: WebAuthnFormErrors;
	fieldErrors: WebAuthnFieldErrors;
};

export type WebAuthnSignUpType = z.infer<typeof WebAuthnSignUpSchema>;
export type WebAuthnSignInType = z.infer<typeof WebAuthnSignInSchema>;

export type WebAuthnError = {
	error?: { code: number; message: string };
};
export type WebAuthnBeginRegisterResponseType = WebAuthnError & {
	options?: CredentialCreationOptionsJSON;
};
export type WebAuthnFinishRegisterResponseType = WebAuthnError & {
	message?: string;
};
export type WebAuthnBeginLoginResponseType = WebAuthnError & {
	options?: CredentialRequestOptionsJSON;
};
export type WebAuthnFinishLoginResponseType = WebAuthnError & {
	message?: string;
};
