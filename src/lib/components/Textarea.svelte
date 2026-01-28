<script lang="ts">
  type Props = {
    value: string;
    autofocus?: boolean;
  };

  let { value = $bindable(), autofocus }: Props = $props();
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

<textarea bind:this={textarea} bind:value oninput={resize}></textarea>

<style>
  textarea {
    font: inherit;
    padding: 0.3em;
    flex-grow: 1;
    font-family: var(--font-written);
    font-size: 1.2rem;
  }
</style>
