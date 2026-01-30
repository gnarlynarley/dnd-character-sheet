import { type CharacterType, characterSchema } from '$lib/models';
import { parse as parseSchema } from 'valibot';
import { deleteProperty } from './index';

export function parseData(data: unknown): CharacterType {
  return parseSchema(characterSchema, data);
}

export function createNewCharacter(slug: string): CharacterType {
  return parseSchema(characterSchema, { slug });
}

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export function compressObject<T>(obj: T): DeepPartial<T> {
  const compress = (value: unknown): unknown => {
    if (value === null || value === undefined) return undefined;
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed === '' || trimmed.toLowerCase() === 'none') return undefined;
      return value;
    }
    if (typeof value === 'number') {
      if (value === 0) return undefined;
      return value;
    }
    if (Array.isArray(value)) {
      const compressed = value
        .map((v) => compress(v))
        .filter((v) => v !== undefined);
      if (compressed.length === 0) return undefined;
      return compressed;
    }
    if (typeof value === 'object') {
      const entries = Object.entries(value as Record<string, unknown>)
        .map(([k, v]) => [k, compress(v)] as const)
        .filter(([, v]) => v !== undefined);
      if (entries.length === 0) return undefined;
      return Object.fromEntries(entries);
    }
    return value;
  };

  return (compress(obj) ?? {}) as Partial<T>;
}

export async function exportToYaml(
  character: DeepPartial<CharacterType>,
): Promise<string> {
  let copy = structuredClone(character);
  copy = compressObject(copy);
  copy = deleteProperty(copy, 'slug');
  copy = deleteProperty(copy, 'avatar');

  if (copy.spellSlots?.length === 0) {
    copy = deleteProperty(copy, 'spellSlots');
  }

  if (copy.weapons?.length === 0) {
    copy = deleteProperty(copy, 'weapons');
  }

  const yaml = await import('yaml');
  return yaml.stringify(copy);
}

export async function parseYaml(
  slug: string,
  yamlString: string,
): Promise<CharacterType> {
  const yaml = await import('yaml');
  const data = yaml.parse(yamlString);
  return parseSchema(characterSchema, { slug, ...data });
}
