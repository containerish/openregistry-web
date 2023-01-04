<script lang="ts">
	export let logo: string;
	export let link: string;
	export let body = '';
	export let styles = '';
</script>

{#if logo}
	<div class="py-4 rounded-sm ">
		<div
			class="{styles} shadow-lg group hover:bg-opacity-50 container rounded-sm bg-gray-100
			max-w-sm flex justify-center items-center mx-auto content-div border border-primary-100 bg-white"
		>
			<div>
				<div
					class="py-8 px-4 bg-gray-100 flex flex-col items-center gap-2 justify-center rounded-b-md fd-cl group-hover:opacity-25"
				>
					<img class="h-10 " alt="logo" src={logo} />
					<span class="block text-slate-700 text-center text-sm">
						{body}
					</span>
				</div>
			</div>
			<div class="absolute opacity-0 fd-sh group-hover:opacity-100">
				<div class="pt-8 text-center ">
					<a
						target="_blank"
						rel="noreferrer"
						href={link}
						class="text-center hover:no-underline rounded-lg py-3 px-4 bg-primary-50 text-primary-500 border-2 border-primary-300 font-semibold text-lg"
					>
						Learn more
					</a>
				</div>
			</div>
		</div>
	</div>
{/if}
