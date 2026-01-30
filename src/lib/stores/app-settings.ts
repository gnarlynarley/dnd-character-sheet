import { writable } from 'svelte/store';

export type AppThemeType = 'light' | 'dark' | 'automatic';

type AppSettingsType = {
  edit: boolean;
  theme: AppThemeType;
  hasChanges: boolean;
};

export const appSettings = writable<AppSettingsType>({
  edit: false,
  theme: 'automatic',
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
});
