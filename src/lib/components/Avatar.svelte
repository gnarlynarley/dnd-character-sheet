<script lang="ts">
  import { appSettings } from '$lib/stores/app-settings';
  import { AVATAR_HEIGHT, AVATAR_WIDTH } from '../constants';
  import { type CharacterSvelteStore } from '../stores/character';
  import getCropDetails from '../utils/canvas/getCropDetails';
  import AvatarImage from './AvatarImage.svelte';
  import Border from './Border.svelte';
  import Card from './Card.svelte';
  import Flex from './Flex.svelte';

  type Props = {
    character: CharacterSvelteStore;
  };

  const { character }: Props = $props();

  let editEnabled = $derived($appSettings.edit);
  let container = $state<HTMLDivElement | null>(null);

  let panning: {
    x: number;
    y: number;
    pointerX: number;
    pointerY: number;
  } | null = $state(null);

  function startPan(ev: PointerEvent) {
    if (!editEnabled) return;
    panning = {
      x: $character.avatar.x,
      y: $character.avatar.y,
      pointerX: ev.clientX,
      pointerY: ev.clientY,
    };
  }
  function onPanning(ev: PointerEvent) {
    if (!editEnabled) return;
    if (!panning) return;
    if (!container) return;
    const relativeX = ev.clientX - panning.pointerX;
    const relativeY = ev.clientY - panning.pointerY;
    const canvasScale =
      (AVATAR_HEIGHT / AVATAR_WIDTH) * $character.avatar.scale;
    $character.avatar.x = panning.x + relativeX * canvasScale;
    $character.avatar.y = panning.y + relativeY * canvasScale;
  }
  function endPan() {
    if (!editEnabled) return;
    panning = null;
  }
  function onzoom(ev: WheelEvent) {
    if (!editEnabled) return;
    ev.preventDefault();
    if (!container) return;

    const oldScale = $character.avatar.scale;
    const newScale = Math.min(Math.max(0.1, oldScale - ev.deltaY / 1000), 10);

    // Mouse position
    const rect = container.getBoundingClientRect();
    const mouseX = ev.clientX - rect.left;
    const mouseY = ev.clientY - rect.top;

    // Convert mouse coordinates
    const canvasMouseX = (mouseX / container.offsetWidth) * AVATAR_WIDTH;
    const canvasMouseY = (mouseY / container.offsetHeight) * AVATAR_HEIGHT;

    // Calculate the point in the image space that the mouse is over
    const imagePointX = (canvasMouseX - $character.avatar.x) / oldScale;
    const imagePointY = (canvasMouseY - $character.avatar.y) / oldScale;

    $character.avatar.scale = newScale;
    $character.avatar.x = canvasMouseX - imagePointX * newScale;
    $character.avatar.y = canvasMouseY - imagePointY * newScale;
  }
</script>

<svelte:window onmouseup={endPan} onpointermove={onPanning} />

<Border nopadding>
  <div class="container">
    <div
      bind:this={container}
      class="canvas"
      onpointerdown={startPan}
      onwheel={onzoom}
    >
      <AvatarImage
        avatar={$character.avatar}
        disableEffects={panning !== null}
      />
    </div>

    {#if $appSettings.edit}
      <div class="controls">
        <Card>
          <Flex column sm>
            <div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                bind:value={$character.avatar.contrast}
              />
            </div>
            <div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                bind:value={$character.avatar.gray}
              />
            </div>
            <div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                bind:value={$character.avatar.black}
              />
            </div>
            <input
              type="file"
              accept="image/*"
              oninput={async (ev) => {
                const file = ev.currentTarget.files?.[0];
                if (file) {
                  const crop = await getCropDetails(
                    file,
                    AVATAR_WIDTH,
                    AVATAR_HEIGHT,
                  );
                  $character.avatar.blob = file;
                  $character.avatar.x = crop.x;
                  $character.avatar.y = crop.y;
                  $character.avatar.scale = crop.scale;
                }
                ev.currentTarget.value = '';
              }}
            />
          </Flex>
        </Card>
      </div>
    {/if}
  </div>
</Border>

<style lang="scss">
  .controls {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 1;
  }
  .container {
    position: relative;
  }
</style>
