<script lang="ts">
  import Button from './Button.svelte';
  import HidePrint from './HidePrint.svelte';
  import SpellCard from './SpellCard.svelte';
  import type { CharacterSvelteStore } from '$lib/stores/character';
  import { getAbilityModifier, unique } from '$lib/utils';
  import { abilitiesAndNone, characterSpellSchema, parse } from '$lib/models';
  import app from 'src/main';
  import { appSettings } from '$lib/stores/app-settings';
  import Flex from './Flex.svelte';
  import { t } from '$lib/utils/translate';
  import Card from './Card.svelte';
  import Modifier from './Modifier.svelte';
  import SpellSlots from './SpellSlots.svelte';

  type Props = {
    character: CharacterSvelteStore;
  };

  const { character }: Props = $props();

  function addSpell() {
    $character.spells.push(parse(characterSpellSchema, {}));
    $character.spells = $character.spells;
  }

  const spellAttackModifier = $derived.by(() => {
    if ($character.spellcastingAbility === 'none') return 0;
    const score = $character.abilityScores[$character.spellcastingAbility];
    const modifier = getAbilityModifier(score);

    return modifier + $character.proficiencyBonus;
  });
  const spellSave = $derived.by(() => {
    if (spellAttackModifier === 0) return 0;

    return 8 + spellAttackModifier;
  });
</script>

<section>
  <div class="heading">
    <Card title="Spellbook">
      <Flex column>
        {#if $appSettings.edit}
          <select bind:value={$character.spellcastingAbility}>
            {#each abilitiesAndNone as ability}
              <option value={ability}>{t(ability)}</option>
            {/each}
          </select>
        {:else}
          <div>
            <span class="written">{t($character.spellcastingAbility)}</span>
          </div>
        {/if}
        <p>
          <span>Spell Attack Modifier:</span>
          <Modifier modifier={spellAttackModifier} />
        </p>
        <p>
          <span>Spell Save DC:</span>
          <Modifier modifier={spellSave} />
        </p>
      </Flex>
    </Card>
    <Card title="Spell Slots">
      <SpellSlots {character} />
    </Card>
  </div>

  <div class="items">
    {#each $character.spells as spell, index}
      <div class="item">
        <SpellCard {index} {character} />
      </div>
    {/each}
  </div>
  {#if $appSettings.edit}
    <Button onclick={addSpell}>Add spell</Button>
  {/if}
</section>

<style>
  .heading {
    display: grid;
    grid-template-columns: auto auto auto 1fr;
    gap: var(--gutter);
    align-items: stretch;
    margin-bottom: var(--gutter);
  }
  .items {
    column-count: 3;
    column-gap: 0;
    margin-inline: calc(var(--gutter) * -0.5);
  }

  .item {
    page-break-inside: avoid;
    padding: calc(var(--gutter) * 0.5);
  }
</style>
