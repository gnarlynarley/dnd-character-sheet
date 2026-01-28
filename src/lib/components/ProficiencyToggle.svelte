<script lang="ts">
  import type { ProficiencyType } from '../models';

  type Props = {
    value?: ProficiencyType;
  };

  let { value = $bindable() }: Props = $props();

  const PROFICIENCY_ORDER: ProficiencyType[] = [
    'none',
    'proficient',
    'double',
    'half',
  ];

  function onClick() {
    const index = PROFICIENCY_ORDER.indexOf(value ?? 'none');
    const nextIndex = (index + 1) % PROFICIENCY_ORDER.length;
    value = PROFICIENCY_ORDER[nextIndex];
  }
</script>

<button
  aria-label="Proficiency"
  onclick={onClick}
  class:is-proficient={value === 'proficient'}
  class:is-double={value === 'double'}
  class:is-half={value === 'half'}
></button>

<style lang="scss">
  button {
    width: 2em;
    height: 2em;
    display: flex;
    display: block;
    flex-shrink: 0;
    position: relative;
    filter: url(#pencil);
    background-color: var(--color-editable);
    outline: var(--color-editable) 0.3em solid;

    &::before,
    &::after {
      position: absolute;
      content: '';
      display: block;
      width: 1.6em;
      height: 1.6em;
      background: var(--color-paper);
      background-color: var(--color-editable);
      border-radius: 50%;
      border: var(--border);
    }

    &::before {
      top: 0;
      left: 0;
      width: 1.4em;
      height: 1.4em;
    }

    &::after {
      bottom: 0;
      right: 0;
    }

    &.is-half,
    &.is-double {
      &::before {
        background-color: var(--color-ink);
      }
    }
    &.is-proficient,
    &.is-double {
      &::after {
        background-color: var(--color-ink);
      }
    }
  }
</style>
