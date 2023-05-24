<script lang="ts">
	import ButtonSolid from './button-solid.svelte';
	export let logo: string;
	export let link: string;
	export let body = '';
	import { twMerge } from 'tailwind-merge';
</script>

{#if logo}
	<div
		class={twMerge(
			`m-4 group hover:bg-opacity-50 container rounded max-w-sm max-h-sm flex justify-center 
			items-center mx-auto bg-slate-50`,
			$$props.class
		)}
	>
		<div class="p-2 flex flex-col items-center gap-3 justify-center group-hover:opacity-25">
			<img class="h-10" alt="logo" src={logo} />
			<span class="block text-slate-700 antialiased text-xs text-center">
				{body}
			</span>
		</div>
		<div class="absolute opacity-0 group-hover:opacity-100">
			<div class="text-center">
				<a class="hover:no-underline" href={link}><ButtonSolid>Learn More</ButtonSolid></a>
			</div>
		</div>
	</div>
{/if}
