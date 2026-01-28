<script lang="ts">
  import PencilSVG from '$lib/components/PencilSVG.svelte';
  import SiteHeader from '$lib/components/SiteHeader.svelte';
  import { routes } from '$lib/routes';
  import Router from 'svelte-spa-router';
</script>

<SiteHeader />
<Router {routes} />
<PencilSVG />
