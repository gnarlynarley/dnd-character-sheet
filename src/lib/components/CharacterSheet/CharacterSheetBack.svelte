<script lang="ts">
  import { characterSpellSchema, parse } from '$lib/models';
  import type { Spell } from '$lib/models/spells';
  import { appSettings } from '$lib/stores/app-settings';
  import type { CharacterSvelteStore } from '$lib/stores/character';
  import { getAbilityModifier } from '$lib/utils';
  import Border from '../Border.svelte';
  import BorderLine from '../BorderLine.svelte';
  import Button from '../Button.svelte';
  import Card from '../Card.svelte';
  import Checkbox from '../Checkbox.svelte';
  import Flex from '../Flex.svelte';
  import HidePrint from '../HidePrint.svelte';
  import Input from '../Input.svelte';
  import InventorySection from '../InventorySection.svelte';
  import Markdown from '../Markdown.svelte';
  import MarkdownEditor from '../MarkdownEditor.svelte';
  import Modifier from '../Modifier.svelte';
  import Page from '../Page.svelte';
  import Scrollbar from '../Scrollbar.svelte';
  import SpellCollectionSelect from '../SpellCollectionSelect.svelte';
  import SpellSlots from '../SpellSlots.svelte';
  import Table from '../Table.svelte';
  import Textarea from '../Textarea.svelte';

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

  function onSpellSelection(spell: Spell) {
    character.update((char) => {
      char.spells.push(parse(characterSpellSchema, spell));
      return char;
    });
  }

  function sortSpells() {
    character.update((char) => {
      char.spells.sort((a, b) => {
        const levelCompare = a.level - b.level;

        if (levelCompare !== 0) {
          return levelCompare;
        }

        return a.name.localeCompare(b.name);
      });
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
              <Scrollbar>
                <Flex column>
                  <Flex column justify="start" align="start">
                    <Flex nogrow padding>
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
                    <Table cells={$appSettings.edit ? 6 : 5} fillCell={5}>
                      <Table row>
                        <Table cell>
                          <span>Prepared</span>
                        </Table>
                        <Table cell>
                          <span>Spell Name</span>
                        </Table>
                        <Table cell>
                          <span>Spell Level</span>
                        </Table>
                        <Table cell>
                          <span>Range</span>
                        </Table>
                        <Table cell>
                          <span>Notes</span>
                        </Table>
                      </Table>
                      {#each $character.spells as spell, index (spell.id)}
                        <Table row>
                          <Table cell centered>
                            <Checkbox bind:checked={spell.prepared} />
                          </Table>
                          <Table cell>
                            <div class="value">
                              <Input bind:value={spell.name} />
                            </div>
                          </Table>
                          <Table cell>
                            <div class="value">
                              <Input
                                type="number"
                                bind:value={spell.level}
                                displayValue={spell.level || 'Cantrip'}
                              />
                            </div>
                          </Table>
                          <Table cell>
                            <div class="value">
                              <Input type="text" bind:value={spell.range} />
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
                        {#if $appSettings.edit}
                          <Table row>
                            <Table cell spread>
                              <Flex padding column>
                                <Checkbox
                                  label="Show description"
                                  bind:checked={spell.showDescription}
                                />
                                <MarkdownEditor bind:code={spell.description} />
                              </Flex>
                            </Table>
                          </Table>
                        {:else if spell.showDescription && spell.description.trim()}
                          <Table row>
                            <Table cell spread>
                              <Flex padding column>
                                <Markdown code={spell.description} />
                              </Flex>
                            </Table>
                          </Table>
                        {/if}
                      {/each}
                    </Table>
                    {#if $appSettings.edit}
                      <Flex padding>
                        <Button onclick={addSpell}>Add spell</Button>
                        <Button onclick={sortSpells}>Sort spells</Button>
                        <SpellCollectionSelect {onSpellSelection} />
                      </Flex>
                    {/if}
                  </Flex>
                </Flex>
              </Scrollbar>
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
