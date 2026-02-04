<script>
  import {} from 'svelte-spa-router';
  import BorderLine from './BorderLine.svelte';
  import { links } from '$lib/routes';
  import Link from './Link.svelte';
  import Flex from './Flex.svelte';
  import FlexPush from './FlexPush.svelte';

  const navigationLinks = [
    {
      href: links.characterSelect(),
      label: 'Character select',
    },
    {
      href: links.gridGenerator(),
      label: 'Grid generator',
    },
    {
      href: links.spells(),
      label: 'Spells',
    },
  ];
</script>

<header class="hide-print">
  <div class="inner">
    <Flex align="center">
      <h1>
        <Link href={links.characterSelect()}>D&D Character Sheet creator</Link>
      </h1>

      <FlexPush />

      <nav>
        {#each navigationLinks as { href, label }}
          <Link {href}>{label}</Link>
        {/each}
      </nav>
    </Flex>
  </div>

  <BorderLine />
</header>

<style lang="scss">
  header {
    margin-bottom: var(--gutter);
  }

  .inner {
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
