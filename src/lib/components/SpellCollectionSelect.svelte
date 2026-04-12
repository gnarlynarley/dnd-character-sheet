<script lang="ts">
import type { Spell } from "$lib/models/spells";
import Button from "./Button.svelte";
import SpellCollectionSelectModal from "./SpellCollectionSelectModal.svelte";

type Props = {
	onSpellSelection: (spell: Spell) => void;
};

const { onSpellSelection }: Props = $props();

let modalOpen = $state(false);

function openModal() {
	modalOpen = true;
}
function closeModal() {
	modalOpen = false;
}
</script>

<Button onclick={openModal}>Add from collection</Button>
{#if modalOpen}
	<SpellCollectionSelectModal onclose={closeModal} {onSpellSelection} />
{/if}
