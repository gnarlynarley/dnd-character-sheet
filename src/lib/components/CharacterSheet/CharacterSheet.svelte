<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Flex from '$lib/components/Flex.svelte';
  import {
    loadExampleCharacter,
    saveCharacterData,
  } from '$lib/stores/character';
  import { appSettings } from '$lib/stores/app-settings';
  import { exportToYaml } from '$lib/utils/parseSheet';
  import { addNotification } from '$lib/stores/notifications';
  import CharacterSheetBack from './CharacterSheetBack.svelte';
  import CharacterSheetFront from './CharacterSheetFront.svelte';
  import { createSaveData, parseSaveData } from '$lib/utils/savedata';
  import { downloadBlob } from '$lib/utils';
  import FileInputButton from '../FileInputButton.svelte';
  import FlexPush from '../FlexPush.svelte';
  import { tick } from 'svelte';
  import { writable } from 'svelte/store';
  import { isEqual } from '$lib/utils/isEqual';
  import OverlayBox from '../OverlayBox.svelte';
  import type { CharacterType } from '$lib/models';

  type Props = {
    characterData: CharacterType;
  };
  let { characterData = $bindable() }: Props = $props();
  let character = $state(writable(structuredClone(characterData)));

  $effect(() => {
    character = writable(structuredClone(characterData));
  });

  const hasChanges = $derived($appSettings.hasChanges);

  $effect(() => {
    $appSettings.hasChanges = !isEqual(characterData, $character);
  });

  const toggleEditables = () => {
    $appSettings.edit = !$appSettings.edit;
  };

  async function exportCharacterSheet() {
    const savedata = await createSaveData($character);
    await downloadBlob(savedata, savedata.name);
  }

  async function importCharacterSheet(file: File | null) {
    try {
      if (!file) return;
      const characterData = await parseSaveData(file);
      character.set(characterData);
    } catch (err) {
      console.error(err);
      addNotification('Something went wrong with importing.');
    }
  }

  async function save() {
    await saveCharacterData($character);
    characterData = $character;
  }
</script>

<div class:showEditables={!$appSettings.edit}>
  <Flex column xl>
    <CharacterSheetFront {character} />

    <CharacterSheetBack {character} />

    <div class="toolbar hide-print">
      <OverlayBox>
        <Flex padding justify="start">
          <Button onclick={toggleEditables}>Toggle editables</Button>
          {#if hasChanges}
            <Button onclick={save}>Save changes</Button>
          {/if}
          <FlexPush />
          <Button onclick={exportCharacterSheet}>Export</Button>
          <FileInputButton
            accept="application/zip"
            onchange={importCharacterSheet}
          >
            Import
          </FileInputButton>
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
              const lastEdit = $appSettings.edit;
              $appSettings.edit = false;
              await tick();
              window.print();
              $appSettings.edit = lastEdit;
            }}
          >
            Print
          </Button>
          <Button
            onclick={async () => {
              await loadExampleCharacter($character.slug, character);
            }}
          >
            Load Example
          </Button>
        </Flex>
      </OverlayBox>
    </div>
  </Flex>
</div>

<style lang="scss">
  .toolbar {
    position: sticky;
    width: 100%;
    bottom: 0;
    z-index: 1;
  }

  .showEditables {
    --color-editable: transparent;
  }
</style>
