import { z } from 'zod';

export const skillSchema = z.enum([
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
]);
export const abilitySchema = z.enum(['str', 'dex', 'con', 'int', 'wis', 'cha']);
export const abilityAndNoneSchema = z.enum([
  'none',
  'str',
  'dex',
  'con',
  'int',
  'wis',
  'cha',
]);
export const proficiencySchema = z.enum([
  'none',
  'proficient',
  'double',
  'half',
]);
export const characterWeaponSchema = z.object({
  name: z.string().optional().default(''),
  hit: z.number().optional().default(0),
  damage: z.string().optional().default(''),
  details: z.string().optional().default(''),
});
export const characterSpellSchema = z.object({
  name: z.string().optional().default(''),
  level: z.number().optional().default(0),
  castingTime: z.string().optional().default(''),
  range: z.string().optional().default(''),
  components: z.string().optional().default(''),
  duration: z.string().optional().default(''),
  description: z.string().optional().default(''),
  notes: z.string().optional().default(''),
  prepared: z.boolean().optional().default(true),
});
export const characterAvatarSchema = z.object({
  blob: z.instanceof(Blob).nullable().default(null),
  contrast: z.number().optional().default(1),
  gray: z.number().optional().default(0.5),
  black: z.number().optional().default(0.25),
  x: z.number().optional().default(0),
  y: z.number().optional().default(0),
  scale: z.number().optional().default(1),
});
export const characterSchema = z.object({
  slug: z.string().nonempty(),
  avatar: characterAvatarSchema.optional().default({
    blob: null,
    contrast: 1,
    gray: 0.5,
    black: 0.25,
    x: 0,
    y: 0,
    scale: 1,
  }),
  name: z.string().optional().default(''),
  playerName: z.string().optional().default(''),
  level: z.number().optional().default(1),
  class: z.string().optional().default(''),
  subclass: z.string().optional().default(''),
  species: z.string().optional().default(''),
  size: z.string().optional().default(''),
  speed: z.number().optional().default(30),
  background: z.string().optional().default(''),
  alignment: z.string().optional().default(''),
  armorClass: z.number().optional().default(10),
  hitDice: z.string().optional().default('1d8'),
  hitPoints: z.number().optional().default(1),
  proficiencyBonus: z.number().optional().default(2),
  abilityScores: z
    .record(abilitySchema, z.number().optional().default(10))
    .optional()
    .default({
      str: 10,
      dex: 10,
      con: 10,
      int: 10,
      wis: 10,
      cha: 10,
    }),
  abilityProficiencies: z.array(abilitySchema).optional().default([]),
  skillProficiencies: z
    .record(skillSchema, proficiencySchema.optional().default('none'))
    .optional()
    .default({
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
    }),
  languages: z.string().optional().default(''),
  features: z
    .object({
      feats: z.string().optional().default(''),
      species: z.string().optional().default(''),
      class: z.string().optional().default(''),
    })
    .optional()
    .default({
      feats: '',
      species: '',
      class: '',
    }),
  weapons: z.array(characterWeaponSchema).optional().default([]),
  spells: z.array(characterSpellSchema).optional().default([]),
  spellcastingAbility: abilityAndNoneSchema.optional().default('none'),
  spellSlots: z
    .array(
      z.object({
        level: z.number().optional().default(1),
        amount: z.number().optional().default(0),
      }),
    )
    .optional()
    .default([]),
  inventory: z.array(z.string()).optional().default([]),
});

export type CharacterWeaponType = z.infer<typeof characterWeaponSchema>;
export type CharacterSpell = z.infer<typeof characterSpellSchema>;
export type CharacterAvatar = z.infer<typeof characterAvatarSchema>;
export type CharacterType = z.infer<typeof characterSchema>;
export type ProficiencyType = z.infer<typeof proficiencySchema>;
export type AbilityType = z.infer<typeof abilitySchema>;
export type AbilityAndNoneType = z.infer<typeof abilityAndNoneSchema>;
export type SkillType = z.infer<typeof skillSchema>;

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
