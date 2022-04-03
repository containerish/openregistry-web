cloudflare: envs
	yarn build

envs:
	echo "VITE_OPEN_REGISTRY_ENVIRONMENT=cloudflare" > .env
	env | grep VITE_OPEN_REGISTRY > .env
