<script lang="ts">
	export let label = '';
	export let type = 'text';
	export let placeholder = '';
	export let subHeading = '';
	export let name = '';
	export let error = '';
	export let onInput = (e: any) => {};
</script>

<div class="relative flex w-full flex-wrap items-stretch">
	<span
		class="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-5 w-5 text-gray-500"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			<path
				fill-rule="evenodd"
				d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
				clip-rule="evenodd"
			/>
		</svg>
	</span>
	<input
		type="text"
		placeholder="Search..."
		class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded-md text-sm border-0 shadow outline-none focus:outline-none focus:border-brown-600 focus:ring-brown-700 w-full pl-10"
	/>
</div>
