<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    children?: Snippet;
    hide?: boolean;
  };

  const { children, hide = true }: Props = $props();
</script>

<div class:hide>{@render children?.()}</div>

<style lang="scss">
  div {
    flex-grow: 1;
    display: flex;

    &.hide {
      @media print {
        display: none;
      }
    }
  }
</style>
