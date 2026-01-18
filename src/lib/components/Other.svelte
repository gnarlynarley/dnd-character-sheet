<script>
  import { characterStore } from '../stores/character';
  import { getAbilityModifier, parseModifier } from '../utils';
  import Border from './Border.svelte';
  import Flex from './Flex.svelte';

  const items = $derived([
    {
      label: 'size',
      value: $characterStore.size,
    },
    {
      label: 'initiative',
      value: parseModifier(
        getAbilityModifier($characterStore.abilityScores.dex)
      ),
    },
    {
      label: 'speed',
      value: $characterStore.speed,
    },
    { label: 'Proficiency Bonus', value: $characterStore.proficiencyBonus },
  ]);
</script>

<Flex column justify="between">
  {#each items as item}
    <Border nogrow>
      <Flex column>
        <span class="label">{item.label}</span>
        <span class="value">{item.value}</span>
      </Flex>
    </Border>
  {/each}
</Flex>
