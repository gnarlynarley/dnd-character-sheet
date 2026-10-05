<script lang="ts">
	import { appSettings } from '$lib/stores/app-settings';
	import type { CharacterSvelteStore } from '$lib/stores/character';
	import Button from './Button.svelte';
	import Checkbox from './Checkbox.svelte';
	import Flex from './Flex.svelte';
	import Input from './Input.svelte';
	import Markdown from './Markdown.svelte';
	import MarkdownEditor from './MarkdownEditor.svelte';
	import { Table, TableRow, TableCell } from './table';

	type Props = {
		character: CharacterSvelteStore;
	};

	let { character }: Props = $props();

	function deleteSpell(index: number) {
		character.update((char) => {
			char.spells.splice(index, 1);
			return char;
		});
	}
</script>

<Table fillCell={5}>
	<TableRow>
		<TableCell>
			<span>Prepared</span>
		</TableCell>
		<TableCell>
			<span>Spell Name</span>
		</TableCell>
		<TableCell>
			<span>Spell Level</span>
		</TableCell>
		<TableCell>
			<span>Range</span>
		</TableCell>
		<TableCell>
			<span>Notes</span>
		</TableCell>
	</TableRow>
	{#each $character.spells as spell, index (spell.id)}
		<TableRow>
			<TableCell>
				<Checkbox bind:checked={spell.prepared} />
			</TableCell>
			<TableCell>
				<div class="value">
					<Input type="text" bind:value={spell.name} />
				</div>
			</TableCell>
			<TableCell>
				<div class="value">
					<Input type="number" bind:value={spell.level} displayValue={spell.level || 'Cantrip'} />
				</div>
			</TableCell>
			<TableCell>
				<div class="value">
					<Input type="text" bind:value={spell.range} />
				</div>
			</TableCell>
			<TableCell>
				<div class="value">
					<Input type="text" bind:value={spell.notes} />
				</div>
			</TableCell>
		</TableRow>
		{#if $appSettings.edit}
			<TableRow>
				<TableCell spread>
					<Flex padding column>
						<Checkbox label="Show description" bind:checked={spell.showDescription} />
						<MarkdownEditor bind:code={spell.description} />
					</Flex>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell>
					<TableCell>
						<Button onclick={() => deleteSpell(index)}>delete</Button>
					</TableCell>
				</TableCell>
			</TableRow>
		{:else if spell.showDescription && spell.description.trim()}
			<TableRow>
				<TableCell spread>
					<Flex padding column>
						<Markdown code={spell.description} />
					</Flex>
				</TableCell>
			</TableRow>
		{/if}
	{/each}
</Table>
