<script lang="ts">
  import { appSettings } from '$lib/stores/app-settings';
  import { type CharacterSvelteStore } from '../stores/character';
  import Button from './Button.svelte';
  import Card from './Card.svelte';
  import Flex from './Flex.svelte';
  import Input from './Input.svelte';
  import MarkdownEditor from './MarkdownEditor.svelte';

  type Props = {
    index: number;

    character: CharacterSvelteStore;
  };

  const { index, character }: Props = $props();

  function deleteSpell() {
    $character.spells.splice(index, 1);
    $character.spells = $character.spells;
  }
</script>

<div class="wrapper">
  <Card>
    <Flex column>
      <div class="name value">
        <Input bind:value={$character.spells[index].name} />
      </div>

      <Flex column sm>
        <div class="line">
          <div class="label">Level</div>
          <div class="value">
            <Input bind:value={$character.spells[index].level} />
          </div>
        </div>
        <div class="line">
          <div class="label">Casting Time</div>
          <div class="value">
            <Input bind:value={$character.spells[index].castingTime} />
          </div>
        </div>
        <div class="line">
          <div class="label">Range</div>
          <div class="value">
            <Input bind:value={$character.spells[index].range} />
          </div>
        </div>
        <div class="line">
          <div class="label">Components</div>
          <div class="value">
            <Input bind:value={$character.spells[index].components} />
          </div>
        </div>
        <div class="line">
          <div class="label">Duration</div>
          <div class="value">
            <Input bind:value={$character.spells[index].duration} />
          </div>
        </div>
      </Flex>

      <MarkdownEditor bind:code={$character.spells[index].description} />
    </Flex>

    {#if $appSettings.edit}
      <div class="delete-button">
        <Button onclick={deleteSpell}>Delete</Button>
      </div>
    {/if}
  </Card>
</div>

<style lang="scss">
  .wrapper {
    position: relative;
  }

  .name {
    font-size: 3em;
  }

  .value {
    font-family: var(--font-written);
  }

  .line {
    display: flex;
    align-items: center;
    gap: var(--gutter);

    .label {
      flex-shrink: 0;

      &::after {
        content: ':';
      }
    }

    .value {
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
