<script>
  import { appSettings, themeOptions } from '$lib/stores/app-settings';
  import BorderLine from './BorderLine.svelte';
  import Select from './Select.svelte';
</script>

<footer>
  <BorderLine />
  <div class="inner">
    <Select
      label="Theme"
      bind:value={$appSettings.theme}
      options={themeOptions}
    />
  </div>
</footer>

<style>
  .inner {
    padding: calc(var(--gutter) * 2) var(--gutter) calc(var(--gutter) * 8);
  }
</style>
