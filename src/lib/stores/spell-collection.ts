import { readable } from "svelte/store";
import type { Spell } from "$lib/models/spells";
import { getSpells } from "$lib/services/spells";

export const spellCollection = readable<Spell[]>([], (set) => {
	getSpells(["XPHB"]).then(set);
});
