export type CharacterWeaponType = {
  name: string;
  hit: number;
  damage: string;
  details: string;
};
export type CharacterSpell = {
  name: string;
  level: number;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: string;
};
export type CharacterAvatar = {
  blob: Blob | null;
  contrast: number;
  gray: number;
  black: number;
  x: number;
  y: number;
  scale: number;
};
export type CharacterType = {
  avatar: CharacterAvatar;
  name: string;
  playerName: string;
  level: number;
  class: string;
  subclass: string;
  species: string;
  size: string;
  speed: number;
  background: string;
  alignment: string;
  armorClass: number;
  hitDice: string;
  hitPoints: number;
  proficiencyBonus: number;
  abilityScores: Record<AbilityType, number>;
  abilityProficiencies: AbilityType[];
  skillProficiencies: Partial<Record<SkillType, ProficiencyType>>;
  languages: string;
  features: {
    feats: string;
    species: string;
    class: string;
  };
  weapons: CharacterWeaponType[];
  spells: CharacterSpell[];
};
export type ProficiencyType = 'none' | 'proficient' | 'double' | 'half';
export type AbilityType = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';
export type SkillType = keyof typeof skillToAbilityMap;

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
