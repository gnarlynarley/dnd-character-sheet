<script lang="ts">
  import { spellCollection } from '$lib/stores/spell-collection';
  import unique from '$lib/utils/unique';
  import Modal from './Modal.svelte';
  import Select from './Select.svelte';
  import Flex from './Flex.svelte';
  import BorderLine from './BorderLine.svelte';
  import type { Spell } from '$lib/models/spells';
  import Button from './Button.svelte';
  import Card from './Card.svelte';
  import Markdown from './Markdown.svelte';

  type Props = {
    onSpellSelection?: (spell: Spell) => void;
  };

  const { onSpellSelection }: Props = $props();

  const ALL_SPELL_CLASSBOOK = 'All';
  const ALL_SPELL_LEVELS = 'All';
  const classBooks = $derived(
    unique(
      [ALL_SPELL_CLASSBOOK].concat(
        $spellCollection.flatMap((spell) => spell.classes).sort(),
      ),
    ),
  );
  const MAX_SPELL_LEVEL = $derived(
    $spellCollection.map((s) => s.level).pop() ?? 0,
  );
  const spellLevelOptions = $derived(
    ([ALL_SPELL_LEVELS] as (string | number)[]).concat(
      Array.from({ length: MAX_SPELL_LEVEL + 1 }, (_, i) => i),
    ),
  );
  let selectedClassBook = $state(ALL_SPELL_CLASSBOOK);
  let selectedSpellLevel = $state<number | string>(ALL_SPELL_LEVELS);
  let searchQuery = $state('');
  const trimmedSearchQuery = $derived(searchQuery.trim().toLocaleLowerCase());
  const filteredSpells = $derived(
    $spellCollection.filter((spell) => {
      if (
        trimmedSearchQuery &&
        !spell.name.toLowerCase().includes(trimmedSearchQuery)
      ) {
        return false;
      }

      if (
        selectedClassBook !== ALL_SPELL_CLASSBOOK &&
        !spell.classes.includes(selectedClassBook)
      ) {
        return false;
      }

      if (
        selectedSpellLevel !== ALL_SPELL_LEVELS &&
        spell.level !== selectedSpellLevel
      ) {
        return false;
      }

      return true;
    }),
  );
</script>

<Flex column justify="start">
  <div class="filter-bar">
    <Flex column>
      <label>
        <Flex>
          <p style="flex-shrink: 0;">Search by name</p>
          <input type="text" bind:value={searchQuery} />
        </Flex>
      </label>
      <Select
        label="Classbook"
        bind:value={selectedClassBook}
        options={classBooks}
      />
      <Select
        label="Spell level"
        bind:value={selectedSpellLevel}
        options={spellLevelOptions}
      />
      <span>{filteredSpells.length}</span>
      <BorderLine />
    </Flex>
  </div>
  <div class="padding">
    {#each filteredSpells as spell}
      <Card title={spell.name}>
        <Flex column>
          <Flex padding column>
            <p>Level: {spell.level || 'Cantrip'}</p>
            <p>Range: {spell.range}</p>
            <p>For: {spell.classes.join(', ')}</p>
            <Markdown code={spell.description} />
          </Flex>
          {#if onSpellSelection}
            <Button
              onclick={() => {
                onSpellSelection(spell);
              }}
            >
              Add
            </Button>
          {/if}
        </Flex>
      </Card>
    {/each}
  </div>
</Flex>

<style>
  .filter-bar {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    background: var(--color-paper);
    margin-inline: calc(var(--gutter) * -1);
    padding: var(--gutter);
  }

  .padding {
    padding: var(--gutter);
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(30em, 1fr));
    flex-direction: column;
    gap: var(--gutter);
  }
</style>
