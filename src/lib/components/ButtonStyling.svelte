<script lang="ts">
  import type { Snippet } from 'svelte';
  import Border from './Border.svelte';

  type Props = {
    children?: Snippet;
    pending?: boolean;
  };

  const { children, pending }: Props = $props();
</script>

<div class="wrapper" class:pending>
  <Border withHover nopadding>
    <div class="inner">
      {@render children?.()}
    </div>
  </Border>
</div>

<style>
  .wrapper {
    position: relative;
  }
  .inner {
    font-family: var(--font-written);
    font-size: 1.4em;
    padding: calc(var(--gutter) / 2) var(--gutter);
    text-wrap: nowrap;
  }

  .pending {
    cursor: wait;
    color: color-mix(in srgb, var(--color-ink) 60%, transparent);

    &::after {
      --size: 2em;
      content: '';
      position: absolute;
      top: calc(50% - (var(--size) / 2));
      left: calc(50% - (var(--size) / 2));
      rotate: 0deg;
      transform-origin: center center;
      display: block;
      width: 2em;
      height: 2em;
      border: 2px solid currentColor;
      border-bottom-color: transparent;
      border-radius: 50%;
      filter: url('#pencil');
      animation: spin 1s linear infinite;
    }

    .inner {
      opacity: 0;
    }
  }

  @keyframes spin {
    from {
      rotate: 0deg;
    }
    to {
      rotate: 360deg;
    }
  }
</style>
