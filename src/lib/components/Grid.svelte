<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    children?: Snippet;
    absolute?: boolean;
  };

  const { children, absolute }: Props = $props();
</script>

<div class="grid" class:absolute>
  {@render children?.()}
</div>

<style lang="scss">
  .grid {
    position: relative;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: var(--gutter);

    &.absolute {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(
          var(--color-faded) 0.1em,
          transparent 0.1em
        ),
        linear-gradient(90deg, var(--color-faded) 0.1em, transparent 0.1em);
      background-size: 1em 1em;
      mix-blend-mode: multiply;
      filter: url('#pencil');
      z-index: 1;
      pointer-events: none;
    }

    > :global(*) {
      flex-grow: 1;
    }
  }
</style>
