import CharacterSelectPage from './CharacterSelectPage.svelte';
import CharacterSheetPage from './CharacterSheetPage.svelte';

export const routes = {
  '/': CharacterSelectPage,
  '/character/:slug': CharacterSheetPage,
};
