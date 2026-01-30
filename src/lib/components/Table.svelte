<script lang="ts">
  import type { Snippet } from 'svelte';
  import BorderLine from './BorderLine.svelte';

  type Props = {
    children?: Snippet;
    row?: boolean;
    cell?: boolean;
    cells?: number;
    fillCell?: number;
    centered?: boolean;
  };

  const {
    children,
    row = false,
    cell = false,
    cells,
    fillCell,
    centered,
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
  {style}
>
  {@render children?.()}
</div>
{#if row}
  <div class="divider">
    <BorderLine />
  </div>
{/if}

<style lang="scss">
  .table {
    --cells: 5;
    --full: var(--cells);
    width: 100%;
    gap: calc(var(--gutter) * 0.5) 0;
    display: grid;
    grid-template-columns:
      repeat(calc(var(--cells) - 1), auto)
      repeat(1, 1fr)
      repeat(calc(var(--cells) - var(--full)), auto);
  }

  .row {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: 1 / -1;
    align-items: center;
  }

  .cell {
    display: flex;
    padding-right: var(--gutter);
    height: 100%;
    align-items: center;

    &.centered {
      justify-content: center;
    }
  }

  .divider {
    grid-column: 1 / -1;
  }
</style>
