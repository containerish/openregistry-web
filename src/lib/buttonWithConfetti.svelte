<script lang="ts">
	import { browser } from '$app/environment';
	import CheckIcon from './icons/checkIcon.svelte';
	import confetti from 'canvas-confetti';

	if (browser) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		var canvas = document.getElementById('confetti') as HTMLCanvasElement & { confetti: any };
		if (canvas) {
			canvas.confetti = canvas.confetti || confetti.create(canvas, { resize: true });

			canvas.confetti({
				spread: 70,
				origin: { y: 1.2 },
			});
		}
	}
</script>

<div id="confetti">
	<CheckIcon class="h-32 w-32 text-emrald-600" />
</div>
