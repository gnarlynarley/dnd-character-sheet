<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children?: Snippet;
		fillCell?: number;
	};

	const { children, fillCell }: Props = $props();

	const style = $derived.by(() => {
		let string = '';
		if (fillCell) {
			string += `--full:${fillCell};`;
		}
		return string || undefined;
	});
</script>

<div class="table" {style}>{@render children?.()}</div>

<style lang="scss">
	.table {
		--full: 25; // arbitrary number.
		width: 100%;
		display: grid;
		grid-template-columns:
			repeat(calc(var(--full) - 1), auto)
			repeat(1, 1fr)
			repeat(25, auto);
	}
</style>
