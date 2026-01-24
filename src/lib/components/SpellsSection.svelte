<script lang="ts">
  import Button from './Button.svelte';
  import HidePrint from './HidePrint.svelte';
  import SpellCard from './SpellCard.svelte';
  import type { CharacterSvelteStore } from '$lib/stores/character';

  type Props = {
    character: CharacterSvelteStore;
  };

  const { character }: Props = $props();

  function addSpell() {
    $character.spells.push({
      name: '',
      level: 0,
      castingTime: '',
      range: '',
      components: '',
      duration: '',
      description: '',
    });
    $character.spells = $character.spells;
  }
</script>

<section>
  <div class="items">
    {#each $character.spells as spell, index}
      <div class="item">
        <SpellCard {index} {character} />
      </div>
    {/each}
  </div>
  <HidePrint>
    <Button onclick={addSpell}>Add spell</Button>
  </HidePrint>
</section>

<style>
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
