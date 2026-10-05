<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children?: Snippet;
		centered?: boolean;
		right?: boolean;
		spread?: boolean;
	};

	const { children, centered, right, spread }: Props = $props();
</script>

<div class="cell" class:centered class:right class:spread>
	<div class="inner">{@render children?.()}</div>
</div>

<style lang="scss">
	.cell {
		display: flex;
		height: 100%;

		&:not(:last-child) {
			padding-right: calc(var(--gutter) * 0.5);
			&::after {
				content: '';
				width: calc(var(--gutter) * 0.5);
				height: 100%;
				margin-left: auto;
				border-right: var(--border);
				filter: url('#pencil');
			}
		}

		&.centered {
			justify-content: center;
		}

		&.right {
			justify-content: end;
		}

		&.spread {
			grid-column: 1 / -1;
		}
	}

	.inner {
		display: flex;
		align-items: start;
		padding-block: calc(var(--gutter) - (var(--row-gap) * 2));
		width: 100%;
	}
</style>
