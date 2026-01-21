<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    children?: Snippet;
  };

  const { children }: Props = $props();
</script>

<div class="page">
  <div class="inner">
    {@render children?.()}
  </div>
</div>

<style lang="scss">
  .page {
    flex-direction: column;
    aspect-ratio: 210/296;
    container-type: inline-size;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    padding: var(--gutter);
    break-after: page;
    overflow: hidden;

    @media screen {
      width: 100em;
      margin-inline: auto;
    }
  }

  .inner {
    font-size: 0.95cqw;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    padding: var(--gutter);
  }
</style>
