<script lang="ts">
  import { characterStore } from '../stores/character';
  import Border from './Border.svelte';
  import BorderLine from './BorderLine.svelte';
  import Flex from './Flex.svelte';
</script>

<Border>
  <div class="inner">
    <div class="field">
      <div class="value">{$characterStore.playerName}</div>
      <BorderLine />
      <div class="label">Player name</div>
    </div>
    <div class="field">
      <div class="value">{$characterStore.alignment}</div>
      <BorderLine />
      <div class="label">Alignment</div>
    </div>
    <div class="field">
      <div class="value">{$characterStore.background}</div>
      <BorderLine />
      <div class="label">Background</div>
    </div>
    <div class="field">
      <div class="value">{$characterStore.class}</div>
      <BorderLine />
      <div class="label">Class</div>
    </div>
    <div class="field">
      <div class="value">{$characterStore.species}</div>
      <BorderLine />
      <div class="label">Species</div>
    </div>
    <div class="field">
      <div class="value">{$characterStore.subclass}</div>
      <BorderLine />
      <div class="label">Subclass</div>
    </div>
    <div class="level">
      <Flex column sm align="center">
        <div class="value">{$characterStore.level}</div>
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
