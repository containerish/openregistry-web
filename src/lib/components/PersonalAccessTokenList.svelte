<script lang="ts">
	import EmptyListMessage from './EmptyListMessage.svelte';
	import type { OpenRegistryClient } from '$lib/client/openregistry';
	import CreatePATModal from './CreatePATModal.svelte';
	import { SpinnerCircle } from '$lib/icons';
	import type { AuthTokenList } from '$lib/types';
	import { isFuture } from 'date-fns';

	export let openRegistryClient: OpenRegistryClient;
	export let listUserAuthTokens: () => Promise<AuthTokenList>;
	export let tokens: AuthTokenList = [];

	let isTokensLoading = false;

	const handleTokenGenerate = async () => {
		tokens = await listUserAuthTokens();
	};

	const hasTokenExpired = (expiresAt: Date) => {
		return !isFuture(expiresAt);
	};
</script>

<div class="flex w-full flex-col gap-4">
	<div class="flex w-full items-start justify-between">
		<div class="flex flex-col gap-1">
			<span class="font-semibold">Tokens</span>
			<p class="text-sm leading-4 text-slate-500"
				>Personal access tokens are an easy and efficient way of logging into OpenRegistry, e.g CI/CD pipelines,
				CLIs, and account with Webauthn login method can use this as registry login credentials</p
			>
		</div>
		<div class="flex w-11/12 justify-end">
			<CreatePATModal on:generate={handleTokenGenerate} {openRegistryClient} />
		</div>
	</div>

	<div class="w-full">
		{#if isTokensLoading}
			<div class="flex w-full items-center justify-center gap-3 px-2 py-4">
				<SpinnerCircle />
				Loading...
			</div>
		{:else if tokens && tokens.length > 0}
			<div class="flex w-full flex-col items-center justify-center gap-3 py-2">
				{#each tokens as token, id (id)}
					<div
						class="flex w-full justify-between gap-2 rounded border border-primary-100 bg-primary-50/50 px-4 py-1"
					>
						<div class="flex w-full flex-col gap-2">
							<span class="font-semibold text-primary-600">{token.name}</span>
							<span
								class="text-sm italic {hasTokenExpired(token.expires_at)
									? 'text-rose-600'
									: 'text-slate-500'}"
							>
								{#if hasTokenExpired(token.expires_at)}
									Expired on
								{:else}
									Expires on
								{/if}
								<span class="text-xs font-semibold">
									{token.expires_at.toDateString()}
								</span>
							</span>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<EmptyListMessage
				title="No auth tokens found"
				description="Looks like you do not have any existing auth tokens. Try generating one?"
			/>
		{/if}
	</div>
</div>
