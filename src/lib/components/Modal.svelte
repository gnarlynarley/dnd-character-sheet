<script lang="ts">
  import type { Snippet } from 'svelte';
  import Card from './Card.svelte';
  import { portal } from '$lib/actions/portal';
  import Scrollbar from './Scrollbar.svelte';

  type Props = {
    children?: Snippet;
    title?: string;
    full?: boolean;
    onclose?: () => void;
  };

  const { children, title, onclose, full }: Props = $props();

  function handleEscape(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.stopPropagation();
      event.preventDefault();
      onclose?.();
    }
  }
</script>

<svelte:window on:keydown={handleEscape} />

<div class="modal" class:full use:portal>
  <div class="inner">
    <Card {title}>
      <Scrollbar>
        <div class="child-wrapper">
          {@render children?.()}
        </div>
      </Scrollbar>
    </Card>
  </div>
</div>

<style lang="scss">
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: color-mix(in srgb, var(--color-paper) 80%, transparent);
    backdrop-filter: blur(4px);
    z-index: 1000;

    &.full {
      align-items: stretch;

      .inner {
        width: 100%;
        height: 100%;
        display: flex;
      }
    }
  }

  .inner {
    display: flex;
    padding: var(--gutter);
  }

  .child-wrapper {
    padding-inline: var(--gutter);
  }
</style>
