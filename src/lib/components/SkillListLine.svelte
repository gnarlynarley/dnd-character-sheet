<script lang="ts">
	import { appSettings } from '$lib/stores/app-settings';
	import type { AbilityType, ProficiencyType, SkillWithSavingThrowType } from '../models';
	import type { CharacterSvelteStore } from '../stores/character';
	import { getSkillModifier, toggleAdd } from '../utils';
	import { t } from '../utils/translate';
	import Input from './Input.svelte';
	import Modifier from './Modifier.svelte';
	import ProficiencyToggle from './ProficiencyToggle.svelte';

	type Props = {
		skill: SkillWithSavingThrowType;
		ability: AbilityType;
		character: CharacterSvelteStore;
	};

	const { skill, ability, character }: Props = $props();
	const edit = $derived($appSettings.edit);

	const proficiency = $derived.by((): ProficiencyType => {
		if (skill === 'savingThrow') {
			return $character.abilityProficiencies.includes(ability) ? 'proficient' : 'none';
		}

		return $character.skillProficiencies[skill] ?? 'none';
	});
	const bonusModifier = $derived.by(() => {
		if (skill === 'savingThrow') {
			return 0;
		}
		return 0;
	});
	const modifier = $derived(
		getSkillModifier(
			$character.abilityScores[ability] ?? 0,
			$character.proficiencyBonus,
			proficiency
		)
	);
</script>

<div class="wrapper">
	<ProficiencyToggle
		bind:value={
			() => proficiency,
			(v) => {
				if (!$appSettings.edit) return;
				if (skill === 'savingThrow') {
					$character.abilityProficiencies = toggleAdd($character.abilityProficiencies, ability);
				} else {
					$character.skillProficiencies[skill] = v;
				}
			}
		}
	/>
	<span class="modifier" class:has-bonus={bonusModifier}>
		<Modifier modifier={modifier + bonusModifier} />
	</span>
	{#if edit && skill !== 'savingThrow'}
		<Input
			fit
			type="number"
			bind:value={$character.skillBonusModifiers[skill]}
			placeholder="Bonus"
		/>
	{/if}
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
		width: 2em;
		text-align: center;
		padding: 0.1em;
		display: block;
		font-family: var(--font-written);
		font-size: 1.5em;
		position: relative;

		&.has-bonus {
			font-weight: bold;
		}

		&::after {
			content: '';
			display: block;
			width: 100%;
			border-bottom: var(--border-sm);
			filter: url('#pencil');
		}
	}
</style>
