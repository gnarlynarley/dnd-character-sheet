<script lang="ts">
  import { appSettings } from '$lib/stores/app-settings';

  type Props = {
    value?: number | string;
  };

  let { value = $bindable() }: Props = $props();
  const type = $derived(typeof value === 'number' ? 'number' : 'text');
  const edit = $derived($appSettings.edit);
</script>

{#if edit}
  <input {type} bind:value />
{:else}
  <div>{value}</div>
{/if}

<style>
  div,
  input {
    text-align: inherit;
    flex-shrink: 1;
    min-width: fit-content;
    width: 100%;
    min-height: 1.4em;
  }
</style>
