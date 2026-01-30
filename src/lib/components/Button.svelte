<script lang="ts">
  import type { Snippet } from 'svelte';
  import ButtonStyling from './ButtonStyling.svelte';

  type Props = {
    children?: Snippet;
    type?: 'button' | 'submit' | 'reset';
    onclick?: () => void;
  };

  const { children, type = 'button', onclick }: Props = $props();
  let pending = $state(false);

  function onClickWrapper() {
    if (pending) return;
    pending = true;
    Promise.resolve(onclick?.()).finally(() => {
      pending = false;
    });
  }
</script>

<button {type} onclick={onClickWrapper} class:pending>
  <ButtonStyling>
    <div class="inner">
      {@render children?.()}
    </div>
  </ButtonStyling>
</button>

<style lang="scss">
  button {
    all: unset;
    position: relative;
    cursor: pointer;
    display: inline-block;
    font-family: var(--font-written);

    &.pending {
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
