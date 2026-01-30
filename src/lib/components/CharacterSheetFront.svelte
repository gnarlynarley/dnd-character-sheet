<script lang="ts">
  import Avatar from '$lib/components/Avatar.svelte';
  import Card from '$lib/components/Card.svelte';
  import CombatSection from '$lib/components/CombatSection.svelte';
  import Heading from '$lib/components/Heading.svelte';
  import Markdown from '$lib/components/Markdown.svelte';
  import Other from '$lib/components/Other.svelte';
  import Page from '$lib/components/Page.svelte';
  import SkillList from '$lib/components/SkillList.svelte';
  import WeaponSection from '$lib/components/WeaponSection.svelte';
  import { type CharacterSvelteStore } from '$lib/stores/character';
  import Scrollbar from './Scrollbar.svelte';
  import Input from './Input.svelte';

  type Props = {
    character: CharacterSvelteStore;
  };
  const { character }: Props = $props();
</script>

<Page>
  <div class="inner">
    <div class="side">
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

<style lang="scss">
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
