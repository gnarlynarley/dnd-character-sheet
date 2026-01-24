<script lang="ts">
  import type { Snippet } from 'svelte';
  import ButtonStyling from './ButtonStyling.svelte';

  type Props = {
    children?: Snippet;
    type?: 'button' | 'submit' | 'reset';
    onclick?: () => void;
  };

  const { children, type = 'button', onclick }: Props = $props();
</script>

<button {type} {onclick}>
  <ButtonStyling>
    {@render children?.()}
  </ButtonStyling>
</button>

<style>
  button {
    all: unset;
    cursor: pointer;
    display: inline-block;
    font-family: var(--font-written);
  }
</style>
