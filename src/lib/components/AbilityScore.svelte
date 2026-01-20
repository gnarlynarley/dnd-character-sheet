<script lang="ts">
  import { type AbilityType } from '../models';
  import { characterStore } from '../stores/character';
  import { getAbilityModifier } from '../utils';
  import { t } from '../utils/translate';
  import Border from './Border.svelte';
  import Modifier from './Modifier.svelte';

  type Props = {
    ability: AbilityType;
  };

  const { ability }: Props = $props();
  const value = $derived($characterStore.abilityScores[ability]);
</script>

<div class="item">
  <div class="name">
    {t(ability)}
  </div>
  <div class="modifier">
    <Modifier modifier={getAbilityModifier(value)} />
  </div>
  <span class="score">
    <input type="number" bind:value={$characterStore.abilityScores[ability]} />
    <Border rounded absolute noshadow small></Border>
  </span>
</div>

<style>
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .name {
    font-size: 1.4em;
  }

  .modifier {
    font-size: 3em;
    font-family: var(--font-written);
    font-weight: bold;
  }

  .score {
    text-align: center;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 2em;
    height: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: var(--font-written);

    input {
      position: relative;
      z-index: 1;
      font-size: 1.2em;
      text-align: center;
    }
  }
</style>
