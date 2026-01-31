<script lang="ts">
  import { appSettings } from '$lib/stores/app-settings';
  import type { CharacterSvelteStore } from '$lib/stores/character';
  import BorderLine from './BorderLine.svelte';
  import Button from './Button.svelte';
  import Flex from './Flex.svelte';
  import Input from './Input.svelte';

  type Props = {
    character: CharacterSvelteStore;
  };

  const { character }: Props = $props();

  function addSpellSlot() {
    $character.spellSlots.push({ level: 1, amount: 0 });
    $character.spellSlots = $character.spellSlots;
  }

  function deleteSpellSlot(index: number) {
    $character.spellSlots.splice(index, 1);
    $character.spellSlots = $character.spellSlots;
  }
</script>

<Flex column sm>
  <div class="line">
    <span>Level</span>
    <BorderLine vertical />
    <span>Slots</span>
  </div>
  <BorderLine />
  {#each $character.spellSlots as slot, index}
    <div class="line">
      <div class="value">
        <Input bind:value={slot.level} />
      </div>
      <BorderLine vertical />
      <div class="value">
        <Input type="number" bind:value={slot.amount} />
      </div>
      {#if $appSettings.edit}
        <button type="button" onclick={() => deleteSpellSlot(index)}>
          delete
        </button>
      {/if}
    </div>
    <BorderLine />
  {/each}
  {#if $appSettings.edit}
    <Button onclick={addSpellSlot}>Add spellslot level</Button>
  {/if}
</Flex>

<style>
  .line {
    display: grid;
    grid-template-columns: 3em auto 1fr;
    gap: var(--gutter);
  }

  .value {
    font-family: var(--font-written);
    font-size: 1.4em;
  }
</style>
