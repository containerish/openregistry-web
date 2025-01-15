import type {
	AuthToken,
	AuthTokenList,
	OpenRegistryOrgMember,
	OpenRegistryUserSchema,
	ResetPasswordSchema,
	SignInSchema,
	SignUpSchema,
} from '$lib/formSchemas';
import type { z } from 'zod';

export type SigninRequestType = z.infer<typeof SignInSchema>;
export type SignupRequestType = z.infer<typeof SignUpSchema>;
export type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;
export type OpenRegistryUserType = z.infer<typeof OpenRegistryUserSchema>;
export type OpenRegistryOrgMember = z.infer<typeof OpenRegistryOrgMember>;
export type AuthToken = z.infer<typeof AuthToken>;
export type AuthTokenList = z.infer<typeof AuthTokenList>;
