import { writable, type Writable } from 'svelte/store';
import { characterSchema, type CharacterType } from '$lib/models';
import { parse as parseSchema } from 'valibot';
import avatarSrc from './belo.jpg?url';
import beloSheetUrl from './belo.yml?url';
import getCropDetails from '../utils/canvas/getCropDetails';
import { AVATAR_HEIGHT, AVATAR_WIDTH } from '../constants';
import localforage from 'localforage';

export type CharacterSvelteStore = Writable<CharacterType>;

export const characterStorage = localforage.createInstance({
  name: 'dnd-character-sheet',
  storeName: 'characters',
});

export async function loadAllCharacters(): Promise<CharacterType[]> {
  const characters: CharacterType[] = [];
  await characterStorage.iterate((value) => {
    const character = parseSchema(characterSchema, value);
    characters.push(character);
  });
  return characters;
}

export async function createCharacterData(
  slug: string,
  name?: string,
): Promise<CharacterType> {
  const character = parseSchema(characterSchema, { slug, name });
  await characterStorage.setItem(slug, character);
  return character;
}

export async function createCharacter(slug: string) {
  await createCharacterData(slug);
  return loadCharacter(slug);
}

export async function loadCharacterData(
  slug: string,
): Promise<CharacterType | null> {
  const stored = await characterStorage.getItem<CharacterType>(slug);
  if (stored === null) {
    return null;
  }
  return parseSchema(characterSchema, stored);
}

export async function loadCharacter(
  slug: string,
): Promise<CharacterSvelteStore | null> {
  const characterData = await loadCharacterData(slug);
  if (characterData === null) {
    return null;
  }
  const store = writable<CharacterType>(characterData);

  store.subscribe(async (value) => {
    if (value.slug) {
      await characterStorage.setItem(value.slug, value);
    }
  });

  return store;
}

export async function deleteCharacter(slug: string) {
  await characterStorage.removeItem(slug);
}

export async function loadExampleCharacter(
  slug: string,
  store: CharacterSvelteStore,
) {
  const { parse } = await import('yaml');
  const blob = await fetch(avatarSrc).then((b) => b.blob());
  const beloSheet = await fetch(beloSheetUrl).then((r) => r.text());
  const parsed = parse(beloSheet);
  const character = parseSchema(characterSchema, { ...parsed, slug });
  const cover = await getCropDetails(blob, AVATAR_WIDTH, AVATAR_HEIGHT);

  character.avatar = {
    ...character.avatar,
    blob,
    ...cover,
  };

  store.set(character);
}
