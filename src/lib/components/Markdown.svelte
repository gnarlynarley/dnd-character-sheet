<script lang="ts">
  import { parse } from 'marked';

  type Props = {
    code: string;
  };

  const { code }: Props = $props();
  const parsed = $derived(parse(code));
</script>

<div class="content">
  {#if parsed}
    {@html parsed}
  {/if}
</div>

<style>
  .content {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    font-family: var(--font-written);
    font-size: 1.3em;
    line-height: 1.4;

    :global(h1) {
      font-size: 1.4em;
    }
  }
</style>
