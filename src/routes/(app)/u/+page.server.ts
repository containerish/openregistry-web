import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent, locals }) => {
    await parent()
    if (!locals.user) {
        throw error(401, {
            message: 'Unauthorised',
        })
    }

    return { user: locals.user }
}
