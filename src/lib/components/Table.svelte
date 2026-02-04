<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    children?: Snippet;
    row?: boolean;
    cell?: boolean;
    cells?: number;
    fillCell?: number;
    centered?: boolean;
    right?: boolean;
    spread?: boolean;
    sticky?: boolean;
  };

  const {
    children,
    row = false,
    cell = false,
    cells,
    fillCell,
    centered,
    right,
    spread,
    sticky,
  }: Props = $props();

  const style = $derived.by(() => {
    if (row) return undefined;
    let string = '';
    if (cells) {
      string += `--cells:${cells};`;
    }
    if (fillCell) {
      string += `--full:${fillCell};`;
    }
    return string || undefined;
  });
</script>

<div
  class:table={row === false && cell === false}
  class:row
  class:cell
  class:centered
  class:right
  class:spread
  class:sticky
  {style}
>
  {@render children?.()}
</div>

<style lang="scss">
  .table {
    --cells: 5;
    --full: var(--cells);
    width: 100%;
    display: grid;
    grid-template-columns:
      repeat(calc(var(--cells) - 1), auto)
      repeat(1, 1fr)
      repeat(calc(var(--cells) - var(--full)), auto);
  }

  .row {
    position: relative;
    display: grid;
    grid-template-columns: subgrid;
    grid-column: 1 / -1;
    align-items: center;
    background: var(--color-paper);
    padding: var(--gutter);

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

  .cell {
    display: flex;
    padding-right: var(--gutter);
    height: 100%;
    align-items: center;

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
</style>
