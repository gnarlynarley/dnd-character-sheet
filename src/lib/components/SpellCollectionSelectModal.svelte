<script lang="ts">
  import Modal from './Modal.svelte';
  import type { Spell } from '$lib/models/spells';
  import SpellCollectionSelectView from './SpellCollectionSelectView.svelte';

  type Props = {
    onclose: () => void;
    onSpellSelection: (spell: Spell) => void;
  };

  const { onclose, onSpellSelection }: Props = $props();
</script>

<Modal title="Add spell from collection" {onclose} full>
  <SpellCollectionSelectView
    onSpellSelection={(spell) => {
      onSpellSelection(spell);
      onclose();
    }}
  />
</Modal>
