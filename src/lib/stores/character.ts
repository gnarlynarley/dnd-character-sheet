import { writable } from 'svelte/store';
import { type CharacterAvatar, type CharacterType } from '../models';
import { createImage } from '../utils';
import { parseYaml } from '../utils/parseSheet';
import avatarSrc from './belo.jpg';
import characterData from './belo.yml?raw';

export const characterStore = writable<CharacterType>(parseYaml(characterData));
export const avatarStore = writable<CharacterAvatar>({
  image: null,
  contrast: 0,
  gray: 0.18,
  black: 0.36,
});

fetch(avatarSrc)
  .then((b) => b.blob())
  .then(createImage)
  .then((image) =>
    avatarStore.update((value) => {
      return {
        ...value,
        image,
      };
    })
  );
