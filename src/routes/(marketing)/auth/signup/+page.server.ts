import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { RequestEvent } from './$types';
import { ZodError } from 'zod';
import { SignUpSchema } from '$lib/formSchemas';

export const actions: Actions = {
    default: async (event: RequestEvent) => {
        const { fetch, request } = event;
        const formData = Object.fromEntries(await request.formData());

        try {
            const body = SignUpSchema.parse(formData);
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                body: JSON.stringify(body),
            });
            const data = await response.json();
            if (response.status !== 201) {
                return fail(response.status, {
                    data: body,
                    error: data,
                    formErrors: [data.message],
                    message: 'Error signing up',
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
        }
    },
};
