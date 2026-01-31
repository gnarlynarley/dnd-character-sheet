<script lang="ts">
  type Props = {
    title: string;
  };

  const { title }: Props = $props();
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>
