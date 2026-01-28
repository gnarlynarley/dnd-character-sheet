<script>
  import { link } from 'svelte-spa-router';
  import BorderLine from './BorderLine.svelte';
</script>

<header class="hide-print">
  <div class="inner">
    <h1>D&D Character Sheet creator</h1>

    <nav>
      <a href="/" use:link>Character select</a>
    </nav>
  </div>
  <BorderLine />
</header>

<style>
  .inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: calc(var(--gutter) * 2) var(--gutter);
  }

  nav {
    display: flex;
    gap: var(--gutter);
  }
</style>
