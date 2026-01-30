<script lang="ts">
  import type { CharacterType } from '$lib/models';
  import { links } from '$lib/routes';
  import AvatarImage from './AvatarImage.svelte';
  import Border from './Border.svelte';
  import BorderLine from './BorderLine.svelte';
  import Button from './Button.svelte';
  import ButtonStyling from './ButtonStyling.svelte';
  import Card from './Card.svelte';
  import Flex from './Flex.svelte';
  import FlexPush from './FlexPush.svelte';
  import { link } from 'svelte-spa-router';

  type Props = {
    character: CharacterType;
    onDelete?: () => void;
  };

  const { character, onDelete }: Props = $props();
</script>

<Card title={character.name}>
  <Flex column>
    <Border nopadding noshadow small>
      <AvatarImage avatar={character.avatar} />
    </Border>
    <Flex column>
      <p>Level: {character.level}</p>
      <p>
        {#if character.class}
          <span>Class: {character.class}</span>
        {/if}
        {#if character.subclass}
          <span> ({character.subclass})</span>
        {/if}
      </p>
    </Flex>
    <FlexPush />
    <BorderLine />
    <div class="bottom">
      <Flex justify="start">
        <a href={links.characterSheet(character.slug)} use:link>
          <ButtonStyling>
            <span>View Sheet </span>
          </ButtonStyling>
        </a>
        {#if onDelete}
          <Button onclick={onDelete}>Delete</Button>
        {/if}
      </Flex>
    </div>
  </Flex>
</Card>

<style>
  .bottom {
    justify-self: flex-end;
  }
</style>
