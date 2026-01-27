<script lang="ts">
  import type { Snippet } from 'svelte';

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
