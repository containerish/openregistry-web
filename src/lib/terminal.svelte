<script lang="ts">
	import { onMount } from 'svelte';
	import Typewriter from 'svelte-typewriter';

	let prompt = '<p class="text-emerald-300">jane@joe:~$ &nbsp;';
</script>

<div class="terminal-window">
	<header>
		<div class="button green" />
		<div class="button yellow" />
		<div class="button red" />
	</header>
	<section class="terminal">
		<div class="history" />
		<span class="prompt">
			<div class="flex">
				{@html prompt}
				<Typewriter interval={90} cascade={true}>
					<p>curl -sSL get.docker.com | bash</p>
					<p>echo "Qwerty@123" | docker login cntr.sh --username=janedoe --password-stdin</p>
				</Typewriter>
			</div>
		</span>
		<span class="typed-cursor" />
	</section>
</div>
<!-- data -->
<div class="terminal-data mimik-run-output">
	<br />Found 1 feature<br />
	----------------------------------------------<br />
	Feature: Bottles <span class="gray"># ./features/bottles.feature</span><br /><br />

	&nbsp;&nbsp;Scenario: A bottle falls from the wall<br />
	&nbsp;&nbsp;&nbsp;&nbsp;<span class="green">✓</span>
	<span class="gray">Given 100 green bottles are standing</span><br />
	&nbsp;&nbsp;&nbsp;&nbsp;<span class="green">✓</span>
	<span class="gray">when 1 green bottle accidentally falls</span><br />
	&nbsp;&nbsp;&nbsp;&nbsp;<span class="green">✓</span>
	<span class="gray">then there are 99 green bottles standing</span><br />
	<br />
	<span class="gray">&bsp;---------- ----------- ------- -------- --------</span><br />
	&nbsp;&nbsp;Features&nbsp;&nbsp;&nbsp;Scenarios&nbsp;&nbsp;&nbsp;Steps&nbsp;&nbsp;&nbsp;Passed&nbsp;&nbsp;&nbsp;Failed<br
	/>
	<span class="gray">&nbsp;---------- ----------- ------- -------- --------</span><br />
	&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
		class="green">✓ 4</span
	>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0 <br />
	<br />
	&nbsp;&nbsp;Completed 1 feature in 0.01s<br />
	<br />
</div>

<style>
	.terminal-window {
		text-align: left;
		width: 600px;
		height: 360px;
		border-radius: 10px;
		margin: auto;
		position: relative;
	}

	.terminal-window header {
		background: #e0e8f0;
		height: 30px;
		border-radius: 8px 8px 0 0;
		padding-left: 10px;
	}

	.terminal-window header .button {
		width: 12px;
		height: 12px;
		margin: 10px 4px 0 0;
		display: inline-block;
		border-radius: 8px;
	}

	.terminal-window header .button.green {
		background: #3bb662;
	}

	.terminal-window header .button.yellow {
		background: #e5c30f;
	}

	.terminal-window header .button.red {
		background: #e75448;
	}

	.terminal-window section.terminal {
		color: white;
		font-family: Menlo, Monaco, 'Consolas', 'Courier New', 'Courier';
		font-size: 11pt;
		background: #30353a;
		padding: 10px;
		box-sizing: border-box;
		position: absolute;
		width: 100%;
		top: 30px;
		bottom: 0;
		overflow: auto;
	}

	.terminal-window section.terminal .typed-cursor {
		opacity: 1;
		-webkit-animation: blink 0.7s nfinite;
		-moz-animation: blink 0.7s infinite;
		animation: blink 0.7s infinite;
	}
	@keyframes blink {
		0% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@-webkit-keyframes blink {
		0% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@-moz-keyframes blink {
		0% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	.terminal-data {
		display: none;
	}
	.terminal-window .gray {
		color: gray;
	}
	.terminal-window .green {
		color: green;
	}
</style>
