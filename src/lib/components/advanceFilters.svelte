<script lang="ts">
	import ButtonOutlined from '$lib/button-outlined.svelte';
	import ButtonSolid from '$lib/button-solid.svelte';
	import Checkbox from '$lib/checkbox.svelte';
</script>

<div class="flex flex-col gap-6 items-center overflow-auto">
	<!-- <div class="flex justify-center items-center gap-4">
    <span class="text-xl lg:2xl text-primary-500 font-bold"
      >Advance Filters
    </span>
    <FilterIcon class="text-primary-500" />
  </div> -->

	<div class="flex flex-col gap-3 lg:gap-8 justify-center items-start px-6 py-3 w-full">
		<div class="flex flex-col gap-1 text-base xl:text-lg text-primary-500 text-start">
			<span class="text-base lg:text-xl font-medium antialiased">Operating System</span>
			<ul class="text-slate-600">
				<li><Checkbox label="Linux" /></li>
				<li><Checkbox label="Windows" /></li>
			</ul>
		</div>
		<div class="h-px w-full bg-slate-300 -mx-6" />
		<div class="flex flex-col gap-1 text-base xl:text-lg text-primary-500 text-start">
			<span class="text-base lg:text-xl font-medium antialiased">Categories</span>
			<ul class="text-slate-600">
				<li>
					<Checkbox label="Analytics" />
				</li>
				<li><Checkbox label="Base Images" /></li>
				<li><Checkbox label="Databases" /></li>
				<li><Checkbox label="Devops tools" /></li>
				<li>
					<Checkbox label="Featured Images" />
				</li>
				<li>
					<Checkbox label="Operating Systems" />
				</li>
				<li>
					<Checkbox label="Programming Languages" />
				</li>
				<li>
					<Checkbox label="Messaging Services" />
				</li>
				<li>
					<Checkbox label="Application Frameworks" />
				</li>
			</ul>
		</div>
		<div class="h-px w-full bg-slate-300 -mx-6" />
		<div class="flex flex-col gap-1 text-base xl:text-lg text-primary-500 text-start">
			<span class="text-base lg:text-xl font-medium antialiased">Architectures</span>
			<ul class="text-slate-600">
				<li><Checkbox label="ARM32" /></li>
				<li><Checkbox label="ARM64" /></li>
				<li><Checkbox label="X86" /></li>
				<li><Checkbox label="X86-64" /></li>
			</ul>
		</div>
	</div>
	<div class="flex w-full justify-between px-3">
		<ButtonOutlined>Clear all</ButtonOutlined>
		<ButtonSolid>Apply</ButtonSolid>
	</div>
</div>
