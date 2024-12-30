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

<div class="w-full flex gap-4 flex-col">
	<div class="w-full flex justify-between items-start">
		<div class="gap-1 flex flex-col">
			<span class="font-semibold">Tokens</span>
			<p class="text-sm leading-4 text-slate-500"
				>Personal access tokens are an easy and efficient way of logging into OpenRegistry, e.g CI/CD pipelines,
				CLIs, and account with Webauthn login method can use this as registry login credentials</p
			>
		</div>
		<div class="w-11/12 flex justify-end">
			<CreatePATModal on:generate={handleTokenGenerate} {openRegistryClient} />
		</div>
	</div>

	<div class="w-full">
		{#if isTokensLoading}
			<div class="w-full flex gap-3 justify-center items-center py-4 px-2">
				<SpinnerCircle />
				Loading...
			</div>
		{:else if tokens && tokens.length > 0}
			<div class="flex py-2 w-full justify-center items-center flex-col gap-3">
				{#each tokens as token, id (id)}
					<div
						class="gap-2 bg-primary-50/50 border border-primary-100 py-1 px-4 rounded flex w-full justify-between"
					>
						<div class="flex w-full flex-col gap-2">
							<span class="text-primary-600 font-semibold">{token.name}</span>
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
