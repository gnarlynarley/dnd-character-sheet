<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Flex from '$lib/components/Flex.svelte';
  import {
    loadExampleCharacter,
    type CharacterSvelteStore,
  } from '$lib/stores/character';
  import { appSettings } from '$lib/stores/app-settings';
  import { exportToYaml } from '$lib/utils/parseSheet';
  import { addNotification } from '$lib/stores/notifications';
  import CharacterSheetBack from './CharacterSheetBack.svelte';
  import CharacterSheetFront from './CharacterSheetFront.svelte';

  type Props = {
    character: CharacterSvelteStore;
  };
  const { character }: Props = $props();

  const toggleEditables = () => {
    $appSettings.edit = !$appSettings.edit;
  };
</script>

<div class:showEditables={!$appSettings.edit}>
  <Flex column xl>
    <div class="toolbar hide-print">
      <Flex padding justify="start">
        <Button onclick={toggleEditables}>Toggle editables</Button>
        <Button
          onclick={async () => {
            const yml = await exportToYaml($character);
            await navigator.clipboard.writeText(yml);
            addNotification('Copied to clipboard');
          }}
        >
          Export to yaml
        </Button>
        <Button
          type="button"
          onclick={async () => {
            window.print();
          }}
        >
          Print
        </Button>
        <Button
          onclick={async () => {
            await loadExampleCharacter($character.slug, character);
          }}
        >
          Load Belo
        </Button>
      </Flex>
    </div>

    <CharacterSheetFront {character} />

    <CharacterSheetBack {character} />
  </Flex>
</div>

<style lang="scss">
  .toolbar {
    position: sticky;
    width: 100%;
    top: 0;
    z-index: 1;
    background-color: color-mix(in srgb, var(--color-paper) 90%, transparent);
    margin-bottom: var(--gutter);
    backdrop-filter: blur(5px);
    border-bottom: var(--color-faded) 1px solid;
  }

  .showEditables {
    --color-editable: transparent;
  }
</style>
