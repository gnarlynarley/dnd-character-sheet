import { createId } from '$lib/utils';
import { writable } from 'svelte/store';

export type Notification = {
  id: string;
  message: string;
};

export const notifications = writable<Notification[]>([]);

export function addNotification(message: string) {
  const notification: Notification = {
    id: createId(),
    message,
  };
  notifications.update((n) => [...n, notification]);
}

export function removeNotification(id: string) {
  notifications.update((n) => n.filter((notif) => notif.id !== id));
}
