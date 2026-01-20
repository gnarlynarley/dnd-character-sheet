<script lang="ts">
  import { parse } from 'marked';
  import Textarea from './Textarea.svelte';

  type Props = {
    code: string;
  };

  let { code = $bindable() }: Props = $props();
  const parsed = $derived(parse(code));
  let edit = $state(false);
</script>

{#if edit}
  <div class="content">
    <Textarea
      bind:value={code}
      autofocus
      onfocusout={() => {
        edit = false;
      }}
    />
  </div>
{:else}
  <button
    class="content"
    onclick={() => {
      edit = true;
    }}
  >
    {#if parsed}
      {@html parsed}
    {/if}
  </button>
{/if}

<style>
  .content {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    font-family: var(--font-written);
    font-size: 1.3em;
    line-height: 1.4;
    text-align: left;

    :global(h1) {
      font-size: 1.4em;
    }
  }
</style>
