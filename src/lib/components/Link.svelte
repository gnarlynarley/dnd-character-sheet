<script lang="ts">
  import { appSettings } from '$lib/stores/app-settings';
  import type { Snippet } from 'svelte';
  import { push } from 'svelte-spa-router';
  import active from 'svelte-spa-router/active';

  type Props = {
    href: string;
    children?: Snippet;
  };

  const { href, children }: Props = $props();
  const hasChanges = $derived($appSettings.hasChanges);

  function onclick(ev: Event) {
    ev.preventDefault();
    const navigate = hasChanges
      ? window.confirm(
          'There are unsaved changed, these will get lost if you continue',
        )
      : true;
    if (navigate) {
      push(href);
    }
  }
</script>

<a {href} use:active {onclick}>
  {@render children?.()}
</a>
