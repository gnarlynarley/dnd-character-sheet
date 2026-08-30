<script lang="ts">
  import { appSettings } from '$lib/stores/app-settings';
  import Card from './Card.svelte';
  import Flex from './Flex.svelte';
  import Markdown from './Markdown.svelte';
  import Textarea from './Textarea.svelte';

  type Props = {
    code: string;
  };

  let { code = $bindable() }: Props = $props();
  let edit = $derived($appSettings.edit);
  let dialog: HTMLDialogElement | null = $state(null);

  function openDialog() {
    if (!dialog) return;
    dialog.showModal();
  }
</script>

{#if edit}
  <div class="content">
    <button type="button" onclick={openDialog}>⛶</button>
    <Textarea bind:value={code} />
  </div>
  <dialog bind:this={dialog} closedby="any">
    <Card>
      <Flex column align="end">
        <form method="dialog"><button type="submit">Close</button></form>
        <Textarea bind:value={code} />
      </Flex>
    </Card>
  </dialog>
{:else}
  <Markdown {code} />
{/if}

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

    button {
      position: absolute;
      top: 0;
      right: 0;
      width: 1.4rem;
      height: 1.4rem;
      line-height: 1;
      font-size: 1.5rem;
    }
  }

  dialog {
    margin: auto;
    width: 100%;
    height: 100%;
    max-width: 60em;
    padding: var(--gutter);
    font-size: 1rem;
    background-color: transparent;
    border: none;
    padding: 3px;

    &[open] {
      display: flex;
    }

    &::backdrop {
      background: color-mix(in srgb, var(--color-paper) 90%, transparent);
      backdrop-filter: blur(3px);
    }
  }
</style>
