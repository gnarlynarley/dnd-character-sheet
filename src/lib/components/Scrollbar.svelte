<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    children?: Snippet;
  };

  let container = $state<HTMLDivElement | null>(null);
  let inner = $state<HTMLDivElement | null>(null);
  const { children }: Props = $props();
</script>

<div class="wrapper" bind:this={container}>
  <div class="inner" bind:this={inner}>
    {@render children?.()}
  </div>
</div>

<style>
  .wrapper {
    flex-grow: 1;
    height: 100%;
    overflow: auto;
    position: relative;
  }

  .inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
