<script lang="ts">
  import Flex from './Flex.svelte';

  type Props = {
    amount: number;
    sm?: boolean;
  };

  const { amount, sm }: Props = $props();
</script>

<Flex sm>
  {#each Array.from({ length: amount })}
    <div class="dot" class:sm></div>
  {/each}
</Flex>

<style>
  .dot {
    --size: 1.4em;
    width: var(--size);
    height: var(--size);
    border: var(--border-sm);
    border-radius: 50%;
    filter: url('#pencil');

    &.sm {
      --size: 1em;
    }
  }
</style>
