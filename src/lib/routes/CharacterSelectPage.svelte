<script lang="ts">
  import Border from '$lib/components/Border.svelte';
  import BorderLine from '$lib/components/BorderLine.svelte';
  import Button from '$lib/components/Button.svelte';
  import CharacterCard from '$lib/components/CharacterCard.svelte';
  import Flex from '$lib/components/Flex.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import {
    createCharacterData,
    deleteCharacter,
    loadAllCharacters,
  } from '$lib/stores/character';
  import { slugify } from '$lib/utils';

  let characters = $state(await loadAllCharacters());
  let newCharacterName = $state('');
  let characterSlugToDelete: string | null = $state(null);

  async function handleCreateCharacter() {
    const trimmed = newCharacterName.trim();
    if (trimmed.length === 0) {
      return;
    }
    const slug = slugify(trimmed);
    const newCharacter = await createCharacterData(slug, trimmed);
    characters.push(newCharacter);
    newCharacterName = '';
    characters = characters;
  }

  function handleOpenDeleteModal(slug: string) {
    characterSlugToDelete = slug;
  }

  function handleCloseDeleteModal() {
    characterSlugToDelete = null;
  }

  async function handleDeleteCharacter() {
    if (!characterSlugToDelete) {
      return;
    }
    const slug = characterSlugToDelete;
    characterSlugToDelete = null;
    await deleteCharacter(slug);
    characters = characters.filter((c) => c.slug !== slug);
  }
</script>

{#if characterSlugToDelete}
  <Modal>
    <Flex column>
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete this character?</p>
      <Flex>
        <Button onclick={handleCloseDeleteModal}>Cancel</Button>
        <Button onclick={handleDeleteCharacter}>Delete</Button>
      </Flex>
    </Flex>
  </Modal>
{/if}

<Flex column xl>
  <div class="grid">
    {#each characters as character}
      <CharacterCard
        {character}
        onDelete={() => handleOpenDeleteModal(character.slug)}
      />
    {/each}
  </div>

  <Flex column align="center">
    <Border>
      <Flex column>
        <input
          type="text"
          bind:value={newCharacterName}
          placeholder="New Character Name"
          required
        />
        <Button onclick={handleCreateCharacter}>Create New Character</Button>
      </Flex>
    </Border>
  </Flex>
</Flex>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1em;
    padding: var(--gutter);
  }

  input {
    padding: var(--gutter);
  }
</style>
