<script lang="ts">
  import Flex from './Flex.svelte';

  type Props = {
    label?: string;
  };

  const { label }: Props = $props();
</script>

<Flex column sm>
  <Flex sm>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </Flex>
  <div class="label">{label}</div>
</Flex>

<style>
  .dot {
    --size: 1.4em;
    width: var(--size);
    height: var(--size);
    border: var(--border-sm);
    border-radius: 50%;
    filter: url('#pencil');
  }
</style>
