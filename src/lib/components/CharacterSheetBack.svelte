<script lang="ts">
  import type { CharacterSvelteStore } from '$lib/stores/character';
  import Card from './Card.svelte';
  import Input from './Input.svelte';
  import Page from './Page.svelte';

  type Props = {
    character: CharacterSvelteStore;
  };

  const { character }: Props = $props();
</script>

<Page>
  <div class="wrapper">
    <div class="spells">
      <Card title="Spells">
        <div class="spell-wrapper">
          {#each $character.spells as spell}
            <div class="spell">
              <h3>
                <Input bind:value={spell.name} />
              </h3>
            </div>
          {/each}
        </div>
      </Card>
    </div>
    <div class="inventory">
      <Card title="Inventory">
        <p>inventory</p>
      </Card>
    </div>
    <div class="bio">
      <Card title="Biography">
        <p>bio</p>
      </Card>
    </div>
  </div>
</Page>

<style lang="scss">
  .wrapper {
    flex-grow: 1;
    display: grid;
    gap: var(--gutter);
    grid-template:
      'spells inventory'
      'bio inventory'
      / 30% 1fr;
  }

  @each $name in spells, inventory, bio {
    .#{$name} {
      // Styles for each spell can go here
      grid-area: $name;
      flex-grow: 1;
      flex-shrink: 0;
      display: flex;
    }
  }

  .spell-wrapper {
    display: grid;
  }
</style>
