<script lang="ts" generics="Value extends string | number">
  import Flex from './Flex.svelte';

  type Props = {
    label?: string;
    value: Value;
    options: Value[];
  };

  let { label, value = $bindable(), options }: Props = $props();
  const id = $props.id();
</script>

<div class="wrapper">
  {#if label}
    <label for={id}>{label}</label>
  {/if}
  <select {id} bind:value>
    {#each options as option}
      <option value={option}>{option}</option>
    {/each}
  </select>
</div>

<style>
  .wrapper {
    display: flex;
    gap: var(--gutter);
  }
</style>
