import { writable } from "svelte/store";
import { type CharacterType } from "../models";
import {
  parseData,
  createEmptyCharacter,
  parseYaml,
} from "../utils/parseSheet";
import localforage from "localforage";
import avatarSrc from "./belo.jpg";
import beloSheet from "./belo.yml?raw";

const LOCAL_KEY = "character";

export const characterStore = writable<CharacterType>(createEmptyCharacter());

localforage.getItem(LOCAL_KEY).then((value) => {
  const localCharacter = parseData(value);
  characterStore.set(localCharacter);
});

characterStore.subscribe((value) => {
  localforage.setItem(LOCAL_KEY, value);
});

export async function loadCharacter() {
  const blob = await fetch(avatarSrc).then((b) => b.blob());
  const character = parseYaml(beloSheet);
  character.avatar.blob = blob;
  characterStore.set(character);
}
