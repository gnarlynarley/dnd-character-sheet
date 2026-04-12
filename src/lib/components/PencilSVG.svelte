<script lang="ts">
const DEFAULT_SCALE = 1.5;
let scale = $state(DEFAULT_SCALE);

function beforeprint() {
	scale = 0.8;
}
function afterprint() {
	scale = DEFAULT_SCALE;
}
</script>

<svelte:window on:beforeprint={beforeprint} on:afterprint={afterprint} />

<svg width="0" height="0" style="display: none;">
	<title>Filter for the site</title>
	<filter id="pencil">
		<feTurbulence
			type="fractalNoise"
			baseFrequency="0.5"
			numOctaves="1"
			result="noise"
		/>
		<feDisplacementMap in="SourceGraphic" in2="noise" {scale} />
	</filter>
</svg>
