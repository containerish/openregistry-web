import type { WebAuthnSignInSchema, WebAuthnSignUpSchema } from '$lib/formSchemas';
import type { CredentialCreationOptionsJSON } from '@github/webauthn-json/browser-ponyfill';
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
export type WebAuthnBeginRegisterResponse = {
	options: CredentialCreationOptionsJSON;
};
