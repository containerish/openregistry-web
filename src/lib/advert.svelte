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
			'my-4 shadow-2xl group hover:bg-opacity-50 container rounded-sm aspect-square max-w-sm flex justify-center items-center mx-auto border border-primary-100 bg-white',
			$$props.class
		)}
	>
		<div
			class="px-4 py-4 bg-gray-100 flex flex-col items-center gap-6 justify-center group-hover:opacity-25"
		>
			<img class="h-10" alt="logo" src={logo} />
			<span class="block text-slate-700 text-center text-base">
				{body}
			</span>
		</div>
		<div class="absolute opacity-0 group-hover:opacity-100">
			<div class="text-center ">
				<a class="hover:no-underline" href={link}><ButtonSolid>Learn More</ButtonSolid></a>
			</div>
		</div>
	</div>
{/if}
