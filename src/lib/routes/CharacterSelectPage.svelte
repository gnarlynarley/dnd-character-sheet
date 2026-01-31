<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import CharacterCard from '$lib/components/CharacterCard.svelte';
  import Flex from '$lib/components/Flex.svelte';
  import FlexPush from '$lib/components/FlexPush.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import OverlayBox from '$lib/components/OverlayBox.svelte';
  import PageTitle from '$lib/components/PageTitle.svelte';
  import {
    createCharacterData,
    deleteCharacter,
    loadAllCharacters,
  } from '$lib/stores/character';
  import { addNotification } from '$lib/stores/notifications';
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
    if (characters.find((c) => c.slug === slug)) {
      addNotification('A character with that name already exists.', 'error');
      return;
    }
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

  function onsubmit(event: Event) {
    event.preventDefault();
  }
</script>

<PageTitle title="Character select" />

{#if characterSlugToDelete}
  <Modal onclose={handleCloseDeleteModal}>
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

<Flex column>
  <div class="grid">
    {#each characters as character (character.slug)}
      <CharacterCard
        {character}
        onDelete={() => handleOpenDeleteModal(character.slug)}
      />
    {/each}
  </div>

  <FlexPush />

  <div class="toolbar">
    <OverlayBox>
      <Flex column xl>
        <Flex column align="start" padding>
          <Flex>
            <form {onsubmit}>
              <Flex>
                <input
                  required
                  type="text"
                  bind:value={newCharacterName}
                  placeholder="New Character Name"
                />
                <Button type="submit" onclick={handleCreateCharacter}>
                  Create New Character
                </Button>
              </Flex>
            </form>
          </Flex>
        </Flex>
      </Flex>
    </OverlayBox>
  </div>
</Flex>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1em;
    padding: var(--gutter);
    padding-top: 0;
  }

  .toolbar {
    position: sticky;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
  }

  input {
    padding: var(--gutter);
  }
</style>
