import { z } from 'zod';

export const signInSchema = z.object({
	// since an email can be at least 3 chars and at max 256 chars long
	// https://stackoverflow.com/a/574698/7564646
	email: z.string({ required_error: 'Email is required' })
		.min(3, { message: 'A valid email address is required' })
		.max(256, { message: 'Maximum length of en email is 256 characters' })
		.email(),
	password: z.string({ required_error: 'Password is required' })
		.regex(new RegExp(".*[A-Z].*"), "An uppercase letter is missing")
		.regex(new RegExp(".*[a-z].*"), "A lowercase letter is missing")
		.regex(new RegExp(".*\\d.*"), "A number is missing")
		.regex(
			new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
			"A special character is missing"
		).
		min(8, { message: 'Password must be at least 8 characters longs' }).
		max(128, { message: 'Maximum allowed length for password is 128 characters' }).
		// regex(new RegExp("^[ A-Za-z0-9]*$"), { message: 'Password must contain at least one of each: upper case letter, lower case letter, special character and number' }).
		trim(),
})

export const signUpSchema = z.object({
	username: z.string({ required_error: 'Username is required' })
		.min(3).max(28).trim(),
	email: z.string({ required_error: 'Email is required' }).email(),
	password: z.string({ required_error: 'Password is required' })
		.regex(new RegExp(".*[A-Z].*"), "An uppercase letter is missing")
		.regex(new RegExp(".*[a-z].*"), "A lowercase letter is missing")
		.regex(new RegExp(".*\\d.*"), "A number is missing")
		.regex(
			new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
			"A special character is missing"
		).
		min(8, { message: 'Password must be at least 8 characters longs' }).
		max(128, { message: 'Maximum allowed length for password is 128 characters' }).
		trim(),
	confirmPassword: z.string({ required_error: 'Confirm password is required' })
		.regex(new RegExp(".*[A-Z].*"), "An uppercase letter is missing")
		.regex(new RegExp(".*[a-z].*"), "A lowercase letter is missing")
		.regex(new RegExp(".*\\d.*"), "A number is missing")
		.regex(
			new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
			"A special character is missing"
		).
		min(8, { message: 'Password must be at least 8 characters longs' }).
		max(128, { message: 'Maximum allowed length for password is 128 characters' }).
		trim(),
}).superRefine(({ password, confirmPassword }, ctx) => {
	if (password !== confirmPassword) {
		ctx.addIssue({
			code: 'custom',
			message: 'Password and Confirm Password does not match',
			path: ['password']
		})
		ctx.addIssue({
			code: 'custom',
			message: 'Password and Confirm Password does not match',
			path: ['confirmPassword']
		})
	}
})
