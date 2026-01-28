<script lang="ts">
  import { notifications } from '$lib/stores/notifications';
  import Notification from './Notification.svelte';
</script>

<div class="container hide-print">
  {#each $notifications as notification (notification.id)}
    <div class="notification">
      <Notification {notification} />
    </div>
  {/each}
</div>

<style>
  .container {
    position: fixed;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: var(--gutter);
    gap: var(--gutter);
    z-index: 9999;
  }
</style>
