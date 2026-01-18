<script lang="ts">
  import { avatarStore } from '../stores/character';
  import applyContrast from '../utils/canvas/applyContrast';
  import applyGrayTones from '../utils/canvas/applyGrayTones';
  import applyHalftone from '../utils/canvas/applyHalftone';
  import drawImage from '../utils/canvas/drawImage';
  import removeBackground from '../utils/canvas/removeBackground';
  import Border from './Border.svelte';
  import Card from './Card.svelte';

  const image = $derived($avatarStore.image);
  let canvas = $state<HTMLCanvasElement | null>(null);
  let context = $derived(canvas ? canvas.getContext('2d') : null);
  let contrast = $derived($avatarStore.contrast);
  let gray = $derived($avatarStore.gray);
  let black = $derived($avatarStore.black);
  let stringified = $derived(
    `contrast:${contrast},gray:${gray},black:${black}`
  );

  $effect(() => {
    if (!image || !context || !canvas) return;
    drawImage(canvas, image);
    removeBackground(canvas);
    applyContrast(canvas, contrast);
    applyGrayTones(canvas, context, gray, black);

    applyHalftone(canvas, 5, 30);
  });
</script>

<div class="container">
  <canvas bind:this={canvas} width="1000" height="1200"></canvas>
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
          bind:value={$avatarStore.contrast}
        />
      </div>
      <div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          bind:value={$avatarStore.gray}
        />
      </div>
      <div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          bind:value={$avatarStore.black}
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
    height: 90%;
    display: flex;
  }
  canvas {
    --offset: 0.2em;
    display: block;
    width: calc(100% - (var(--offset) * 2));
    position: relative;
    z-index: 1;
    bottom: 0.2em;
    left: var(--offset);
    filter: url('#pencil');
  }
</style>
