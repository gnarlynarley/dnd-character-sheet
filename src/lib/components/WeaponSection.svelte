<script lang="ts">
  import Card from './Card.svelte';
  import type { CharacterSvelteStore } from '$lib/stores/character';
  import type { CharacterWeaponType } from '../models';
  import BorderLine from './BorderLine.svelte';
  import Flex from './Flex.svelte';
  import Button from './Button.svelte';
  import Input from './Input.svelte';
  import { appSettings } from '$lib/stores/app-settings';

  type Props = {
    character: CharacterSvelteStore;
  };

  const { character }: Props = $props();
  const edit = $derived($appSettings.edit);

  const addLine = () => {
    $character.weapons.push({
      name: '',
      hit: 0,
      damage: '',
      details: '',
    });
    $character.weapons = $character.weapons;
  };
  const deleteLine = (weapon: CharacterWeaponType) => {
    const index = $character.weapons.indexOf(weapon);
    $character.weapons.splice(index, 1);
    $character.weapons = $character.weapons;
  };
</script>

<Card>
  <div class="items" class:edit>
    <div class="line heading">
      <div class="cell name">Name</div>
      <BorderLine vertical />
      <div class="cell hit">Hit</div>
      <BorderLine vertical />
      <div class="cell damage">Damage</div>
      <BorderLine vertical />
      <div class="cell details">Details</div>
    </div>
    {#each $character.weapons as weapon}
      <BorderLine />
      <div class="line">
        <div class="cell name">
          <Input bind:value={weapon.name} />
        </div>
        <BorderLine vertical />
        <div class="cell">
          <Flex align="center" nogap>
            <span>+</span>
            <div class="hit">
              <Input bind:value={weapon.hit} />
            </div>
          </Flex>
        </div>
        <BorderLine vertical />
        <div class="cell damage">
          <Input bind:value={weapon.damage} />
        </div>
        <BorderLine vertical />
        <div class="cell details">
          <Input bind:value={weapon.details} />
        </div>
        {#if edit}
          <button
            class="delete-button"
            type="button"
            onclick={() => deleteLine(weapon)}
          >
            delete
          </button>
        {/if}
      </div>
    {/each}
    {#if edit}
      <Flex>
        <Button onclick={addLine}>
          <span>Add line</span>
        </Button>
      </Flex>
    {/if}
  </div>
</Card>

<style lang="scss">
  .items {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: calc(var(--gutter) * 0.5);
    flex-grow: 1;
  }

  .line {
    position: relative;
    display: grid;
    grid-template-columns: 1fr auto 3em auto 1fr auto 1fr;
    gap: var(--gutter);

    .edit & {
      grid-template-columns: 1fr auto 3em auto 1fr auto 1fr 3em;
    }

    > .cell {
      field-sizing: content;
      width: auto;
    }

    &:not(.heading) > .cell {
      font-family: var(--font-written);
      font-size: 1.6em;
    }
  }
</style>
