<script lang="ts">
  import AvatarImage from '$lib/components/AvatarImage.svelte';
  import Border from '$lib/components/Border.svelte';
  import BorderLine from '$lib/components/BorderLine.svelte';
  import Button from '$lib/components/Button.svelte';
  import DeathSave from '$lib/components/DeathSave.svelte';
  import Flex from '$lib/components/Flex.svelte';
  import FlexPush from '$lib/components/FlexPush.svelte';
  import OverlayBox from '$lib/components/OverlayBox.svelte';
  import PageTitle from '$lib/components/PageTitle.svelte';
  import Table from '$lib/components/Table.svelte';
  import { loadCharacterData } from '$lib/stores/character';
  import { addNotification } from '$lib/stores/notifications';
  import { downloadBlob } from '$lib/utils';
  import { screenshotElement } from '$lib/utils/screenshotElement';
  import { link } from 'svelte-spa-router';

  type Params = {
    slug: string;
  };
  type Props = {
    params: Params;
  };
  const { params }: Props = $props();
  let characterData = $derived(await loadCharacterData(params.slug));
  let wrapper = $state<HTMLDivElement | null>(null);

  async function screenshot() {
    try {
      if (!wrapper) return;
      if (!characterData) return;
      const canvas = await screenshotElement(wrapper);
      const blob = await new Promise<Blob | null>((r) =>
        canvas.toBlob(r, 'image/png'),
      );
      if (!blob) throw new Error("Couldn't retrieve blob");
      await downloadBlob(blob, `Mini sheet ${characterData.name}.png`);
    } catch {
      addNotification('Something went wrong downloading the image.');
    }
  }
</script>

<PageTitle title={characterData ? `${characterData.name}` : 'Not Found'} />

{#if characterData}
  <Flex column align="center">
    <div class="wrapper" bind:this={wrapper}>
      <Border>
        <Flex column>
          <h1>{characterData.name}</h1>
          <Flex>
            <Border small noshadow nopadding>
              <AvatarImage avatar={characterData.avatar} />
            </Border>
            <Flex column>
              <Border flex small noshadow>
                <Flex column>
                  <p>Damage taken</p>
                  <FlexPush />
                  <BorderLine />
                </Flex>
              </Border>
              <Border flex small noshadow>
                <Flex column>
                  <p>Temp. HP</p>
                  <FlexPush />
                  <BorderLine />
                </Flex>
              </Border>
              <Flex column sm>
                <p>Death saves:</p>
                <FlexPush />
                <DeathSave label="Success" />
                <DeathSave label="Failures" />
              </Flex>
            </Flex>
          </Flex>
          {#if characterData.spells.length > 0 && characterData.spellSlots.length > 0}
            <Table>
              <Table row>
                <Table cell right>
                  <span>Level</span>
                </Table>
                <Table cell>
                  <span>Slots</span>
                </Table>
              </Table>
              {#each characterData.spellSlots as spellSlot}
                <Table row>
                  <Table cell right>
                    {spellSlot.level}
                  </Table>
                  <Table cell>
                    <Flex sm>
                      {#each Array.from({ length: spellSlot.amount }) as index}
                        <div class="dot"></div>
                      {/each}
                    </Flex>
                  </Table>
                </Table>
              {/each}
            </Table>
          {/if}
        </Flex>
      </Border>
    </div>

    <Button onclick={screenshot}>Download</Button>
  </Flex>
{:else}
  <h1>
    No character found for slug: <code>{params.slug}</code>
  </h1>
  <a href="/" use:link>Go back to character select</a>
{/if}

<style>
  .wrapper {
    max-width: 500px;
  }

  .dot {
    width: 1.4em;
    height: 1.4em;
    border: var(--border-size) solid currentColor;
    border-radius: 50%;
    filter: url('#pencil');
  }

  h1 {
    text-align: center;
    white-space: balanced;
  }

  p {
    text-wrap: nowrap;
  }
</style>
