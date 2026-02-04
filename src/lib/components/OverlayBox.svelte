<script lang="ts">
  import type { Snippet } from 'svelte';
  import BorderLine from './BorderLine.svelte';

  type Props = {
    children?: Snippet;
  };

  const { children }: Props = $props();
</script>

<div class="wrapper">
  <div class="inner">
    {@render children?.()}
  </div>
</div>

<style lang="scss">
  .wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    background-color: color-mix(in srgb, var(--color-paper) 95%, transparent);
    backdrop-filter: blur(3px);
    box-shadow: 0 0 5px rgba(black, 0.2);

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 0;
      width: 100%;
      height: var(--border-size);
      background-color: var(--color-ink);
      filter: var(--paper);
    }

    &::before {
      top: calc(var(--border-size) * -1);
    }
    &::after {
      bottom: calc(var(--border-size) * -1);
    }
  }
</style>
