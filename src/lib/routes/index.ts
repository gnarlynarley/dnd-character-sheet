import CharacterMiniSheetPage from './CharacterMiniSheetPage.svelte';
import CharacterSelectPage from './CharacterSelectPage.svelte';
import CharacterSheetPage from './CharacterSheetPage.svelte';
import GridGeneratorPage from './GridGeneratorPage.svelte';
import SpellPage from './SpellPage.svelte';

export const links = {
  characterSelect: () => '/',
  characterSheet: (slug: string) => `/sheet/${slug}`,
  characterMiniSheet: (slug: string) => `/sheet/mini/${slug}`,
  gridGenerator: () => '/generate-grid',
  spells: () => '/spells',
};

export const routes = {
  [links.characterSelect()]: CharacterSelectPage,
  [links.characterSheet(':slug')]: CharacterSheetPage,
  [links.characterMiniSheet(':slug')]: CharacterMiniSheetPage,
  [links.gridGenerator()]: GridGeneratorPage,
  [links.spells()]: SpellPage,
};
