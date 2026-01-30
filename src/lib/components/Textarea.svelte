<script lang="ts">
  import { appSettings } from '$lib/stores/app-settings';

  type Props = {
    value: string;
    autofocus?: boolean;
    nopadding?: boolean;
  };

  let { value = $bindable(), autofocus, nopadding }: Props = $props();
  let textarea: HTMLTextAreaElement | null = $state(null);

  const resize = () => {
    if (!textarea) return;
    textarea.style.height = 'auto';

    // Step 2: Set height to scrollHeight (total content height)
    // Add a small buffer (e.g., 2px) to prevent scrollbar flicker in some browsers
    textarea.style.minHeight = `${textarea.scrollHeight}px`;
  };

  $effect(() => {
    resize();
    if (autofocus) {
      textarea?.focus({ preventScroll: true });
    }
  });
</script>

<svelte:window onresize={resize} />

{#if $appSettings.edit}
  <textarea
    bind:this={textarea}
    bind:value
    oninput={resize}
    class="textarea"
    class:nopadding
  ></textarea>
{:else}
  <div class="textarea" class:nopadding>{value}</div>
{/if}

<style lang="scss">
  .textarea {
    font: inherit;
    padding: 0.3em;
    flex-grow: 1;
    font-family: var(--font-written);

    &.nopadding {
      padding: 0;
    }
  }
</style>
