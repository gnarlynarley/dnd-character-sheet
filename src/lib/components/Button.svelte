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
  <ButtonStyling {pending}>
    {@render children?.()}
  </ButtonStyling>
</button>

<style lang="scss">
  button {
    all: unset;
    position: relative;
    cursor: pointer;
    display: inline-block;
    font-family: var(--font-written);
  }
</style>
