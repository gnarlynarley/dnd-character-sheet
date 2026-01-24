<script lang="ts">
  import type { AbilityType, ProficiencyType, SkillType } from '../models';
  import { type CharacterSvelteStore } from '../stores/character';
  import { getSkillModifier, toggleAdd } from '../utils';
  import { t } from '../utils/translate';
  import Modifier from './Modifier.svelte';
  import ProficiencyToggle from './ProficiencyToggle.svelte';

  type Props = {
    skill: SkillType | 'savingThrow';
    ability: AbilityType;
    character: CharacterSvelteStore;
  };

  const { skill, ability, character }: Props = $props();

  const proficiency = $derived.by((): ProficiencyType => {
    if (skill === 'savingThrow') {
      return $character.abilityProficiencies.includes(ability)
        ? 'proficient'
        : 'none';
    }

    return $character.skillProficiencies[skill] ?? 'none';
  });
  const modifier = $derived(
    getSkillModifier(
      $character.abilityScores[ability] ?? 0,
      $character.proficiencyBonus,
      proficiency,
    ),
  );
</script>

<div class="wrapper">
  <ProficiencyToggle
    bind:value={
      () => proficiency,
      (v) => {
        if (skill === 'savingThrow') {
          $character.abilityProficiencies = toggleAdd(
            $character.abilityProficiencies,
            ability,
          );
        } else {
          $character.skillProficiencies[skill] = v;
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
