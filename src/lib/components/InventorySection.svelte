<script lang="ts">
  import { appSettings } from '$lib/stores/app-settings';
  import type { CharacterSvelteStore } from '$lib/stores/character';
  import { sliceOnce } from '$lib/utils';
  import Button from './Button.svelte';
  import Flex from './Flex.svelte';
  import Input from './Input.svelte';
  import Table from './Table.svelte';

  type Props = {
    character: CharacterSvelteStore;
  };

  const { character }: Props = $props();
  const parsed = $derived.by(() =>
    $character.inventory.flatMap((item) => {
      if (!item.trim()) return [];
      const match = item.trim().match(/^(\d+)\s+(.*)$/);
      const count = match ? Number(match[1]) : 1;
      const rest = match ? match[2] : item.trim();
      const [name, description] = sliceOnce(rest, '|');
      return { count, name, description };
    }),
  );

  function addInventoryItem() {
    character.update((char) => {
      char.inventory.push('');
      return char;
    });
  }

  function removeInventoryItem(index: number) {
    character.update((char) => {
      char.inventory.splice(index, 1);
      return char;
    });
  }
</script>

<div class="wrapper">
  {#if $appSettings.edit}
    <Flex column>
      {#each $character.inventory as slot, index}
        <Flex align="center">
          <div class="value">
            <Input bind:value={$character.inventory[index]} />
          </div>
          <Button onclick={() => removeInventoryItem(index)}>Remove</Button>
        </Flex>
      {/each}
      <Button onclick={addInventoryItem}>Add item</Button>
    </Flex>
  {:else}
    <Table cells={3}>
      <Table row>
        <Table cell>
          <strong>Qty</strong>
        </Table>
        <Table cell>
          <strong>Item</strong>
        </Table>
        <Table cell>
          <strong>Description</strong>
        </Table>
      </Table>
      {#each parsed as item}
        <Table row>
          <Table cell>
            <span class="value">{item.count}</span>
          </Table>
          <Table cell>
            <span class="value">{item.name}</span>
          </Table>
          <Table cell>
            <span class="value">{item.description}</span>
          </Table>
        </Table>
      {/each}
    </Table>
  {/if}
</div>

<style>
  .wrapper {
    width: 100%;
  }

  .value {
    font-family: var(--font-written);
    font-size: 1.8em;
    flex-grow: 1;
  }
</style>
