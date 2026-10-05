<script lang="ts">
	import { appSettings } from '$lib/stores/app-settings';

	type Props = { rounded?: boolean; fit?: boolean; placeholder?: string } & (
		| {
				type: 'text';
				value?: string;
				displayValue?: string;
		  }
		| {
				type: 'number';
				value: number | null;
				displayValue?: number | string;
		  }
	);

	let { value = $bindable(), displayValue, type, rounded, fit, placeholder }: Props = $props();
	const edit = $derived($appSettings.edit);
</script>

{#if edit}
	<input class:is-fit={fit} class:is-rounded={rounded} {type} bind:value {placeholder} />
{:else}
	<div>{displayValue ?? value}</div>
{/if}

<style>
	div,
	input {
		text-align: inherit;
		flex-shrink: 1;
		flex-grow: 1;
		min-width: fit-content;
		min-height: 1.4em;

		&.is-rounded {
			border-radius: 50%;
		}

		&.is-fit {
			field-sizing: content;
		}
	}
</style>
