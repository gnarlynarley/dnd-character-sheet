<script lang="ts">
  import type { CharacterAvatar } from '$lib/models';
  import applyTransparency from '$lib/utils/canvas/applyTransparency';
  import { AVATAR_HEIGHT, AVATAR_WIDTH } from '../constants';
  import { createImage } from '../utils';
  import applyContrast from '../utils/canvas/applyContrast';
  import applyGrayTones from '../utils/canvas/applyGrayTones';
  import applyHalftone from '../utils/canvas/applyHalftone';
  import drawImage from '../utils/canvas/drawImage';

  type Props = {
    avatar: CharacterAvatar;
    disableEffects?: boolean;
  };

  const { avatar, disableEffects }: Props = $props();
  const blob = $derived(avatar.blob);
  let image = $state<HTMLImageElement | null>(null);
  let canvas = $state<HTMLCanvasElement | null>(null);
  let context = $derived(
    canvas ? canvas.getContext('2d', { willReadFrequently: true }) : null,
  );
  let contrast = $derived(avatar.contrast);
  let gray = $derived(avatar.gray);
  let black = $derived(avatar.black);

  $effect(() => {
    if (blob) {
      createImage(blob).then((result) => {
        image = result;
      });
    } else {
      image = null;
    }
  });

  $effect(() => {
    if (!image || !context || !canvas) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawImage(canvas, image, avatar.x, avatar.y, avatar.scale);
    if (!disableEffects) {
      applyContrast(canvas, context, contrast);
      applyGrayTones(canvas, context, gray, black);
      applyHalftone(canvas, context, 2.5, 30);
      applyTransparency(canvas, context);
    }
  });
</script>

<div class="canvas">
  <canvas bind:this={canvas} width={AVATAR_WIDTH} height={AVATAR_HEIGHT}>
  </canvas>
</div>

<style lang="scss">
  .canvas {
    position: relative;

    canvas {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 1;
      top: 0;
      left: 0;
      background-color: var(--color-paper);

      // @media screen and (prefers-color-scheme: dark) {
      //   background-color: var(--color-ink);
      // }
    }
  }
</style>
