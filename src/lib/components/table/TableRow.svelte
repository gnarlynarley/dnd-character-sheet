<script lang="ts">
import type { Snippet } from "svelte";

type Props = {
	children?: Snippet;
	sticky?: boolean;
};

const { children, sticky }: Props = $props();
</script>

<div class="row" class:sticky>{@render children?.()}</div>

<style lang="scss">
  .row {
    --row-gap: 0.4em;
    position: relative;
    display: grid;
    grid-template-columns: subgrid;
    grid-column: 1 / -1;
    align-items: center;
    background: var(--color-paper);
    padding-block: var(--row-gap);

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      border-bottom: var(--border-size) solid var(--color-ink);
    }

    &.sticky {
      position: sticky;
      top: 0;
      left: 0;
      z-index: 1;
    }
  }
</style>
