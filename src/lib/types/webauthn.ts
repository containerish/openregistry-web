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
