<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    children?: Snippet;
    full?: boolean;
    column?: boolean;
    justify?: 'start' | 'center' | 'end' | 'between';
    align?: 'start' | 'center' | 'end';
    sm?: boolean;
  };

  const { children, full, column, justify, align, sm }: Props = $props();
</script>

<div
  class="flex"
  class:column
  class:full
  class:justifyStart={justify === 'start'}
  class:justifyCenter={justify === 'center'}
  class:justifyEnd={justify === 'end'}
  class:justifyBetween={justify === 'between'}
  class:alignStart={align === 'start'}
  class:alignCenter={align === 'center'}
  class:alignEnd={align === 'end'}
  class:sm
>
  {@render children?.()}
</div>

<style lang="scss">
  .flex {
    display: flex;
    flex-grow: var(--flex-grow, 1);
    gap: var(--gutter);
    flex-shrink: var(--flex-shrink, 1);

    &.sm {
      gap: calc(var(--gutter) * 0.5);
    }

    &.full {
      width: 100%;
    }

    &.column {
      flex-direction: column;
    }

    &.justifyStart {
      justify-content: flex-start;
    }
    &.justifyCenter {
      justify-content: center;
    }
    &.justifyEnd {
      justify-content: flex-end;
    }
    &.justifyBetween {
      justify-content: space-between;
    }

    &.alignStart {
      align-items: flex-start;
    }
    &.alignCenter {
      align-items: center;
    }
    &.alignEnd {
      align-items: flex-end;
    }
  }
</style>
