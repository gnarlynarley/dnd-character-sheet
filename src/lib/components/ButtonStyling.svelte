<script lang="ts">
  import type { Snippet } from 'svelte';
  import Border from './Border.svelte';

  type Props = {
    children?: Snippet;
  };

  const { children }: Props = $props();
</script>

<Border withHover nopadding>
  <div class="inner">
    {@render children?.()}
  </div>
</Border>

<style>
  .inner {
    font-family: var(--font-written);
    font-size: 1.4em;
    padding: calc(var(--gutter) / 2) var(--gutter);
  }
</style>
