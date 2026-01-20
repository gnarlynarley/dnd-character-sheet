<script lang="ts">
  import { characterStore } from '../stores/character';
  import { getImageBitmap } from '../utils';
  import applyContrast from '../utils/canvas/applyContrast';
  import applyGrayTones from '../utils/canvas/applyGrayTones';
  import applyHalftone from '../utils/canvas/applyHalftone';
  import drawImage from '../utils/canvas/drawImage';
  import Border from './Border.svelte';
  import Card from './Card.svelte';

  const image = $derived($characterStore.avatar.image);
  let canvas = $state<HTMLCanvasElement | null>(null);
  let context = $derived(canvas ? canvas.getContext('2d') : null);
  let contrast = $derived($characterStore.avatar.contrast);
  let gray = $derived($characterStore.avatar.gray);
  let black = $derived($characterStore.avatar.black);
  let stringified = $derived(
    `contrast:${contrast},gray:${gray},black:${black}`,
  );

  $effect(() => {
    if (!image || !context || !canvas) return;
    drawImage(canvas, image);
    applyContrast(canvas, contrast);
    applyGrayTones(canvas, context, gray, black);
    applyHalftone(canvas, 5, 30);
  });
</script>

<div class="container">
  <label class="canvas">
    <input
      type="file"
      accept="image/*"
      oninput={async (ev) => {
        const file = ev.currentTarget.files?.[0];
        console.log(file);
        if (file) {
          const bitmap = await getImageBitmap(file);

          $characterStore.avatar.image = bitmap;
        }
      }}
    />
    <canvas bind:this={canvas} width="1000" height="1000"></canvas>
  </label>

  <div class="background">
    <Border absolute />
  </div>

  <div class="controls">
    <Card>
      <div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          bind:value={$characterStore.avatar.contrast}
        />
      </div>
      <div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          bind:value={$characterStore.avatar.gray}
        />
      </div>
      <div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          bind:value={$characterStore.avatar.black}
        />
      </div>
      <textarea value={stringified}></textarea>
    </Card>
  </div>
</div>

<style lang="scss">
  .controls {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 10;
    opacity: 0;

    &:hover {
      opacity: 1;
    }
  }
  .container {
    position: relative;
    aspect-ratio: 1/1;
  }
  .background {
    position: absolute;
    height: 80%;
    width: 100%;
    left: 0;
    bottom: 0;
    height: 100%;
    display: flex;
  }

  .canvas {
    input {
      display: none;
      visibility: hidden;
    }

    canvas {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 1;
      top: 0;
      left: 0;
      filter: url('#pencil');
      mix-blend-mode: multiply;
    }
  }
</style>
