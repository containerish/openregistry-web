import { redirect } from '@sveltejs/kit';
import { Auth } from '../../../apis/auth';
const auth = new Auth();
export async function load({}) {
	const { data } = await auth.GetUserWithSession();

	// send user back if they were here after good auth
	if (data) {
		throw redirect(301, '/repositories');
	}

	return {};
}
