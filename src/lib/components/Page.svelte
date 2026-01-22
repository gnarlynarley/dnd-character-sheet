<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    children?: Snippet;
    multiple?: boolean;
  };

  const { children, multiple }: Props = $props();
</script>

<div class="container">
  <div class="page" class:multiple>
    <div class="inner">
      {@render children?.()}
    </div>
  </div>
</div>

<style lang="scss">
  .page {
    flex-direction: column;
    container-type: inline-size;
    padding: var(--gutter);
    width: 100%;

    &:not(.multiple) {
      aspect-ratio: 210/296;
      overflow: hidden;
      break-before: page;

      @media print {
        width: 210mm;
        height: 296mm;
      }
    }

    @media screen {
      border: 3px solid var(--color-faded);
    }

    @media screen {
      max-width: 100em;
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
