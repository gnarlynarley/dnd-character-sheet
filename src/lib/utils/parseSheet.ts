import z from "zod";
import type {
  CharacterType,
  SkillType,
  AbilityType,
  ProficiencyType,
} from "../models";
import { parse } from "yaml";

const skillSchema: z.ZodType<SkillType> = z.enum([
  "acrobatics",
  "animalHandling",
  "arcana",
  "athletics",
  "deception",
  "history",
  "insight",
  "intimidation",
  "investigation",
  "medicine",
  "nature",
  "perception",
  "performance",
  "persuasion",
  "religion",
  "sleightOfHand",
  "stealth",
  "survival",
]);
const abilitySchema: z.ZodType<AbilityType> = z.enum([
  "str",
  "dex",
  "con",
  "int",
  "wis",
  "cha",
]);
const proficiencySchema: z.ZodType<ProficiencyType> = z.enum([
  "none",
  "proficient",
  "double",
  "half",
]);

const EMPTY_CHARACTER: CharacterType = {
  avatar: {
    blob: null,
    contrast: 1,
    gray: 0.5,
    black: 0.25,
  },
  name: "",
  playerName: "",
  level: 1,
  class: "",
  subclass: "",
  species: "",
  size: "Medium",
  speed: 30,
  background: "",
  alignment: "",
  proficiencyBonus: 2,
  abilityScores: {
    str: 10,
    dex: 10,
    con: 10,
    int: 10,
    wis: 10,
    cha: 10,
  },
  abilityProficiencies: [],
  skillProficiencies: {},
  languages: "",
  features: {
    feats: "",
    species: "",
    class: "",
  },
  armorClass: 0,
  hitDice: "",
  hitPoints: 0,
  weapons: [],
};

export const characterSchema: z.ZodType<CharacterType> = z
  .object({
    avatar: z
      .object({
        blob: z
          .instanceof(Blob)
          .nullable()
          .default(EMPTY_CHARACTER.avatar.blob),
        contrast: z.number().default(EMPTY_CHARACTER.avatar.contrast),
        gray: z.number().default(EMPTY_CHARACTER.avatar.gray),
        black: z.number().default(EMPTY_CHARACTER.avatar.black),
      })
      .nullish()
      .transform((value) => value ?? EMPTY_CHARACTER.avatar),
    name: z.string().default(EMPTY_CHARACTER.name),
    playerName: z.string().default(EMPTY_CHARACTER.playerName),
    level: z.number().default(1),
    class: z.string().default(EMPTY_CHARACTER.class),
    subclass: z.string().default(EMPTY_CHARACTER.subclass),
    species: z.string().default(EMPTY_CHARACTER.species),
    size: z.string().default("medium"),
    speed: z.number().default(30),
    background: z.string().default(EMPTY_CHARACTER.background),
    alignment: z.string().default(EMPTY_CHARACTER.alignment),
    armorClass: z.number().default(EMPTY_CHARACTER.armorClass),
    hitDice: z.string().default(EMPTY_CHARACTER.hitDice),
    hitPoints: z.number().default(EMPTY_CHARACTER.hitPoints),
    proficiencyBonus: z.number().default(EMPTY_CHARACTER.proficiencyBonus),
    abilityScores: z
      .partialRecord(abilitySchema, z.number())
      .nullish()
      .transform((value) => {
        return {
          ...EMPTY_CHARACTER.abilityScores,
          ...value,
        };
      }),
    abilityProficiencies: z
      .array(abilitySchema)
      .default(EMPTY_CHARACTER.abilityProficiencies),
    skillProficiencies: z
      .partialRecord(skillSchema, proficiencySchema)
      .nullish()
      .transform((value): CharacterType["skillProficiencies"] => ({
        ...EMPTY_CHARACTER.skillProficiencies,
        ...value,
      })),
    languages: z.string().default(EMPTY_CHARACTER.languages),
    features: z
      .object({
        feats: z.string().default(EMPTY_CHARACTER.features.feats),
        species: z.string().default(EMPTY_CHARACTER.features.species),
        class: z.string().default(EMPTY_CHARACTER.features.class),
      })
      .nullish()
      .transform((value) => ({ ...EMPTY_CHARACTER.features, ...value })),
    weapons: z
      .array(
        z.object({
          name: z.string().default(""),
          hit: z.number().default(0),
          damage: z.string().default(""),
          details: z.string().default(""),
        })
      )
      .default(EMPTY_CHARACTER.weapons),
  })
  .nullish()
  .transform((value) => value ?? EMPTY_CHARACTER);

export function parseYaml(yamlString: string) {
  const obj = parse(yamlString);

  return characterSchema.parse(obj);
}

export function parseData(data: unknown): CharacterType {
  return characterSchema.parse(data);
}

export function createEmptyCharacter(): CharacterType {
  return structuredClone(EMPTY_CHARACTER);
}
