<script>
  import { characterStore } from '../stores/character';
  import { getAbilityModifier, parseModifier } from '../utils';
  import Border from './Border.svelte';
  import Flex from './Flex.svelte';
</script>

<Flex column justify="between">
  <Border nogrow>
    <Flex column>
      <span class="label">size</span>
      <span class="value">
        <input type="text" bind:value={$characterStore.size} />
      </span>
    </Flex>
  </Border>
  <Border nogrow>
    <Flex column>
      <span class="label">initiative</span>
      <span class="value">
        {parseModifier(getAbilityModifier($characterStore.abilityScores.dex))}
      </span>
    </Flex>
  </Border>
  <Border nogrow>
    <Flex column>
      <span class="label">speed</span>
      <span class="value">
        <input type="number" bind:value={$characterStore.speed} />
      </span>
    </Flex>
  </Border>
  <Border nogrow>
    <Flex column>
      <span class="label">Proficiency Bonus</span>
      <span class="value">
        <input type="number" bind:value={$characterStore.proficiencyBonus} />
      </span>
    </Flex>
  </Border>
</Flex>

<style>
  .value {
    font-family: var(--font-written);
    font-size: 1.4em;

    input {
      font: inherit;
    }
  }
</style>
