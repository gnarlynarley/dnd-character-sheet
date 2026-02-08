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
    background-color: color-mix(
      in srgb,
      color-mix(in srgb, var(--color-paper), white 10%) 95%,
      transparent
    );
    backdrop-filter: blur(10px) saturate(200%);

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 0;
      width: 100%;
      height: var(--border-size);
      background-color: var(--color-faded);
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
