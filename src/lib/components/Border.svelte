<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    children?: Snippet;
    grid?: boolean;
    nopadding?: boolean;
    absolute?: boolean;
    rounded?: boolean;
    noshadow?: boolean;
    transparent?: boolean;
    faded?: boolean;
    small?: boolean;
    nogrow?: boolean;
    withHover?: boolean;
  };

  const {
    children,
    grid,
    nopadding,
    absolute,
    rounded,
    noshadow,
    transparent,
    faded,
    small,
    nogrow,
    withHover,
  }: Props = $props();
</script>

<div
  class="container"
  class:nopadding
  class:grid
  class:absolute
  class:rounded
  class:noshadow
  class:transparent
  class:faded
  class:small
  class:nogrow
  class:withHover
>
  <div class="inner">
    {@render children?.()}
  </div>
</div>

<style lang="scss">
  .container {
    --border-size: 1.5pt;
    --border-radius: 0.3em;
    --color-border: var(--color-ink);
    position: relative;
    z-index: 0;
    padding: calc(var(--gutter) + var(--border-size));
    flex-grow: 1;
    display: flex;
    box-shadow: 0.5em 0.5em 0 var(--color-faded);
    border-radius: var(--border-radius);

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
      filter: url(#pencil);
      pointer-events: none;
      border-radius: var(--border-radius);
      background-color: var(--color-paper);
      z-index: 0;
    }

    &.nopadding {
      padding: 0;
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
      --border-size: 0.5pt;
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
        translate: var(--shadow-distance) var(--shadow-distance);
        &::after {
          filter: none;
        }
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
  }
</style>
