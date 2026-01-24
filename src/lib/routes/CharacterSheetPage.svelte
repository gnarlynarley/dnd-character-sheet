<script lang="ts">
  import CharacterSheet from '$lib/components/CharacterSheet.svelte';
  import { loadCharacter } from '$lib/stores/character';

  type Params = {
    slug: string;
  };
  type Props = {
    params: Params;
  };
  const { params }: Props = $props();
  const character = $derived(await loadCharacter(params.slug));
</script>

{#if character}
  <CharacterSheet {character} />
{:else}
  <h1>No character found for slug: {params.slug}</h1>
{/if}
