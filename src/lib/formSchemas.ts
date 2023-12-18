import { z } from 'zod';

export const UsernameSchema = z
    .string({ required_error: 'Username is required' })
    .min(3, { message: 'username must be 3 or more characters long' })
    .max(28, { message: 'username must not exceed 28 characters' })
    .trim();

// since an email can be at least 3 chars and at max 256 chars long
// https://stackoverflow.com/a/574698/7564646
export const UserEmailSchema = z
    .string({ required_error: 'Email is required' })
    .min(3, { message: 'A valid email address is required' })
    .max(256, { message: 'Maximum length of en email is 256 characters' })
    .email();

export const UserPasswordSchema = z
    .string({ required_error: 'Password is required' })
    .regex(new RegExp('.*[A-Z].*'), 'An uppercase letter is missing')
    .regex(new RegExp('.*[a-z].*'), 'A lowercase letter is missing')
    .regex(new RegExp('.*\\d.*'), 'A number is missing')
    .regex(new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'), 'A special character is missing')
    .min(8, { message: 'Password must be at least 8 characters longs' })
    .max(128, {
        message: 'Maximum allowed length for password is 128 characters',
    })
    .trim();

export const SignInSchema = z.object({
    email: UserEmailSchema,
    password: UserPasswordSchema,
});

export const SignUpSchema = z
    .object({
        username: UsernameSchema,
        email: UserEmailSchema,
        password: UserPasswordSchema,
        confirmPassword: UserPasswordSchema,
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                code: 'custom',
                message: 'Password and Confirm Password does not match',
                path: ['password'],
            });
            ctx.addIssue({
                code: 'custom',
                message: 'Password and Confirm Password does not match',
                path: ['confirmPassword'],
            });
        }
    });

export const ResetPasswordSchema = z
    .object({
        currentPassword: UserPasswordSchema,
        newPassword: UserPasswordSchema,
        confirmPassword: UserPasswordSchema,
    })
    .superRefine(({ currentPassword, newPassword, confirmPassword }, ctx) => {
        if (currentPassword === newPassword) {
            ctx.addIssue({
                code: 'custom',
                message: 'New password cannot be the same as old password',
                path: ['newPassword'],
            });
        }
        if (newPassword !== confirmPassword) {
            ctx.addIssue({
                code: 'custom',
                message: 'New password and confirm password should be same',
                path: ['confirmPassword'],
            });
        }
    });

export const ForgotPasswordSchema = z.object({
    email: UserEmailSchema,
});

export const WebAuthnSignUpSchema = z.object({
    username: UsernameSchema,
    email: UserEmailSchema,
});

export const WebAuthnSignInSchema = z.object({
    username: UsernameSchema,
});

export const UserIdentitySchema = z.object({
    id: z.string(),
    name: z.string(),
    username: z.string(),
    email: z.string(),
    avatar: z.string(),
    installation_id: z.number(),
});

export const IdentitiesSchema = z.object({
    webauthn: UserIdentitySchema.optional(),
    github: UserIdentitySchema.optional(),
});
export type UserIdentities = z.infer<typeof IdentitiesSchema>;

export const OpenRegistryUserType = z.enum(['user', 'organization']);
export const OpenRegistryUserSchema = z.object({
    updated_at: z.coerce.date(),
    created_at: z.coerce.date(),
    identities: IdentitiesSchema.nullish(),
    username: z.string(),
    email: z.string(),
    id: z.string(),
    is_active: z.boolean().default(false),
    webauthn_connected: z.boolean().default(false),
    github_connected: z.boolean().default(false),
    user_type: OpenRegistryUserType.default('user'),
    favorite_repositories: z.array(z.string()).default([]),
    is_org_owner: z.boolean().default(false),
});

export const OpenRegistryOrgMember = z.object({
    updated_at: z.coerce.date(),
    created_at: z.coerce.date(),
    user_id: z.string(),
    organization_id: z.string(),
    pull: z.boolean().default(false),
    push: z.boolean().default(false),
    is_admin: z.boolean().default(false),
    user: OpenRegistryUserSchema,
});
