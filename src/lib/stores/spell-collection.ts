import type { Spell } from '$lib/models/spells';
import { getSpells } from '$lib/services/spells';
import { readable } from 'svelte/store';

export const spellCollection = readable<Spell[]>([], (set) => {
  getSpells(['XPHB']).then(set);
});
