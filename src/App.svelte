<script lang="ts">
  import NotificationContainer from '$lib/components/notifications/NotificationContainer.svelte';
  import PencilSVG from '$lib/components/PencilSVG.svelte';
  import SiteHeader from '$lib/components/SiteHeader.svelte';
  import { routes } from '$lib/routes';
  import Router from 'svelte-spa-router';
</script>

<main>
  <SiteHeader />
  <Router {routes} />
  <PencilSVG />
  <NotificationContainer />
</main>
