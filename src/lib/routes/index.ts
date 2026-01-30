import CharacterSelectPage from './CharacterSelectPage.svelte';
import CharacterSheetPage from './CharacterSheetPage.svelte';

export const links = {
  characterSelect: () => '/',
  characterSheet: (slug: string) => `/sheet/${slug}`,
};

export const routes = {
  [links.characterSelect()]: CharacterSelectPage,
  [links.characterSheet(':slug')]: CharacterSheetPage,
};
