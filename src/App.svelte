<script lang="ts">
  import Avatar from "./lib/components/Avatar.svelte";
  import Card from "./lib/components/Card.svelte";
  import CombatSection from "./lib/components/CombatSection.svelte";
  import Flex from "./lib/components/Flex.svelte";
  import Heading from "./lib/components/Heading.svelte";
  import HidePrint from "./lib/components/HidePrint.svelte";
  import Markdown from "./lib/components/Markdown.svelte";
  import Other from "./lib/components/Other.svelte";
  import Page from "./lib/components/Page.svelte";
  import PencilSVG from "./lib/components/PencilSVG.svelte";
  import SkillList from "./lib/components/SkillList.svelte";
  import SpellsSection from "./lib/components/SpellsSection.svelte";
  import WeaponSection from "./lib/components/WeaponSection.svelte";
  import { characterStore, loadCharacter } from "./lib/stores/character";

  let showEditables = $state(true);

  const toggleEditables = () => {
    showEditables = !showEditables;
  };
</script>

<div class:showEditables>
  <HidePrint>
    <Flex>
      <button type="button" onclick={loadCharacter}>
        <Card>Load preset</Card>
      </button>
      <button type="button" onclick={toggleEditables}>
        <Card>Toggle editables</Card>
      </button>
      <button
        type="button"
        onclick={async () => {
          window.print();
        }}
      >
        <Card>Print</Card>
      </button>
    </Flex>
    <div style="height:5em;"></div>
  </HidePrint>

  <Page>
    <div class="inner">
      <div class="side">
        <!-- svelte-ignore a11y_missing_content -->
        <h1 class="name">
          <input type="text" bind:value={$characterStore.name} />
        </h1>

        <div class="avatar">
          <Avatar />
        </div>
        <div class="abilities">
          <div class="line">
            <SkillList ability="str" />
            <SkillList ability="dex" />
            <SkillList ability="con" />
            <Card title="Heroic Inspiration" />
            <Card title="Languages">
              <span class="languages">
                <Markdown bind:code={$characterStore.languages} />
              </span>
            </Card>
          </div>
          <div class="line">
            <SkillList ability="int" />
            <SkillList ability="wis" />
            <SkillList ability="cha" />
          </div>
        </div>
      </div>
      <div class="main">
        <div class="heading">
          <Heading />
        </div>
        <div class="combat">
          <CombatSection />
        </div>
        <div class="other">
          <Other />
        </div>
        <div class="weapons">
          <WeaponSection />
        </div>
        <div class="feats">
          <Card grid title="Feats">
            <Markdown bind:code={$characterStore.features.feats} />
          </Card>
        </div>
        <div class="species">
          <Card grid title="Species">
            <Markdown bind:code={$characterStore.features.species} />
          </Card>
        </div>
        <div class="class">
          <Card grid title="Class">
            <Markdown bind:code={$characterStore.features.class} />
          </Card>
        </div>
      </div>
    </div>
  </Page>

  <Page multiple>
    <SpellsSection />
  </Page>

  <PencilSVG />
</div>

<style lang="scss">
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
      "heading heading other" auto
      "combat combat other" auto
      "weapons weapons weapons" auto
      "feats class class" minmax(20em, auto)
      "species class class" 1fr
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
