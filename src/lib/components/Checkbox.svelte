<script lang="ts">
  import { appSettings } from '$lib/stores/app-settings';
  import Border from './Border.svelte';

  type Props = {
    checked: boolean;
  };

  let { checked = $bindable() }: Props = $props();
</script>

<label class="checkbox">
  <Border nopadding absolute transparent small noshadow></Border>
  <input type="checkbox" bind:checked disabled={!$appSettings.edit} />
</label>

<style>
  .checkbox {
    --offset: 0.1em;
    width: 1em;
    height: 1em;
    position: relative;
    background: var(--color-ink);

    &:focus-within {
      outline: 2pt solid var(--color-accent);
      outline-offset: 2pt;
    }

    &:has(input:checked)::after {
      content: '';
      display: block;
      position: absolute;
      width: calc(100% - var(--offset) * 2);
      height: calc(100% - var(--offset) * 2);
      top: var(--offset);
      left: var(--offset);
      background: var(--color-ink);
      border-radius: 0.2em;
      z-index: 1;
    }
  }

  input {
    height: 0;
    opacity: 0;
  }
</style>
