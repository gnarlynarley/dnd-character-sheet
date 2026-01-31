<script lang="ts">
  import type { CharacterAvatar } from '$lib/models';
  import { AVATAR_HEIGHT, AVATAR_WIDTH } from '../constants';
  import { createImage } from '../utils';
  import applyContrast from '../utils/canvas/applyContrast';
  import applyGrayTones from '../utils/canvas/applyGrayTones';
  import applyHalftone from '../utils/canvas/applyHalftone';
  import drawImage from '../utils/canvas/drawImage';
  import TintedCanvas from './TintedCanvas.svelte';

  type Props = {
    avatar: CharacterAvatar;
    disableEffects?: boolean;
  };

  const { avatar, disableEffects }: Props = $props();
  const blob = $derived(avatar.blob);
  let image = $derived<HTMLImageElement | null>(
    blob ? await createImage(blob) : null,
  );
  let canvas = $state<HTMLCanvasElement | null>(null);
  let context = $state<CanvasRenderingContext2D | null>(null);
  let contrast = $derived(avatar.contrast);
  let gray = $derived(avatar.gray);
  let black = $derived(avatar.black);

  $effect(() => {
    if (!image || !context || !canvas) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawImage(canvas, image, avatar.x, avatar.y, avatar.scale);
    if (!disableEffects) {
      applyContrast(canvas, context, contrast);
      applyGrayTones(canvas, context, gray, black);
      applyHalftone(canvas, context, 4, 45);
    }
  });
</script>

<div class="canvas">
  <TintedCanvas
    bind:canvas
    bind:context
    width={AVATAR_WIDTH}
    height={AVATAR_HEIGHT}
  />
</div>

<style lang="scss">
  .canvas {
    position: relative;
    z-index: 0;
  }
</style>
