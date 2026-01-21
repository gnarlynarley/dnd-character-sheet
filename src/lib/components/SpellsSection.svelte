<script>
  import { characterStore } from "../stores/character";
  import Border from "./Border.svelte";
  import Flex from "./Flex.svelte";
  import HidePrint from "./HidePrint.svelte";
  import SpellCard from "./SpellCard.svelte";

  function addSpell() {
    $characterStore.spells.push({
      name: "",
      level: 0,
      castingTime: "",
      range: "",
      components: "",
      duration: "",
      description: "",
    });
    $characterStore.spells = $characterStore.spells;
  }

  function sortSpells() {
    $characterStore.spells.sort((a, b) => a.level - b.level);

    $characterStore.spells = $characterStore.spells;
  }
</script>

<section>
  <div class="items">
    {#each $characterStore.spells as spell, index}
      <div class="item">
        <SpellCard {index} />
      </div>
    {/each}
  </div>
  <HidePrint>
    <button type="button" onclick={addSpell}>
      <Border>Add spell</Border>
    </button>
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
