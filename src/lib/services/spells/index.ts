import type { Spell, SpellSources } from '$lib/models/spells';
import spellSourcesUrl from './data/sources.json?url';

type SpellSourcesDTO = Record<string, string>;

const SPELL_DATA_URLS: Partial<Record<string, string>> = Object.fromEntries(
  Object.entries(
    import.meta.glob('./data/spells-*.json', {
      query: '?url',
      eager: true,
    }) as Record<string, any>,
  ).map(([key, value]) => {
    const filename = key.split('/').pop()!;
    const source = filename.replace('spells-', '').replace('.json', '');

    return [source, value.default as string];
  }),
);

async function getJson<T = unknown>(url: string): Promise<T> {
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

export async function getSpellSources(): Promise<SpellSources> {
  const data = await getJson<SpellSourcesDTO>(spellSourcesUrl);

  return Object.entries(data).map(([source, name]) => ({ source, name }));
}

function sortSpells(a: Spell, b: Spell): number {
  const levelSort = a.level - b.level;
  if (levelSort !== 0) {
    return levelSort;
  }

  return a.name.localeCompare(b.name);
}

export async function getSpells(sources: string[]): Promise<Spell[]> {
  const spellsCollections = await Promise.all(
    sources.flatMap((source) => {
      const url = SPELL_DATA_URLS[source];
      return url ? getJson<Spell>(url) : [];
    }),
  );

  const spells = spellsCollections.flat().sort(sortSpells);

  return spells;
}
