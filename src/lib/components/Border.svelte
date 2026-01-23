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
>
  <div class="inner">
    {@render children?.()}
  </div>
</div>

<style lang="scss">
  .container {
    --border-size: 1pt;
    position: relative;
    z-index: 0;
    padding: var(--gutter);
    flex-grow: 1;

    &::after {
      content: '';
      display: block;
      width: calc(100% + (var(--border-size) * 2));
      height: calc(100% + (var(--border-size) * 2));
      position: absolute;
      top: calc(var(--border-size) * -1);
      left: calc(var(--border-size) * -1);
      border: var(--border);
      filter: url(#pencil) var(--shadow);
      pointer-events: none;
      border-radius: 0.3em;
      background-color: var(--color-paper);
      z-index: 0;
    }

    &.nopadding {
      padding: 0;
    }
    &.rounded::after {
      border-radius: 50%;
    }

    &.noshadow {
      filter: none;
    }

    &.transparent {
      background-color: transparent;
    }

    &.small::after {
      border: var(--border-sm);
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
  }

  .inner {
    padding: var(--border-size);
    position: relative;
    z-index: 1;
  }
</style>
