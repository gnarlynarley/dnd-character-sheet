<script lang="ts">
import { appSettings } from "$lib/stores/app-settings";

type Props =
	| {
			type: "text";
			value?: string;
			displayValue?: string;
	  }
	| {
			type: "number";
			value: number;
			displayValue?: number | string;
	  };

let { value = $bindable(), displayValue, type }: Props = $props();
const edit = $derived($appSettings.edit);
</script>

{#if edit}
	<input {type} bind:value>
{:else}
	<div>{displayValue ?? value}</div>
{/if}

<style>
div,
input {
	text-align: inherit;
	flex-shrink: 1;
	min-width: fit-content;
	width: 100%;
	min-height: 1.4em;
}
</style>
