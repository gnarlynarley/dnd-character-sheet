<script lang="ts">
  import type { Snippet } from 'svelte';
  import Flex from './Flex.svelte';

  type Props = {
    children?: Snippet;
  };

  let { children }: Props = $props();
</script>

<svelte:boundary>
  {@render children?.()}

  {#if $effect.pending()}
    <Flex justify="center" padding>
      <h1>loading...</h1>
    </Flex>
  {/if}

  {#snippet failed(error, reset)}
    {console.error(error)}
    <h1>oops! something went wrong.</h1>
    <pre>{JSON.stringify(error, null, 2)}</pre>
    <button onclick={reset}>oops! try again</button>
  {/snippet}
</svelte:boundary>
