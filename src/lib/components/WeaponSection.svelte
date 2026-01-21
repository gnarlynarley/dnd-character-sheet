<script lang="ts">
  import Card from "./Card.svelte";
  import { characterStore as store } from "../stores/character";
  import type { CharacterWeaponType } from "../models";
  import BorderLine from "./BorderLine.svelte";
  import Border from "./Border.svelte";
  import Flex from "./Flex.svelte";

  const addLine = () => {
    $store.weapons.push({
      name: "",
      hit: 0,
      damage: "",
      details: "",
    });
    $store.weapons = $store.weapons;
  };
  const deleteLine = (weapon: CharacterWeaponType) => {
    const index = $store.weapons.indexOf(weapon);
    $store.weapons.splice(index, 1);
    $store.weapons = $store.weapons;
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
    {#each $store.weapons as weapon}
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
        <button
          type="button"
          class="delete-button"
          onclick={() => deleteLine(weapon)}
        >
          <Border>delete</Border></button
        >
      </div>
    {/each}
    <button class="add-button" type="button" onclick={addLine}>
      <Border nopadding absolute></Border>
      <span>+</span>
    </button>
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

    span {
      position: relative;
      z-index: 1;
      font-size: 1.4em;
    }
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
