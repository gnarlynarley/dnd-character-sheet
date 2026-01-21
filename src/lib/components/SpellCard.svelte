<script lang="ts">
  import type { CharacterSpell } from "../models";
  import { characterStore } from "../stores/character";
  import Border from "./Border.svelte";
  import Card from "./Card.svelte";
  import Flex from "./Flex.svelte";
  import Markdown from "./Markdown.svelte";

  type Props = {
    index: number;
  };

  const { index }: Props = $props();

  function deleteSpell() {
    $characterStore.spells.splice(index, 1);
    $characterStore.spells = $characterStore.spells;
  }
</script>

<div class="wrapper">
  <Card>
    <Flex column>
      <div class="name">
        <input type="text" bind:value={$characterStore.spells[index].name} />
      </div>

      <Flex column sm>
        <div class="line">
          <div class="label">Level</div>
          <input
            type="number"
            bind:value={$characterStore.spells[index].level}
          />
        </div>
        <div class="line">
          <div class="label">Casting Time</div>
          <input
            type="text"
            bind:value={$characterStore.spells[index].castingTime}
          />
        </div>
        <div class="line">
          <div class="label">Range</div>
          <input type="text" bind:value={$characterStore.spells[index].range} />
        </div>
        <div class="line">
          <div class="label">Components</div>
          <input
            type="text"
            bind:value={$characterStore.spells[index].components}
          />
        </div>
        <div class="line">
          <div class="label">Duration</div>
          <input
            type="text"
            bind:value={$characterStore.spells[index].duration}
          />
        </div>
      </Flex>

      <Markdown bind:code={$characterStore.spells[index].description} />
    </Flex>
    <button class="delete-button" type="button" onclick={deleteSpell}>
      <Border>Delete</Border>
    </button>
  </Card>
</div>

<style lang="scss">
  .wrapper {
    position: relative;
  }

  .name {
    font-size: 3em;
  }

  .line {
    display: flex;
    align-items: center;
    gap: var(--gutter);

    .label {
      flex-shrink: 0;
      &::after {
        content: ":";
      }
    }

    input {
      font-size: 1.4em;
    }
  }

  .delete-button {
    position: absolute;
    top: var(--gutter);
    right: var(--gutter);

    .wrapper:not(:hover) & {
      display: none;
    }
  }
</style>
