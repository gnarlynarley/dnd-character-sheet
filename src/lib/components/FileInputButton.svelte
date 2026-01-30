<script lang="ts">
  import type { Snippet } from 'svelte';
  import ButtonStyling from './ButtonStyling.svelte';
  import type { ChangeEventHandler } from 'svelte/elements';

  type Props = {
    children?: Snippet;
    accept?: string;
    onchange?: (file: File | null) => void;
  };

  const { children, accept, onchange }: Props = $props();
</script>

<label>
  <ButtonStyling>
    <input
      type="file"
      {accept}
      onchange={(ev) => {
        const file = ev.currentTarget.files?.[0] ?? null;
        onchange?.(file);
        ev.currentTarget.value = '';
      }}
    />
    {@render children?.()}
  </ButtonStyling>
</label>

<style>
  input {
    display: none;
  }
</style>
