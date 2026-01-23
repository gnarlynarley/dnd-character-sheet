<script lang="ts">
  import type { Snippet } from 'svelte';
  import Border from './Border.svelte';

  type Props = {
    children?: Snippet;
    type?: 'button' | 'submit' | 'reset';
    onclick?: () => void;
  };

  const { children, type = 'button', onclick }: Props = $props();
</script>

<button {type} {onclick}>
  <Border withHover>
    {@render children?.()}
  </Border>
</button>

<style>
  button {
    all: unset;
    cursor: pointer;
    display: inline-block;
  }
</style>
