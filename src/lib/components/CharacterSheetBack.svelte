<script lang="ts">
  import { characterSpellSchema, parse } from '$lib/models';
  import { appSettings } from '$lib/stores/app-settings';
  import type { CharacterSvelteStore } from '$lib/stores/character';
  import { getAbilityModifier } from '$lib/utils';
  import Border from './Border.svelte';
  import BorderLine from './BorderLine.svelte';
  import Button from './Button.svelte';
  import Card from './Card.svelte';
  import Checkbox from './Checkbox.svelte';
  import Flex from './Flex.svelte';
  import HidePrint from './HidePrint.svelte';
  import Input from './Input.svelte';
  import InventorySection from './InventorySection.svelte';
  import Modifier from './Modifier.svelte';
  import Page from './Page.svelte';
  import SpellSlots from './SpellSlots.svelte';
  import Table from './Table.svelte';
  import Textarea from './Textarea.svelte';

  type Props = {
    character: CharacterSvelteStore;
  };

  const { character }: Props = $props();
  const spellCastingModifier = $derived.by(() => {
    const ability = $character.spellcastingAbility;
    if (ability === 'none') return 0;
    return getAbilityModifier($character.abilityScores[ability]);
  });
  const spellSave = $derived(
    8 + spellCastingModifier + $character.proficiencyBonus,
  );

  function addSpell() {
    character.update((char) => {
      char.spells.push(parse(characterSpellSchema, {}));
      return char;
    });
  }

  function deleteSpell(index: number) {
    character.update((char) => {
      char.spells.splice(index, 1);
      return char;
    });
  }
</script>

<Page>
  <div class="wrapper">
    <HidePrint hide={$character.spells.length === 0}>
      <div class="side">
        <Flex column>
          <div class="spells">
            <Card title="Spells">
              <Flex column>
                <Flex column justify="start" align="start">
                  <Flex nogrow>
                    <Border noshadow small>
                      <Flex sm>
                        <Flex column align="center" sm>
                          <p>Spell DC</p>
                          <BorderLine />
                          <p class="value big">{spellSave}</p>
                        </Flex>
                        <BorderLine vertical />
                        <Flex column align="center" sm>
                          <p>Spellcasting</p>
                          <BorderLine />
                          <p class="value big">
                            <Modifier modifier={spellCastingModifier} />
                          </p>
                        </Flex>
                        <BorderLine vertical />
                        <div>
                          <SpellSlots {character} />
                        </div>
                      </Flex>
                    </Border>
                  </Flex>
                  <Table cells={3} fillCell={3}>
                    <Table row>
                      <Table cell></Table>
                      <Table cell>
                        <strong>Spell Name</strong>
                      </Table>
                      <Table cell>
                        <strong>Notes</strong>
                      </Table>
                    </Table>
                    {#each $character.spells as spell, index}
                      <Table row>
                        <Table cell>
                          <Checkbox bind:checked={spell.prepared} />
                        </Table>
                        <Table cell>
                          <div class="value">
                            <Input bind:value={spell.name} />
                          </div>
                        </Table>
                        <Table cell>
                          <div class="value">
                            <Input bind:value={spell.notes} />
                          </div>
                        </Table>
                        {#if $appSettings.edit}
                          <Table cell>
                            <button
                              type="button"
                              onclick={() => deleteSpell(index)}
                            >
                              delete
                            </button>
                          </Table>
                        {/if}
                      </Table>
                    {/each}
                  </Table>
                  {#if $appSettings.edit}
                    <Button onclick={addSpell}>Add spell</Button>
                  {/if}
                </Flex>
              </Flex>
            </Card>
          </div>
        </Flex>
      </div>
    </HidePrint>
    <div class="inventory">
      <Card title="Inventory">
        <InventorySection {character} />
      </Card>
    </div>
  </div>
</Page>

<style lang="scss">
  .wrapper {
    flex-grow: 1;
    display: flex;
    gap: var(--gutter);
  }

  .spells {
    display: flex;
    flex-grow: 1;
  }

  .side {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .inventory {
    display: flex;
    flex-grow: 1;
  }

  .value {
    font-family: var(--font-written);
    font-size: 1.4em;
    flex-grow: 1;

    &.big {
      font-size: 3em;
    }
  }
</style>
