import type { Spell } from '$lib/models/spells';
import path from 'path';
import * as prettier from 'prettier';

namespace FiveE {
  export type SpellIndexDTO = Record<string, string>;

  export type SpellDTO = {
    spell: Array<{
      name: string;
      source: string;
      page: number;
      srd52: any;
      basicRules2024?: boolean;
      level: number;
      school: string;
      time: Array<{
        number: number;
        unit: string;
        condition?: string;
        note?: string;
      }>;
      range: {
        type: string;
        distance: {
          type: string;
          amount?: number;
        };
      };
      components: {
        v?: boolean;
        s?: boolean;
        m: any;
      };
      duration: Array<{
        type: string;
        duration?: {
          type: string;
          amount: number;
        };
        concentration?: boolean;
        ends?: Array<string>;
      }>;
      entries: Array<any>;
      entriesHigherLevel?: Array<{
        type: string;
        name: string;
        entries: Array<string>;
      }>;
      scalingLevelDice: any;
      damageInflict?: Array<string>;
      savingThrow?: Array<string>;
      miscTags?: Array<string>;
      areaTags?: Array<string>;
      meta?: {
        ritual: boolean;
      };
      conditionInflict?: Array<string>;
      affectsCreatureType?: Array<string>;
      hasFluffImages?: boolean;
      damageResist?: Array<string>;
      spellAttack?: Array<string>;
      abilityCheck?: Array<string>;
      conditionImmune?: Array<string>;
      alias?: Array<string>;
      damageVulnerable?: Array<string>;
      damageImmune?: Array<string>;
    }>;
  };

  export type SpellSourcesDTO = Partial<
    Record<
      string,
      Partial<
        Record<
          string,
          {
            class: {
              name: string;
            }[];
          }
        >
      >
    >
  >;

  export type BooksDTO = {
    book: {
      name: "Player's Handbook (2014)";
      id: 'PHB';
      source: 'PHB';
      group: 'core';
    }[];
  };
}

const DATA_ROOT_DIR = '.data/5etools-v2.24.1/data';

const bookCollection: FiveE.BooksDTO = await Bun.file(
  path.join(DATA_ROOT_DIR, 'books.json'),
).json();
const indexData: FiveE.SpellIndexDTO = await Bun.file(
  path.join(DATA_ROOT_DIR, 'spells/index.json'),
).json();
const spellDataCollection = await Promise.all(
  Object.values(indexData).map(async (fileName) => {
    const filePath = path.join(DATA_ROOT_DIR, 'spells', fileName);
    const data: FiveE.SpellDTO = await Bun.file(filePath).json();

    return data;
  }),
);
const sources: FiveE.SpellSourcesDTO = await Bun.file(
  path.join(DATA_ROOT_DIR, 'spells/sources.json'),
).json();

type EntryDTO =
  | string
  | { type: 'list'; items: EntryDTO[] }
  | { type: 'entries'; entries: EntryDTO[] }
  | { type: 'table'; colLabels: string[]; caption: string; rows: string[][] }
  | {
      type: 'item';
      name: string;
      entries: EntryDTO[];
    }
  | { type: 'quote'; entries: EntryDTO[]; by: string }
  | { type: 'inset'; name: string; entries: EntryDTO[] };

function parseEntry(entry: EntryDTO): string | [] {
  if (typeof entry === 'string') {
    return entry;
  }

  switch (entry.type) {
    case 'list': {
      return entry.items
        .flatMap((entry) => {
          const parsed = parseEntry(entry);
          if (parsed) return `- ${parsed}`;
          return [];
        })
        .join('\n\n');
    }
    case 'entries': {
      return entry.entries.flatMap(parseEntry).join('\n\n');
    }
    case 'table': {
      const header = `| ${entry.colLabels.join(' | ')} |`;
      const separator = `| ${entry.colLabels.map(() => '---').join(' | ')} |`;
      const rows = entry.rows.map((row) => `| ${row.join(' | ')} |`).join('\n');
      const table = [
        entry.caption && `**${entry.caption}**\n`,
        header,
        separator,
        rows,
      ]
        .filter(Boolean)
        .join('\n');

      return `\n${table}\n`;
    }

    case 'item': {
      return [`**${entry.name}**:`, entry.entries.flatMap(parseEntry)]
        .flat()
        .join(' ');
    }
    case 'quote': {
      return [...entry.entries.flatMap(parseEntry), entry.by]
        .map((line) => `> ${line}`)
        .join('\n\n');
    }
    case 'inset': {
      return [`### ${entry.name}`, entry.entries.flatMap(parseEntry)]
        .flat()
        .join('\n\n');
    }
    default: {
      console.error(`There is an unparsed entry`);
      console.error(entry);
      return [];
    }
  }
}

function parseDescription(spell: FiveE.SpellDTO['spell'][number]): string {
  const parts = spell.entries.flatMap((e) => parseEntry(e) ?? []);

  return parts
    .join('\n\n')
    .replaceAll(/\{\@(.*?) (.*?)\}/g, (_, key, label) => {
      return label.split('|')[0];
    });
}

let spellsCollections = await Promise.all(
  spellDataCollection.map((item) =>
    Promise.all(
      item.spell.map<Promise<Spell>>(async (spell) => {
        return {
          id: `${spell.name}|${spell.source}`,
          name: spell.name,
          source: spell.source,
          level: spell.level,
          range: spell.range.distance
            ? [spell.range.distance.amount, spell.range.distance.type]
                .filter(Boolean)
                .join(' ')
            : (spell.range.type ?? 'self'),
          classes:
            sources[spell.source]?.[spell.name]?.class?.map((i) =>
              i.name.toLowerCase(),
            ) ?? [],
          description: await prettier.format(parseDescription(spell), {
            parser: 'markdown',
          }),
        };
      }),
    ),
  ),
)
  .then((arr) => arr.flat())
  .then((arr) => arr.sort((a, b) => a.name.localeCompare(b.name)));

const spellSources = Array.from(
  new Set(spellsCollections.map((spell) => spell.source)),
);

let bookSources = bookCollection.book.reduce<Record<string, string>>(
  (acc, book) => {
    if (!spellSources.includes(book.source)) return acc;
    acc[book.source] = book.name;
    return acc;
  },
  {},
);

// write collections to files
const DESTINATION_PATH = './src/lib/services/spells/data';
const groupedSpellCollections = Object.groupBy(
  spellsCollections,
  (s) => s.source,
);
for (const [source, spells] of Object.entries(groupedSpellCollections)) {
  if (spells === undefined) continue;
  await Bun.write(
    path.join(DESTINATION_PATH, `spells-${source}.json`),
    JSON.stringify(spells),
  );
}
await Bun.write(
  path.join(DESTINATION_PATH, `sources.json`),
  JSON.stringify(bookSources),
);
