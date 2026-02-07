<script lang="ts">
  import Dots from './Dots.svelte';
  import Flex from './Flex.svelte';

  type Props = {
    label?: string;
  };

  const { label }: Props = $props();
</script>

<Flex column sm>
  <Dots amount={3} />
  <div class="label">{label}</div>
</Flex>
