<script lang="ts">
  import type { Snippet } from "svelte";
  import Border from "./Border.svelte";
  import BorderLine from "./BorderLine.svelte";
  import Grid from "./Grid.svelte";

  type Props = {
    title?: string;
    grid?: boolean;
    children?: Snippet;
  };

  const { title, children, grid }: Props = $props();
</script>

<Border {grid} nopadding>
  <div class="inner">
    {#if title}
      <h1>{title}</h1>
      <BorderLine />
    {/if}
    {#if children}
      <div class="children">
        {#if grid}
          <Grid>
            {@render children()}
          </Grid>
        {:else}
          <div class="padding">
            {@render children()}
          </div>
        {/if}
      </div>
    {/if}
  </div>
</Border>

<style>
  .inner {
    display: flex;
    flex-direction: column;
    height: 100%;
    flex-grow: 1;
  }

  .children {
    flex-grow: 1;
    display: flex;

    > :global(*) {
      flex-grow: 1;
    }
  }

  .padding {
    padding: var(--gutter);
  }

  h1 {
    text-align: center;
    background: var(--color-paper);
    padding: calc(var(--gutter) * 0.2) var(--gutter);
  }
</style>
