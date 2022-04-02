cloudflare-adapter:
	sed "s/VITE_OPEN_REGISTRY_ENVIRONMENT=local/VITE_OPEN_REGISTRY_ENVIRONMENT=cloudflare/" env.example > .env

cloudflare: cloudflare-adapter envs
	yarn build

envs:
	env | grep VITE_OPEN_REGISTRY > .env
