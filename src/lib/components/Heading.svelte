<script lang="ts">
  import type { CharacterSvelteStore } from '$lib/stores/character';
  import Border from './Border.svelte';
  import BorderLine from './BorderLine.svelte';
  import Flex from './Flex.svelte';
  import Input from './Input.svelte';

  type Props = {
    character: CharacterSvelteStore;
  };

  const { character }: Props = $props();
</script>

<Border>
  <div class="inner">
    <div class="field">
      <div class="value">
        <Input bind:value={$character.playerName} />
      </div>
      <BorderLine />
      <div class="label">Player name</div>
    </div>
    <div class="field">
      <div class="value">
        <Input bind:value={$character.alignment} />
      </div>
      <BorderLine />
      <div class="label">Alignment</div>
    </div>
    <div class="field">
      <div class="value">
        <Input bind:value={$character.background} />
      </div>
      <BorderLine />
      <div class="label">Background</div>
    </div>
    <div class="field">
      <div class="value">
        <Input bind:value={$character.class} />
      </div>
      <BorderLine />
      <div class="label">Class</div>
    </div>
    <div class="field">
      <div class="value">
        <Input bind:value={$character.species} />
      </div>
      <BorderLine />
      <div class="label">Species</div>
    </div>
    <div class="field">
      <div class="value">
        <Input bind:value={$character.subclass} />
      </div>
      <BorderLine />
      <div class="label">Subclass</div>
    </div>
    <div class="level">
      <Flex column sm align="center">
        <div class="value">
          <Input bind:value={$character.level} />
        </div>
        <BorderLine />
        <div class="label">Level</div>
      </Flex>
    </div>
  </div>
</Border>

<style lang="scss">
  .inner {
    display: grid;
    grid-template:
      '. . level'
      '. . level'
      '. . level'
      / 1fr 1fr 5em;
    gap: 1em;
  }

  .level {
    grid-area: level;
    align-self: center;

    .value {
      text-align: center;
    }
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.2em;
  }

  .value {
    font-size: 2em;
    font-family: var(--font-written);
  }

  .label {
    font-size: 0.8em;
    text-transform: uppercase;
    opacity: 0.5;
  }
</style>
