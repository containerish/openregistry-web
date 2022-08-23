import { Auth, type User } from '../apis/auth';

export async function load (layoutData) {
    const auth = new Auth();
    console.log("layoutData: ",layoutData)

    const { data, error, status } = await auth.GetUserWithSession();
	if (error) {
		return {
			status: status,
			error: JSON.stringify(error.message),
			// signinPath: signinPath,
			// pathname: url.pathname,
			// openSignInModal: openSignInModal,
			authenticated: false
		};
	}
    return {
		// signinPath: signinPath,
		// pathname: url.pathname,
		// openSignInModal: openSignInModal,
		user: data,
		authenticated: true
	};
}
