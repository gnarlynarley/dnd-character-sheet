<script lang="ts">
  import { micromark } from 'micromark';
  import Textarea from './Textarea.svelte';
  import { appSettings } from '$lib/stores/app-settings';
  import Flex from './Flex.svelte';

  type Props = {
    code: string;
  };

  let { code = $bindable() }: Props = $props();
  const parsed = $derived(micromark(code));
  let edit = $derived($appSettings.edit);
  let dialog: HTMLDialogElement | null = $state(null);

  function openDialog() {
    if (!dialog) return;
    dialog.showModal();
  }

  function closeDialog(event: MouseEvent) {
    if (!dialog) return;
    var rect = dialog.getBoundingClientRect();
    var isInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;
    if (!isInDialog) {
      dialog.close();
    }
  }
</script>

{#if edit}
  <div class="content">
    <button type="button" onclick={openDialog}>⛶</button>
    <Textarea bind:value={code} autofocus />
  </div>
  <dialog bind:this={dialog} onclick={closeDialog}>
    <Flex column align="end">
      <form method="dialog">
        <button type="submit">Close</button>
      </form>
      <Textarea bind:value={code} autofocus />
    </Flex>
  </dialog>
{:else}
  <div class="content">
    {#if parsed}
      {@html parsed}
    {/if}
  </div>
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
    background-color: var(--color-editable);

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

    &[open] {
      display: flex;
    }

    &::backdrop {
      background: color-mix(in srgb, var(--color-paper) 90%, transparent);
      backdrop-filter: blur(3px);
    }
  }
</style>
