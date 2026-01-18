<script lang="ts">
  import Avatar from './lib/components/Avatar.svelte';
  import Card from './lib/components/Card.svelte';
  import CombatSection from './lib/components/CombatSection.svelte';
  import Heading from './lib/components/Heading.svelte';
  import Markdown from './lib/components/Markdown.svelte';
  import Other from './lib/components/Other.svelte';
  import Page from './lib/components/Page.svelte';
  import PencilSVG from './lib/components/PencilSVG.svelte';
  import SkillList from './lib/components/SkillList.svelte';
  import { characterStore } from './lib/stores/character';
</script>

<Page>
  <div class="inner">
    <div class="side">
      <h1 class="name">{$characterStore.name}</h1>

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
              {$characterStore.languages}
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
      <div class="feats">
        <Card grid title="Feats">
          <Markdown code={$characterStore.features.feats} />
        </Card>
      </div>
      <div class="species">
        <Card grid title="Species">
          <Markdown code={$characterStore.features.species} />
        </Card>
      </div>
      <div class="class">
        <Card grid title="Class">
          <Markdown code={$characterStore.features.class} />
        </Card>
      </div>
    </div>
  </div>
</Page>

<PencilSVG />

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
      'feats class class' minmax(20em, auto)
      'species class class' 1fr
      / 1fr 1fr auto;
    gap: var(--gutter);

    @each $name in heading, combat, feats, species, class, other {
      .#{$name} {
        grid-area: $name;
        display: flex;
      }
    }
  }
</style>
