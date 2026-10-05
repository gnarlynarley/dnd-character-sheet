import localforage from 'localforage';
import type { Writable } from 'svelte/store';
import { type CharacterType, parseCharacter, safeParseCharacter } from '$lib/models';
import { AVATAR_HEIGHT, AVATAR_WIDTH } from '../constants';
import getCropDetails from '../utils/canvas/getCropDetails';

const exampleSheets = [
	{ avatar: import('./belo.png?url'), data: import('./belo.yml?url') },
	{ avatar: import('./phoebe.png?url'), data: import('./phoebe.yml?url') }
];

export type CharacterSvelteStore = Writable<CharacterType>;

export const characterStorage = localforage.createInstance({
	name: 'dnd-character-sheet',
	storeName: 'characters'
});

export async function loadAllCharacters(): Promise<CharacterType[]> {
	const characters: CharacterType[] = [];
	await characterStorage.iterate((value) => {
		const character = safeParseCharacter(value);
		if (character) {
			characters.push(character);
		}
	});
	return characters;
}

export async function createCharacterData(slug: string, name?: string): Promise<CharacterType> {
	const character = parseCharacter({ slug, name });
	await characterStorage.setItem(slug, character);
	return character;
}

export async function createCharacter(slug: string) {
	const data = await createCharacterData(slug);
	return data;
}

export async function loadCharacterData(slug: string): Promise<CharacterType | null> {
	try {
		const stored = await characterStorage.getItem<CharacterType>(slug);
		if (stored === null) {
			return null;
		}
		return safeParseCharacter(stored);
	} catch {
		return null;
	}
}

export async function saveCharacterData(character: CharacterType) {
	await characterStorage.setItem(character.slug, character);
}

export async function deleteCharacter(slug: string) {
	await characterStorage.removeItem(slug);
}

export async function loadExampleCharacter(slug: string, store: CharacterSvelteStore) {
	const { parse } = await import('yaml');
	const picked = exampleSheets[Math.floor(Math.random() * exampleSheets.length)];
	const blob = await fetch((await picked.avatar).default).then((b) => b.blob());
	const beloSheet = await fetch((await picked.data).default).then((r) => r.text());
	const parsed = parse(beloSheet);
	const character = parseCharacter({ ...parsed, slug });
	const cover = await getCropDetails(blob, AVATAR_WIDTH, AVATAR_HEIGHT);

	character.avatar = {
		...character.avatar,
		blob,
		...cover
	};

	store.set(character);
}
