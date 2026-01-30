import CharacterSelectPage from './CharacterSelectPage.svelte';
import CharacterSheetPage from './CharacterSheetPage.svelte';
import GridGeneratorPage from './GridGeneratorPage.svelte';

export const links = {
  characterSelect: () => '/',
  characterSheet: (slug: string) => `/sheet/${slug}`,
  gridGenerator: () => '/generate-grid',
};

export const routes = {
  [links.characterSelect()]: CharacterSelectPage,
  [links.characterSheet(':slug')]: CharacterSheetPage,
  [links.gridGenerator()]: GridGeneratorPage,
};
