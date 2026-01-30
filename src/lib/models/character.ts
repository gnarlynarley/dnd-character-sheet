import * as v from 'valibot';

const skillOptions = [
  'acrobatics',
  'animalHandling',
  'arcana',
  'athletics',
  'deception',
  'history',
  'insight',
  'intimidation',
  'investigation',
  'medicine',
  'nature',
  'perception',
  'performance',
  'persuasion',
  'religion',
  'sleightOfHand',
  'stealth',
  'survival',
] as const;

const abilityOptions = ['str', 'dex', 'con', 'int', 'wis', 'cha'] as const;
const abilityAndNoneOptions = [
  'none',
  'str',
  'dex',
  'con',
  'int',
  'wis',
  'cha',
] as const;
const proficiencyOptions = ['none', 'proficient', 'double', 'half'] as const;

export const skillSchema = v.picklist(skillOptions);
export const abilitySchema = v.picklist(abilityOptions);
export const abilityAndNoneSchema = v.picklist(abilityAndNoneOptions);
export const proficiencySchema = v.picklist(proficiencyOptions);
export const characterWeaponSchema = v.object({
  name: v.optional(v.string(), ''),
  hit: v.optional(v.number(), 0),
  damage: v.optional(v.string(), ''),
  details: v.optional(v.string(), ''),
});
export const characterSpellSchema = v.object({
  name: v.optional(v.string(), ''),
  level: v.optional(v.number(), 0),
  castingTime: v.optional(v.string(), ''),
  range: v.optional(v.string(), ''),
  components: v.optional(v.string(), ''),
  duration: v.optional(v.string(), ''),
  description: v.optional(v.string(), ''),
  notes: v.optional(v.string(), ''),
  prepared: v.optional(v.boolean(), true),
});
export const characterAvatarSchema = v.object({
  blob: v.optional(v.nullable(v.instance(Blob)), null),
  contrast: v.optional(v.number(), 0),
  gray: v.optional(v.number(), 0.5),
  black: v.optional(v.number(), 0.25),
  x: v.optional(v.number(), 0),
  y: v.optional(v.number(), 0),
  scale: v.optional(v.number(), 1),
});
export const characterSchema = v.object({
  slug: v.pipe(v.string(), v.nonEmpty()),
  avatar: v.optional(characterAvatarSchema, {
    blob: null,
    contrast: 1,
    gray: 0.5,
    black: 0.25,
    x: 0,
    y: 0,
    scale: 1,
  }),
  name: v.optional(v.string(), ''),
  playerName: v.optional(v.string(), ''),
  level: v.optional(v.number(), 1),
  class: v.optional(v.string(), ''),
  subclass: v.optional(v.string(), ''),
  species: v.optional(v.string(), ''),
  size: v.optional(v.string(), ''),
  speed: v.optional(v.number(), 30),
  background: v.optional(v.string(), ''),
  alignment: v.optional(v.string(), ''),
  armorClass: v.optional(v.number(), 10),
  hitDice: v.optional(v.string(), '1d8'),
  hitPoints: v.optional(v.number(), 1),
  proficiencyBonus: v.optional(v.number(), 2),
  abilityScores: v.optional(
    v.object(v.entriesFromList(abilityOptions, v.optional(v.number(), 10))),
    {
      str: 10,
      dex: 10,
      con: 10,
      int: 10,
      wis: 10,
      cha: 10,
    },
  ),
  abilityProficiencies: v.optional(v.array(abilitySchema), []),
  skillProficiencies: v.optional(
    v.object(
      v.entriesFromList(skillOptions, v.optional(proficiencySchema, 'none')),
    ),
    {
      acrobatics: 'none',
      animalHandling: 'none',
      arcana: 'none',
      athletics: 'none',
      deception: 'none',
      history: 'none',
      insight: 'none',
      intimidation: 'none',
      investigation: 'none',
      medicine: 'none',
      nature: 'none',
      perception: 'none',
      performance: 'none',
      persuasion: 'none',
      religion: 'none',
      sleightOfHand: 'none',
      stealth: 'none',
      survival: 'none',
    },
  ),
  languages: v.optional(v.string(), ''),
  features: v.optional(
    v.object({
      feats: v.optional(v.string(), ''),
      species: v.optional(v.string(), ''),
      class: v.optional(v.string(), ''),
    }),
    {
      feats: '',
      species: '',
      class: '',
    },
  ),
  weapons: v.optional(v.array(characterWeaponSchema), []),
  spells: v.optional(v.array(characterSpellSchema), []),
  spellcastingAbility: v.optional(abilityAndNoneSchema, 'none'),
  spellSlots: v.optional(
    v.array(
      v.object({
        level: v.optional(v.number(), 1),
        amount: v.optional(v.number(), 0),
      }),
    ),
    [],
  ),
  inventory: v.optional(v.array(v.string()), []),
});

export function parseCharacter(data: unknown): CharacterType {
  return v.parse(characterSchema, data);
}

export { parse } from 'valibot';

export type CharacterWeaponType = v.InferOutput<typeof characterWeaponSchema>;
export type CharacterSpell = v.InferOutput<typeof characterSpellSchema>;
export type CharacterAvatar = v.InferOutput<typeof characterAvatarSchema>;
export type CharacterType = v.InferOutput<typeof characterSchema>;
export type ProficiencyType = v.InferOutput<typeof proficiencySchema>;
export type AbilityType = v.InferOutput<typeof abilitySchema>;
export type AbilityAndNoneType = v.InferOutput<typeof abilityAndNoneSchema>;
export type SkillType = v.InferOutput<typeof skillSchema>;

export const skillToAbilityMap = {
  acrobatics: 'dex',
  animalHandling: 'wis',
  arcana: 'int',
  athletics: 'str',
  deception: 'cha',
  history: 'int',
  insight: 'wis',
  intimidation: 'cha',
  investigation: 'int',
  medicine: 'wis',
  nature: 'int',
  perception: 'wis',
  performance: 'cha',
  persuasion: 'cha',
  religion: 'int',
  sleightOfHand: 'dex',
  stealth: 'dex',
  survival: 'wis',
} as const satisfies Record<string, AbilityType>;
export const skills = Object.keys(skillToAbilityMap) as SkillType[];
export const abilitiesAndNone: AbilityAndNoneType[] = [
  'none',
  'str',
  'dex',
  'con',
  'int',
  'wis',
  'cha',
] as const;
