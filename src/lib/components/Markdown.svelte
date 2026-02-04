<script lang="ts">
  import { micromark } from 'micromark';
  import { gfmTable, gfmTableHtml } from 'micromark-extension-gfm-table';

  type Props = {
    code: string;
  };

  const { code }: Props = $props();
  const parsed = $derived(
    micromark(code, {
      extensions: [gfmTable()],
      htmlExtensions: [gfmTableHtml()],
    }),
  );
</script>

<div class="content">
  {#if parsed}
    {@html parsed}
  {/if}
</div>

<style lang="scss">
  .content {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    font-family: var(--font-written);
    font-size: 1.3em;
    line-height: 1.4;
    text-align: left;
    min-height: 1em;

    :global(h1) {
      font-size: 1.6em;
    }
    :global(h2) {
      font-size: 1.3em;
    }
    :global(h3),
    :global(h4),
    :global(h5),
    :global(h6) {
      font-size: 1.2em;
    }

    :global(ol),
    :global(ul) {
      padding-left: 1em;
    }
  }
</style>
