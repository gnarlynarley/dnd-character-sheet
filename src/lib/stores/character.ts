import { writable } from 'svelte/store';
import { type CharacterAvatar, type CharacterType } from '../models';
import { createImage } from '../utils';
import { parseData, createEmptyCharacter } from '../utils/parseSheet';
import avatarSrc from './belo.jpg';
import localforage from 'localforage';

const LOCAL_KEY = 'character';

export const characterStore = writable<CharacterType>(createEmptyCharacter());
export const avatarStore = writable<CharacterAvatar>({
  image: null,
  contrast: 0,
  gray: 0.18,
  black: 0.36,
});

localforage.getItem(LOCAL_KEY).then((value) => {
  const localCharacter = parseData(value);
  characterStore.set(localCharacter);
});

characterStore.subscribe((value) => {
  localforage.setItem(LOCAL_KEY, value);
});

try {
  console.log(parseData({}));
} catch {}

fetch(avatarSrc)
  .then((b) => b.blob())
  .then(createImage)
  .then((image) =>
    avatarStore.update((value) => {
      return {
        ...value,
        image,
      };
    }),
  );
