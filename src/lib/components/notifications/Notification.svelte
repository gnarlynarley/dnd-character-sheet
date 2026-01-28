<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import {
    type Notification,
    removeNotification,
  } from '$lib/stores/notifications';
  import Border from '../Border.svelte';

  const notificationDuration = 4000;

  type Props = {
    notification: Notification;
  };
  const { notification }: Props = $props();
  let hovered = $state(false);

  function remove() {
    removeNotification(notification.id);
  }

  function onmouseenter() {
    hovered = true;
  }

  function onmouseleave() {
    hovered = false;
  }

  $effect(() => {
    if (hovered) return;
    const timeout = setTimeout(() => {
      removeNotification(notification.id);
    }, notificationDuration);

    return () => {
      clearTimeout(timeout);
    };
  });
</script>

<button
  type="button"
  class="container"
  in:fly={{ y: 100, duration: 300 }}
  out:fade={{ duration: 300 }}
  onclick={remove}
  {onmouseenter}
  {onmouseleave}
>
  <Border>
    <div class="message">{notification.message}</div>
  </Border>
</button>
