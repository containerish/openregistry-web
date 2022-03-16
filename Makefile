cloudflare-adapter:
	sed "s/VITE_OPEN_REGISTRY_ENVIRONMENT=local/VITE_OPEN_REGISTRY_ENVIRONMENT=cloudflare/" env.example >> .env

cloudflare: cloudflare-adapter
	yarn build

