<script>
  import {} from 'svelte-spa-router';
  import BorderLine from './BorderLine.svelte';
  import { links } from '$lib/routes';
  import Link from './Link.svelte';

  const navigationLinks = [
    {
      href: links.characterSelect(),
      label: 'Character select',
    },
    {
      href: links.gridGenerator(),
      label: 'Grid generator',
    },
  ];
</script>

<header class="hide-print">
  <div class="inner">
    <h1>
      <Link href={links.characterSelect()}>D&D Character Sheet creator</Link>
    </h1>

    <nav>
      {#each navigationLinks as { href, label }}
        <Link {href}>{label}</Link>
      {/each}
    </nav>
  </div>
  <BorderLine />
</header>

<style lang="scss">
  header {
    margin-bottom: var(--gutter);
  }

  .inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: calc(var(--gutter) * 2) var(--gutter);
  }

  nav {
    display: flex;
    gap: var(--gutter);

    :global(.active) {
      font-weight: bold;
    }
  }
</style>
