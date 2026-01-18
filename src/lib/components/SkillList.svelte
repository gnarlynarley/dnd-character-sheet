<script lang="ts">
  import { type AbilityType, skillToAbilityMap } from '../models';
  import { entries } from '../utils';
  import AbilityScore from './AbilityScore.svelte';
  import Border from './Border.svelte';
  import BorderLine from './BorderLine.svelte';
  import SkillListLine from './SkillListLine.svelte';

  type Props = {
    ability: AbilityType;
  };

  const { ability }: Props = $props();
  const skills = $derived(
    entries(skillToAbilityMap).flatMap(([skill, a]) => {
      if (ability !== a) return [];
      return { skill, ability: a };
    })
  );
</script>

<Border>
  <div class="inner">
    <AbilityScore {ability} />
    <BorderLine />
    <SkillListLine skill="savingThrow" {ability} />
    {#if skills.length > 0}
      <BorderLine />
      {#each skills as item}
        <SkillListLine skill={item.skill} {ability} />
      {/each}
    {/if}
  </div>
</Border>

<style>
  .inner {
    display: flex;
    flex-direction: column;
    gap: var(--gutter);
  }
</style>
