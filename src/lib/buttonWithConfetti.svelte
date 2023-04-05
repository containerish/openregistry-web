<script>
	import CheckIcon from './icons/checkIcon.svelte';
	import confetti from 'canvas-confetti';

	var canvas = document.getElementById('confetti');
	canvas.confetti = canvas.confetti || confetti.create(canvas, { resize: true });

	canvas.confetti({
		spread: 70,
		origin: { y: 1.2 }
	});
</script>

<div id="confetti">
	<CheckIcon class="h-32 w-32 text-green-600" />
</div>
