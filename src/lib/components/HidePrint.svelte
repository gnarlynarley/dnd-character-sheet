<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    children?: Snippet;
  };

  const { children }: Props = $props();
</script>

<div>{@render children?.()}</div>

<style>
  div {
    @media print {
      display: none;
    }
  }
</style>
