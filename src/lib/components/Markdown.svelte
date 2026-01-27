<script lang="ts">
  import { parse } from 'marked';
  import Textarea from './Textarea.svelte';
  import { appSettings } from '$lib/stores/app-settings';

  type Props = {
    code: string;
  };

  let { code = $bindable() }: Props = $props();
  const parsed = $derived(parse(code));
  let edit = $derived($appSettings.edit);
</script>

{#if edit}
  <div class="content">
    <Textarea bind:value={code} autofocus />
  </div>
{:else}
  <div class="content">
    {#if parsed}
      {@html parsed}
    {/if}
  </div>
{/if}

<style>
  .content {
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
    background-color: var(--color-editable);

    :global(h1) {
      font-size: 1.4em;
    }
  }
</style>
