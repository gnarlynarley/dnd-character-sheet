<script lang="ts">
  import LoadingBoundary from '$lib/components/LoadingBoundary.svelte';
  import NotificationContainer from '$lib/components/notifications/NotificationContainer.svelte';
  import PencilSVG from '$lib/components/PencilSVG.svelte';
  import SiteHeader from '$lib/components/SiteHeader.svelte';
  import { routes } from '$lib/routes';
  import Router from 'svelte-spa-router';
</script>

<main>
  <LoadingBoundary>
    <SiteHeader />
    <Router {routes} />
    <PencilSVG />
    <NotificationContainer />
  </LoadingBoundary>
</main>

<style>
  main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>
