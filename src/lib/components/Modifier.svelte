<script lang="ts">
  import { parseModifier } from '../utils';

  type Props = {
    modifier: number;
  };

  const { modifier }: Props = $props();
  const parsed = $derived(parseModifier(modifier));
</script>

{parsed}
