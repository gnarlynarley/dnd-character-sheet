<script lang="ts">
  import type { CharacterSvelteStore } from '$lib/stores/character';
  import { getAbilityModifier, parseModifier } from '../utils';
  import Border from './Border.svelte';
  import Flex from './Flex.svelte';
  import Input from './Input.svelte';

  type Props = {
    character: CharacterSvelteStore;
  };

  const { character }: Props = $props();
</script>

<Flex column justify="between">
  <Border nogrow>
    <Flex column>
      <span class="label">Size</span>
      <span class="value">
        <Input bind:value={$character.size} />
      </span>
    </Flex>
  </Border>
  <Border nogrow>
    <Flex column>
      <span class="label">Initiative</span>
      <span class="value">
        {parseModifier(getAbilityModifier($character.abilityScores.dex))}
      </span>
    </Flex>
  </Border>
  <Border nogrow>
    <Flex column>
      <span class="label">Speed</span>
      <span class="value">
        <Input bind:value={$character.speed} />
      </span>
    </Flex>
  </Border>
  <Border nogrow>
    <Flex column>
      <span class="label">Proficiency Bonus</span>
      <span class="value">
        <Input bind:value={$character.proficiencyBonus} />
      </span>
    </Flex>
  </Border>
</Flex>

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
