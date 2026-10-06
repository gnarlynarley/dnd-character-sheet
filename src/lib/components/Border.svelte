<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children?: Snippet;
		grid?: boolean;
		padding?: 'sm';
		nopadding?: boolean;
		absolute?: boolean;
		rounded?: boolean;
		noshadow?: boolean;
		transparent?: boolean;
		faded?: boolean;
		small?: boolean;
		nogrow?: boolean;
		withHover?: boolean;
		flex?: boolean;
	};

	const {
		children,
		grid,
		padding,
		nopadding,
		absolute,
		rounded,
		noshadow,
		transparent,
		faded,
		small,
		nogrow,
		withHover,
		flex
	}: Props = $props();
</script>

<div
	class="container"
	class:nopadding
	class:isSmallPadding={padding === 'sm'}
	class:grid
	class:absolute
	class:rounded
	class:noshadow
	class:transparent
	class:faded
	class:small
	class:nogrow
	class:withHover
	class:flex
>
	<div class="inner">{@render children?.()}</div>
</div>

<style lang="scss">
	@mixin border-radius {
		corner-shape: squircle;
		border-radius: 1em;
	}

	.container {
		--padding: var(--gutter);
		--border-radius: 0.3em;
		--color-border: currentColor;
		position: relative;
		z-index: 0;
		padding: calc(var(--padding) + var(--border-size));
		flex-grow: 1;
		display: flex;

		&::after {
			content: '';
			display: block;
			width: calc(100% + (var(--border-size) * 2));
			height: calc(100% + (var(--border-size) * 2));
			position: absolute;
			top: calc(var(--border-size) * -1);
			left: calc(var(--border-size) * -1);
			border: var(--border-size) solid var(--color-border);
			border-bottom-width: calc(var(--border-size) * 1.5);
			border-right-width: calc(var(--border-size) * 1.5);
			filter: var(--filter-pencil);
			pointer-events: none;
			border-radius: var(--border-radius);
			background-color: var(--color-paper);
			z-index: 0;
			filter: drop-shadow(var(--shadow-distance) var(--shadow-distance) 0 var(--color-faded));
			@include border-radius();
		}

		&.isSmallPadding {
			--padding: calc(var(--gutter) * 0.5);
		}

		&.nopadding {
			--padding: 0;
		}
		&.rounded {
			aspect-ratio: 1/1;
			align-items: center;
			justify-content: center;
			flex-grow: 0;

			.inner {
				align-items: center;
				justify-content: center;
			}

			&::after {
				border-radius: 50%;
			}
		}

		&.noshadow {
			box-shadow: none;
		}

		&.transparent {
			background-color: transparent;
		}

		&.small::after {
			--border-size: 0.1em;
		}

		&.absolute {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			padding: 0;
		}

		&.faded::after {
			background-color: var(--color-faded);
		}

		&.nogrow {
			flex-grow: 0;
		}

		&.withHover {
			&:active {
				scale: 0.95;
			}
			&:hover::after {
				background-color: var(--color-accent);
			}
		}
	}

	.inner {
		padding: var(--border-size);
		position: relative;
		z-index: 1;
		flex-grow: 1;
		width: 100%;
		@include border-radius();
		overflow: auto;

		.flex & {
			display: flex;
		}
	}
</style>
