import { writable } from 'svelte/store';
import * as v from 'valibot';

export const themeOptions = [
  'light' as 'light',
  'dark' as 'dark',
  'automatic' as 'automatic',
];
const themeSchema = v.fallback(v.picklist(themeOptions), 'automatic');

export type AppTheme = v.InferOutput<typeof themeSchema>;

type AppSettingsType = {
  edit: boolean;
  theme: AppTheme;
  hasChanges: boolean;
};

export const appSettings = writable<AppSettingsType>({
  edit: false,
  theme: v.parse(themeSchema, localStorage.getItem('theme')),
  hasChanges: false,
});

appSettings.subscribe((value) => {
  if (value.hasChanges) {
    window.onbeforeunload = () => {
      return 'There are unsaved changed, these will get lost if you continue';
    };
  } else {
    window.onbeforeunload = null;
  }

  console.log('theme changed');
  document.documentElement.classList.remove('dark-mode');
  document.documentElement.classList.remove('light-mode');
  if (value.theme === 'light') {
    document.documentElement.classList.add('light-mode');
  }
  if (value.theme === 'dark') {
    document.documentElement.classList.add('dark-mode');
  }
  localStorage.setItem('theme', value.theme);
});
