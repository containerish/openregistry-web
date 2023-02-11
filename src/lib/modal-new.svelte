<script lang="ts">
	import ClickOutside from 'svelte-click-outside';
</script>

<div
	class="fixed duration-500 z-50 inset-0 overflow-y-auto"
	aria-labelledby="modal-title"
	role="dialog"
	aria-modal="true"
>
	<div
		class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
	>
		<div
			class="fixed duration-500 inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
			aria-hidden="true"
		/>
		<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
			>&#8203;</span
		>
		<div
			class="modal-close bg-slate-50 modal inline-block align-bottom duration-500 rounded-lg text-left
			overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
		>
			<slot />
		</div>
	</div>
</div>
