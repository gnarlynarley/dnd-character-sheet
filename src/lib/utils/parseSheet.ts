import { type CharacterType, characterSchema } from '$lib/models';

export function parseData(data: unknown): CharacterType {
  return characterSchema.parse(data);
}

export function createNewCharacter(slug: string): CharacterType {
  return characterSchema.parse({ slug });
}
