export type Spell = {
  id: string;
  name: string;
  source: string;
  level: number;
  range: string;
  classes: string[];
  description: string;
};

export type SpellSources = { source: string, name: string }[];
