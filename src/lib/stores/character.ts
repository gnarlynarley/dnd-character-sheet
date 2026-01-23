import { writable } from 'svelte/store';
import { type CharacterType } from '$lib/models';
import {
  parseData,
  createEmptyCharacter,
  parseYaml,
} from '../utils/parseSheet';
import localforage from 'localforage';
import avatarSrc from './belo.jpg';
import beloSheetUrl from './belo.yml?url';
import getCropDetails from '../utils/canvas/getCropDetails';
import { AVATAR_HEIGHT, AVATAR_WIDTH } from '../constants';

const LOCAL_KEY = 'character';

export const character = writable<CharacterType>(createEmptyCharacter());

localforage.getItem(LOCAL_KEY).then((value) => {
  const localCharacter = parseData(value);
  character.set(localCharacter);
});

character.subscribe((value) => {
  localforage.setItem(LOCAL_KEY, value);
});

export async function loadCharacter() {
  const blob = await fetch(avatarSrc).then((b) => b.blob());
  const beloSheet = await fetch(beloSheetUrl).then((r) => r.text());
  const parsed = parseYaml(beloSheet);
  const cover = await getCropDetails(blob, AVATAR_WIDTH, AVATAR_HEIGHT);
  parsed.avatar = {
    ...parsed.avatar,
    blob,
    ...cover,
  };
  character.set(parsed);
}
