import { writable } from 'svelte/store';

export type AppThemeType = 'light' | 'dark' | 'automatic';

type AppSettingsType = {
  edit: boolean;
  theme: AppThemeType;
};

export const appSettings = writable<AppSettingsType>({
  edit: false,
  theme: 'automatic',
});
