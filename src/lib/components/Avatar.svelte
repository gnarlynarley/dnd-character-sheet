<script lang="ts">
  import { AVATAR_HEIGHT, AVATAR_WIDTH } from '../constants';
  import { characterStore } from '../stores/character';
  import { createImage } from '../utils';
  import applyContrast from '../utils/canvas/applyContrast';
  import applyGrayTones from '../utils/canvas/applyGrayTones';
  import applyHalftone from '../utils/canvas/applyHalftone';
  import drawImage from '../utils/canvas/drawImage';
  import getCropDetails from '../utils/canvas/getCropDetails';
  import Border from './Border.svelte';
  import Card from './Card.svelte';

  const blob = $derived($characterStore.avatar.blob);
  let image = $state<HTMLImageElement | null>(null);
  let canvas = $state<HTMLCanvasElement | null>(null);
  let context = $derived(canvas ? canvas.getContext('2d') : null);
  let contrast = $derived($characterStore.avatar.contrast);
  let gray = $derived($characterStore.avatar.gray);
  let black = $derived($characterStore.avatar.black);

  let panning: {
    x: number;
    y: number;
    pointerX: number;
    pointerY: number;
  } | null = $state(null);

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
    drawImage(
      canvas,
      image,
      $characterStore.avatar.x,
      $characterStore.avatar.y,
      $characterStore.avatar.scale,
    );
    if (panning === null) {
      applyContrast(canvas, contrast);
      applyGrayTones(canvas, context, gray, black);
      applyHalftone(canvas, 6, 30);
    }
  });

  function startPan(ev: PointerEvent) {
    panning = {
      x: $characterStore.avatar.x,
      y: $characterStore.avatar.y,
      pointerX: ev.clientX,
      pointerY: ev.clientY,
    };
  }
  function onPanning(ev: PointerEvent) {
    if (!panning) return;
    if (!canvas) return;
    const relativeX = ev.clientX - panning.pointerX;
    const relativeY = ev.clientY - panning.pointerY;
    const canvasScale =
      (canvas.width / canvas.offsetWidth) * $characterStore.avatar.scale;
    $characterStore.avatar.x = panning.x + relativeX * canvasScale;
    $characterStore.avatar.y = panning.y + relativeY * canvasScale;
  }
  function endPan() {
    panning = null;
  }
  function onzoom(ev: WheelEvent) {
    ev.preventDefault();
    if (!canvas) return;

    const oldScale = $characterStore.avatar.scale;
    const newScale = oldScale - ev.deltaY / 1000;

    // Mouse position
    const rect = canvas.getBoundingClientRect();
    const mouseX = ev.clientX - rect.left;
    const mouseY = ev.clientY - rect.top;

    // Convert mouse coordinates
    const canvasMouseX = (mouseX / canvas.offsetWidth) * canvas.width;
    const canvasMouseY = (mouseY / canvas.offsetHeight) * canvas.height;

    // Calculate the point in the image space that the mouse is over
    const imagePointX = (canvasMouseX - $characterStore.avatar.x) / oldScale;
    const imagePointY = (canvasMouseY - $characterStore.avatar.y) / oldScale;

    $characterStore.avatar.scale = newScale;
    $characterStore.avatar.x = canvasMouseX - imagePointX * newScale;
    $characterStore.avatar.y = canvasMouseY - imagePointY * newScale;
  }
</script>

<svelte:window onmouseup={endPan} onpointermove={onPanning} />

<div class="container">
  <div class="canvas">
    <canvas
      bind:this={canvas}
      width={AVATAR_WIDTH}
      height={AVATAR_HEIGHT}
      onpointerdown={startPan}
      onwheel={onzoom}
    >
    </canvas>
  </div>

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
            $characterStore.avatar.blob = file;
            $characterStore.avatar.x = crop.x;
            $characterStore.avatar.y = crop.y;
            $characterStore.avatar.scale = crop.scale;
          }
          ev.currentTarget.value = '';
        }}
      />
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
    position: relative;
    background: red;

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
