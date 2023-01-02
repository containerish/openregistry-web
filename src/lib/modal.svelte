<script lang="ts">
</script>

<div
	class="fixed duration-500 z-50 inset-0 overflow-y-auto bg-primary-800 bg-opacity-60"
	aria-labelledby="modal-title"
	role="dialog"
	aria-modal="true"
>
	<div
		class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
	>
		<div
			class="fixed duration-500 inset-0 bg-gray-800 bg-opacity-30 transition-opacity"
			aria-hidden="true"
		/>
		<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
			>&#8203;</span
		>
		<div
			class="modal-close modal inline-block align-bottom bg-white border-2 border-primary-400 duration-500 rounded-lg text-left
			overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
		>
			<slot />
		</div>
	</div>
</div>
