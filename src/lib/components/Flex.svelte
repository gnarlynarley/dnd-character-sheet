<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    children?: Snippet;
    padding?: boolean | 'vertical' | 'horizontal';
    full?: boolean;
    column?: boolean;
    nogap?: boolean;
    justify?: 'start' | 'center' | 'end' | 'between';
    align?: 'start' | 'center' | 'end';
    sm?: boolean;
    xl?: boolean;
  };

  const {
    children,
    padding,
    full,
    column,
    nogap,
    justify,
    align,
    sm,
    xl,
  }: Props = $props();
</script>

<div
  class="flex"
  class:paddingVertical={padding === 'vertical' || padding === true}
  class:paddingHorizontal={padding === 'horizontal' || padding === true}
  class:column
  class:full
  class:nogap
  class:justifyStart={justify === 'start'}
  class:justifyCenter={justify === 'center'}
  class:justifyEnd={justify === 'end'}
  class:justifyBetween={justify === 'between'}
  class:alignStart={align === 'start'}
  class:alignCenter={align === 'center'}
  class:alignEnd={align === 'end'}
  class:sm
  class:xl
>
  {@render children?.()}
</div>

<style lang="scss">
  .flex {
    display: flex;
    flex-grow: var(--flex-grow, 1);
    flex-shrink: var(--flex-shrink, 1);

    &.paddingVertical {
      padding-block: var(--gutter);
    }
    &.paddingHorizontal {
      padding-inline: var(--gutter);
    }

    &:not(.nogap) {
      gap: var(--gutter);
    }

    &.sm {
      gap: calc(var(--gutter) * 0.5);
    }

    &.xl {
      gap: calc(var(--gutter) * 1.5);
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
