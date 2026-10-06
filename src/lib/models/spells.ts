export type Spell = {
	id: string;
	name: string;
	source: string;
	level: number;
	range: string;
	classes: string[];
	description: string;
	vocal: boolean;
	somatic: boolean;
	material: string | null;
};

export type SpellSources = { source: string; name: string }[];
