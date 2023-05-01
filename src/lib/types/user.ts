import type { ResetPasswordSchema, SignInSchema, SignUpSchema } from '$lib/formSchemas';
import type { z } from 'zod';

export type SigninRequestType = z.infer<typeof SignInSchema>;
export type SignupRequestType = z.infer<typeof SignUpSchema>;
export type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;
