<script lang="ts">
  import Flex from '$lib/components/Flex.svelte';
  import Markdown from '$lib/components/Markdown.svelte';
  import Select from '$lib/components/Select.svelte';
  import SpellCollectionSelectView from '$lib/components/SpellCollectionSelectView.svelte';
  import Table from '$lib/components/Table.svelte';
  import { getSpells, getSpellSources } from '$lib/services/spells';
  import unique from '$lib/utils/unique';

  const spellSources = await getSpellSources();
  let selectedSources = $state(['XPHB']);
  const spells = $derived(await getSpells(selectedSources));
  const classBooks = $derived(
    unique(spells.flatMap((spell) => spell.classes)).concat('None'),
  );
  let spellLevel = $state(0);
  let classBook = $state('None');
  const filteredSpells = $derived(
    spells.filter(
      (spell) =>
        (classBook !== 'None' ? spell.classes.includes(classBook) : true) &&
        spell.level === spellLevel,
    ),
  );
  const maxLevelSpell = $derived(
    unique(spells.map((s) => s.level))
      .sort()
      .pop(),
  );
</script>

<Flex column>
  <h1>Spells</h1>

  <SpellCollectionSelectView />
</Flex>
