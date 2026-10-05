<script lang="ts">
	type Props = { spread?: boolean; vertical?: boolean; faded?: boolean };

	const { spread, vertical, faded }: Props = $props();
</script>

<div class:spread class:vertical class:faded></div>

<style>
	div {
		filter: var(--filter-pencil);

		&.spread {
			margin-left: calc(var(--gutter) * -1);
			width: calc(100% + (var(--gutter) * 2));
		}

		&:not(.vertical) {
			border-top: var(--border-sm);
			width: 100%;
		}

		&.vertical {
			border-left: var(--border-sm);
		}

		&.faded {
			border-color: var(--color-faded);
		}
	}
</style>
