<script lang="ts">
	import ButtonSolid from './button-solid.svelte';
	export let logo: string;
	export let link: string;
	export let body = '';
	export let styles = '';
</script>

{#if logo}
	
		<div
			class="{styles} my-4 shadow-2xl group hover:bg-opacity-50 container rounded-sm bg-gray-100
			max-w-sm flex justify-center items-center mx-auto content-div border border-primary-100 bg-white"
		>
			<div
				class="px-4 py-4 bg-gray-100 flex flex-col items-center gap-2 justify-center group-hover:opacity-25"
			>
				<img class="h-10 half:h-8 desktop:h-8" alt="logo" src={logo} />
				<span class="block text-slate-700 text-center text-sm">
					{body}
				</span>
			</div>
			<div class="absolute opacity-0 group-hover:opacity-100">
				<div class="pt-8 text-center ">
					<a class="hover:no-underline" href={link}
						><ButtonSolid styles="desktop:px-0">Learn More</ButtonSolid></a
					>
				</div>
			</div>
		</div>
	
{/if}
