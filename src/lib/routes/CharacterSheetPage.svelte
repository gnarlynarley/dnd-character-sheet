<script lang="ts">
  import CharacterSheet from '$lib/components/CharacterSheet.svelte';
  import PageTitle from '$lib/components/PageTitle.svelte';
  import { loadCharacterData } from '$lib/stores/character';
  import { link } from 'svelte-spa-router';

  type Params = {
    slug: string;
  };
  type Props = {
    params: Params;
  };
  const { params }: Props = $props();
  let characterData = $derived(await loadCharacterData(params.slug));
</script>

<PageTitle title={characterData ? `${characterData.name}` : 'Not Found'} />

{#if characterData}
  <CharacterSheet bind:characterData />
{:else}
  <h1>
    No character found for slug: <code>{params.slug}</code>
  </h1>
  <a href="/" use:link>Go back to character select</a>
{/if}
