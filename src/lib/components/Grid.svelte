<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    children?: Snippet;
  };

  const { children }: Props = $props();
</script>

<div class="grid">
  <div class="inner">
    {@render children?.()}
  </div>
</div>

<style lang="scss">
  .grid {
    position: relative;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: var(--gutter);
    z-index: 0;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(
          var(--color-faded) 0.1em,
          transparent 0.1em
        ),
        linear-gradient(90deg, var(--color-faded) 0.1em, transparent 0.1em);
      background-size: 1em 1em;
      filter: url("#pencil");
      z-index: -1;
    }

    > :global(*) {
      flex-grow: 1;
    }
  }

  .inner {
    position: relative;
    z-index: 1;
  }
</style>
