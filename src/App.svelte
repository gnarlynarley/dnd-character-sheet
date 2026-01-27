<script lang="ts">
  import PencilSVG from '$lib/components/PencilSVG.svelte';
  import { routes } from '$lib/routes';
  import Router from 'svelte-spa-router';
</script>

<Router {routes} />
<PencilSVG />
