<script lang="ts">
  import type { Snippet } from 'svelte';
  import Card from './Card.svelte';

  type Props = {
    children?: Snippet;
    title?: string;
    onclose?: () => void;
  };

  const { children, title, onclose }: Props = $props();

  function handleEscape(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.stopPropagation();
      event.preventDefault();
      onclose?.();
    }
  }
</script>

<svelte:window on:keydown={handleEscape} />

<div class="modal">
  <div>
    <Card {title}>
      {@render children?.()}
    </Card>
  </div>
</div>

<style>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: color-mix(in srgb, var(--color-paper) 90%, transparent);
    backdrop-filter: blur(4px);
    z-index: 1000;
  }
</style>
