<script lang="ts">
  import type { CharacterSvelteStore } from '$lib/stores/character';
  import BorderLine from './BorderLine.svelte';
  import Card from './Card.svelte';
  import DeathSave from './DeathSave.svelte';
  import Flex from './Flex.svelte';
  import FlexPush from './FlexPush.svelte';
  import Input from './Input.svelte';

  type Props = {
    character: CharacterSvelteStore;
  };

  const { character }: Props = $props();
</script>

<div class="container">
  <div class="armor">
    <div class="inner">
      <div class="label">Armor<br />Class</div>
      <BorderLine />
      <div class="value">
        <Input bind:value={$character.armorClass} />
      </div>
    </div>
  </div>
  <Card>
    <div class="inner">
      <Flex column align="center" --flex-grow="2">
        <div class="label">Hitpoints</div>
        <Flex full>
          <Flex column align="center" justify="end" full>
            <BorderLine />
            <span>current</span>
          </Flex>
          <BorderLine vertical />
          <Flex column align="center" justify="end" full>
            <div class="value">
              <Input bind:value={$character.hitPoints} />
            </div>
            <BorderLine />
            <span>max</span>
          </Flex>
        </Flex>
      </Flex>

      <BorderLine vertical />

      <Flex column align="center" sm>
        <div class="label">Hit Dice</div>
        <FlexPush />
        <Flex column full>
          <div style="height:3em;"></div>
          <BorderLine></BorderLine>
          <span>spend</span>
        </Flex>
        <Flex column full>
          <div class="value">
            <Input bind:value={$character.hitDice} />
          </div>
          <BorderLine></BorderLine>
          <span>current</span>
        </Flex>
      </Flex>

      <BorderLine vertical />

      <Flex column --flex-grow="0">
        <div class="label">Death<br />Saves</div>
        <FlexPush />
        <DeathSave label="successes" />
        <DeathSave label="failures" />
      </Flex>
    </div>
  </Card>
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-grow: 1;
    gap: var(--gutter);
    align-items: center;
  }

  .label {
    text-transform: uppercase;
    text-align: center;
  }

  .value {
    font-size: 2em;
    font-family: var(--font-written);
    text-align: center;
    width: 100%;
  }
  .armor {
    z-index: 0;
    position: relative;
    aspect-ratio: 1/1;
    width: 6em;
    height: 8em;
    flex-grow: 0;

    &::after {
      content: '';
      border: var(--border);
      border-radius: 0.4em 0.4em 10em 10em;
      filter: var(--shadow) url('#pencil');
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--color-paper);
      z-index: -1;
    }

    .inner {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      align-self: center;
      padding: calc(var(--gutter) * 0.5);
      text-align: center;
      gap: calc(var(--gutter) * 0.5);
    }

    .value {
      width: 2em;
    }
  }

  .inner {
    display: flex;
    gap: 1em;
    flex-grow: 1;
    gap: var(--gutter);
  }
</style>
