<script>
import { appSettings, themeOptions } from "$lib/stores/app-settings";
import BorderLine from "./BorderLine.svelte";
import Select from "./Select.svelte";
</script>

<footer class="hide-print">
	<BorderLine faded />
	<div class="inner">
		<Select
			label="Theme"
			bind:value={$appSettings.theme}
			options={themeOptions}
		/>
	</div>
</footer>

<style>
footer {
	margin-top: var(--gutter);
}

.inner {
	padding: calc(var(--gutter) * 2) var(--gutter) calc(var(--gutter) * 8);
}
</style>
