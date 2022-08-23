export async function load({ params }) {
	return {
		repo: params.repo,
		username: params.username
	};
}
