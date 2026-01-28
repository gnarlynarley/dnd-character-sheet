<script lang="ts">
  import Avatar from '$lib/components/Avatar.svelte';
  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import CombatSection from '$lib/components/CombatSection.svelte';
  import Flex from '$lib/components/Flex.svelte';
  import Heading from '$lib/components/Heading.svelte';
  import Markdown from '$lib/components/Markdown.svelte';
  import Other from '$lib/components/Other.svelte';
  import Page from '$lib/components/Page.svelte';
  import SkillList from '$lib/components/SkillList.svelte';
  import SpellsSection from '$lib/components/SpellsSection.svelte';
  import WeaponSection from '$lib/components/WeaponSection.svelte';
  import {
    loadExampleCharacter,
    type CharacterSvelteStore,
  } from '$lib/stores/character';
  import Scrollbar from './Scrollbar.svelte';
  import { appSettings } from '$lib/stores/app-settings';
  import Input from './Input.svelte';
  import { exportToYaml } from '$lib/utils/parseSheet';
  import { addNotification } from '$lib/stores/notifications';

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

    <Page>
      <div class="inner">
        <div class="side">
          <!-- svelte-ignore a11y_missing_content -->
          <h1 class="name">
            <Input bind:value={$character.name} />
          </h1>

          <div class="avatar">
            <Avatar {character} />
          </div>
          <div class="abilities">
            <div class="line">
              <SkillList ability="str" {character} />
              <SkillList ability="dex" {character} />
              <SkillList ability="con" {character} />
              <Card title="Heroic Inspiration" />
              <Card title="Languages">
                <span class="languages">
                  <Markdown bind:code={$character.languages} />
                </span>
              </Card>
            </div>
            <div class="line">
              <SkillList ability="int" {character} />
              <SkillList ability="wis" {character} />
              <SkillList ability="cha" {character} />
            </div>
          </div>
        </div>
        <div class="main">
          <div class="heading">
            <Heading {character} />
          </div>
          <div class="combat">
            <CombatSection {character} />
          </div>
          <div class="other">
            <Other {character} />
          </div>
          <div class="weapons">
            <WeaponSection {character} />
          </div>
          <div class="feats">
            <Card grid title="Feats">
              <Markdown bind:code={$character.features.feats} />
            </Card>
          </div>
          <div class="species">
            <Card grid title="Species">
              <Scrollbar>
                <Markdown bind:code={$character.features.species} />
              </Scrollbar>
            </Card>
          </div>
          <div class="class">
            <Card grid title="Class">
              <Scrollbar>
                <Markdown bind:code={$character.features.class} />
              </Scrollbar>
            </Card>
          </div>
        </div>
      </div>
    </Page>

    <Page multiple>
      <SpellsSection {character} />
    </Page>
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
  .name {
    font-size: 3em;
    text-align: center;
    font-weight: bold;
    font-family: var(--font-written);
  }

  .inner {
    width: 100%;
    display: grid;
    grid-template-columns: 40% 1fr;
    gap: var(--gutter);
  }

  .side {
    display: flex;
    flex-direction: column;
    gap: var(--gutter);
    height: 100%;

    .avatar {
      aspect-ratio: 1 / 1;
    }

    .languages {
      font-size: 1.4em;
      font-family: var(--font-written);
      flex-grow: 1;
    }

    .abilities {
      display: flex;
      gap: var(--gutter);
      align-items: stretch;
      height: 100%;
      width: 100%;

      .line {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: var(--gutter);
        height: 100%;

        > :global(*) {
          flex-grow: 1;
        }
      }
    }
  }

  .main {
    display: grid;
    grid-template:
      'heading heading other' auto
      'combat combat other' auto
      'weapons weapons weapons' auto
      'feats class class' minmax(20em, auto)
      'species class class' 1fr
      / 1fr 1fr 9em;
    gap: var(--gutter);

    @each $name in heading, combat, feats, species, class, other, weapons {
      .#{$name} {
        grid-area: $name;
        display: flex;
      }
    }
  }
</style>
