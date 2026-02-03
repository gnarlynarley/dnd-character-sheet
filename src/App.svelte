<script lang="ts">
  import LoadingBoundary from '$lib/components/LoadingBoundary.svelte';
  import NotificationContainer from '$lib/components/notifications/NotificationContainer.svelte';
  import PencilSVG from '$lib/components/PencilSVG.svelte';
  import SiteFooter from '$lib/components/SiteFooter.svelte';
  import SiteHeader from '$lib/components/SiteHeader.svelte';
  import { routes } from '$lib/routes';
  import Router from 'svelte-spa-router';
</script>

<PencilSVG />
<LoadingBoundary>
  <SiteHeader />
  <main>
    <Router {routes} />
  </main>
  <NotificationContainer />
  <SiteFooter />
</LoadingBoundary>

<style>
  main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding-bottom: var(--gutter);
  }
</style>
