import { createId } from '$lib/utils';
import { writable } from 'svelte/store';

export type Notification = {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'error';
};

export const notifications = writable<Notification[]>([]);

export function addNotification(
  message: string,
  type: 'info' | 'warning' | 'error' = 'info',
) {
  const notification: Notification = {
    id: createId(),
    message,
    type,
  };
  notifications.update((n) => [...n, notification]);
}

export function removeNotification(id: string) {
  notifications.update((n) => n.filter((notif) => notif.id !== id));
}
