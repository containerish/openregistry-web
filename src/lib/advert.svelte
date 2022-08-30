<script lang="ts">
	export let logo: string;
	export let link: string;
	export let body = '';
	export let styles = '';
</script>

{#if logo}
	<div class="py-4 rounded-lg ">
		<div
			class="{styles} shadow-lg group hover:bg-opacity-50 container rounded-lg bg-gray-100 max-w-sm flex justify-center items-center mx-auto content-div"
		>
			<div>
				<div
					class="py-8 px-4 bg-gray-100 flex flex-col items-center gap-2 justify-center rounded-b-md fd-cl group-hover:opacity-25"
				>
					<img class="h-10 " alt="logo" src={logo} />
					<span class="block text-brown-800 text-center text-sm">
						{body}
					</span>
				</div>
			</div>
			<div class="absolute opacity-0 fd-sh group-hover:opacity-100">
				<div class="pt-8 text-center">
					<a
						target="_blank"
						href={link}
						class="text-center hover:no-underline rounded-lg py-3 px-4 bg-white text-brown-800 font-semibold text-lg"
					>
						Learn more
					</a>
				</div>
			</div>
		</div>
	</div>
{/if}
