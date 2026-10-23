<script lang="ts">
	import type { CharacterSvelteStore } from '$lib/stores/character';
	import { getAbilityModifier, parseModifier } from '../utils';
	import Border from './Border.svelte';
	import BorderLine from './BorderLine.svelte';
	import Flex from './Flex.svelte';
	import Input from './Input.svelte';

	type Props = {
		character: CharacterSvelteStore;
	};

	const { character }: Props = $props();
</script>

<Border>
	<Flex column justify="between" sm full>
		<Flex column sm>
			<span class="label">Inspiration</span>
			<div style="min-height: 1.4em"></div>
		</Flex>
		<BorderLine />
		<Flex column sm>
			<span class="label">Size</span>
			<span class="value">
				<Input type="text" bind:value={$character.size} />
			</span>
		</Flex>
		<BorderLine />

		<Flex column sm>
			<span class="label">Initiative</span>
			<span class="value">
				{parseModifier(getAbilityModifier($character.abilityScores.dex))}
			</span>
		</Flex>
		<BorderLine />

		<Flex column sm>
			<span class="label">Speed</span>
			<span class="value">
				<Input type="number" bind:value={$character.speed} />
			</span>
		</Flex>
		<BorderLine />

		<Flex column sm>
			<span class="label">Proficiency Bonus</span>
			<span class="value">
				<Input type="number" bind:value={$character.proficiencyBonus} />
			</span>
		</Flex>
	</Flex>
</Border>

<style>
	.label {
		text-align: center;
	}
	.value {
		font-family: var(--font-written);
		font-size: 1.4em;
		text-align: center;
	}
</style>
