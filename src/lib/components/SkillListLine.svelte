<script lang="ts">
  import type { AbilityType, ProficiencyType, SkillType } from '../models';
  import { characterStore } from '../stores/character';
  import { getSkillModifier, getAbilityModifier, toggleAdd } from '../utils';
  import { t } from '../utils/translate';
  import Modifier from './Modifier.svelte';
  import ProficiencyToggle from './ProficiencyToggle.svelte';

  type Props = {
    skill: SkillType | 'savingThrow';
    ability: AbilityType;
  };

  const { skill, ability }: Props = $props();
  const proficiency = $derived.by((): ProficiencyType => {
    if (skill === 'savingThrow') {
      return $characterStore.abilityProficiencies.includes(ability)
        ? 'proficient'
        : 'none';
    }

    return $characterStore.skillProficiencies[skill] ?? 'none';
  });
  const modifier = $derived(
    getSkillModifier(
      $characterStore.abilityScores[ability] ?? 0,
      $characterStore.proficiencyBonus,
      proficiency
    )
  );
</script>

<div class="wrapper">
  <ProficiencyToggle
    bind:value={
      () => proficiency,
      (v) => {
        if (skill === 'savingThrow') {
          $characterStore.abilityProficiencies = toggleAdd(
            $characterStore.abilityProficiencies,
            ability
          );
        } else {
          $characterStore.skillProficiencies[skill] = v;
        }
      }
    }
  />
  <span class="modifier">
    <Modifier {modifier} />
  </span>
  <span class="skill">{t(skill)}</span>
</div>

<style>
  .wrapper {
    display: flex;
    gap: 1.2em;
    align-items: center;
    white-space: nowrap;
  }

  .modifier {
    background: var(--color-faded);
    width: 2em;
    text-align: center;
    padding: 0.1em;
    display: block;
    font-family: var(--font-written);
    font-size: 1.5em;
  }
</style>
