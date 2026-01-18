<script lang="ts">
  type Props = { spread?: boolean; vertical?: boolean };

  const { spread, vertical }: Props = $props();
</script>

<div class:spread class:vertical></div>

<style>
  div {
    filter: url('#pencil');

    &.spread {
      margin-left: calc(var(--gutter) * -1);
      width: calc(100% + (var(--gutter) * 2));
    }

    &:not(.vertical) {
      border-top: var(--border-sm);
      width: 100%;
    }

    &.vertical {
      border-left: var(--border-sm);
      height: 100%;
    }
  }
</style>
