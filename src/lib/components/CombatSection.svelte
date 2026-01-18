<script lang="ts">
  import Border from './Border.svelte';
  import BorderLine from './BorderLine.svelte';
  import Card from './Card.svelte';
  import DeathSave from './DeathSave.svelte';
  import Flex from './Flex.svelte';
  import FlexPush from './FlexPush.svelte';

  const ac = 12;
  const hp = 34;
  const hitdice = '2d8';
</script>

<div class="container">
  <div class="armor">
    <div class="label">Armor<br />Class</div>
    <BorderLine />
    <div class="value">{ac}</div>
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
            <span class="value">{hp}</span>
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
          <div class="value">{hitdice}</div>
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
  }

  .label {
    text-transform: uppercase;
    text-align: center;
  }

  .value {
    font-size: 2em;
    font-family: var(--font-written);
  }
  .armor {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: center;
    aspect-ratio: 1/1;
    border: var(--border);
    border-radius: 0.4em 0.4em 10em 10em;
    filter: var(--shadow) url('#pencil');
    background-color: var(--color-paper);
    text-align: center;
    padding: var(--gutter);

    .title {
      filter: none;
    }
  }

  .value {
    justify-self: center;
  }
  .inner {
    display: flex;
    gap: 1em;
    flex-grow: 1;
    gap: var(--gutter);
  }
</style>
