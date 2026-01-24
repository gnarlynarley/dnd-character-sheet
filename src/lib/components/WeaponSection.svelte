<script lang="ts">
  import Card from './Card.svelte';
  import type { CharacterSvelteStore } from '$lib/stores/character';
  import type { CharacterWeaponType } from '../models';
  import BorderLine from './BorderLine.svelte';
  import Flex from './Flex.svelte';
  import Button from './Button.svelte';

  type Props = {
    character: CharacterSvelteStore;
  };

  const { character }: Props = $props();

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
  <div class="items">
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
        <input type="text" class="cell name" bind:value={weapon.name} />
        <BorderLine vertical />
        <div class="cell">
          <Flex align="center" nogap>
            <span>+</span>
            <input type="number" class="hit" bind:value={weapon.hit} />
          </Flex>
        </div>
        <BorderLine vertical />
        <input type="text" class="cell damage" bind:value={weapon.damage} />
        <BorderLine vertical />
        <input type="text" class="cell details" bind:value={weapon.details} />
        <div class="delete-button">
          <Button onclick={() => deleteLine(weapon)}>delete</Button>
        </div>
      </div>
    {/each}
    <div class="add-button">
      <Button onclick={addLine}>
        <span>+</span>
      </Button>
    </div>
  </div>
</Card>

<style lang="scss">
  .items {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: calc(var(--gutter) * 0.5);
  }

  .line {
    position: relative;
    display: grid;
    grid-template-columns: 1fr auto 3em auto 1fr auto 1fr;
    gap: var(--gutter);

    > .cell {
      field-sizing: content;
      width: auto;
    }

    &:not(.heading) > .cell {
      font-family: var(--font-written);
      font-size: 1.6em;
    }
  }

  .add-button {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 1.4em;
    height: 1.4em;
    display: flex;
    justify-content: center;
    align-items: center;

    .items:not(:hover) & {
      display: none;
    }
  }

  .delete-button {
    position: absolute;
    top: 50%;
    right: 0;
    translate: 0 -50%;

    .line:not(:hover) & {
      display: none;
      visibility: hidden;
    }
  }
</style>
