<script lang="ts">
  import { AVATAR_HEIGHT, AVATAR_WIDTH } from '../constants';
  import { character } from '../stores/character';
  import { createImage } from '../utils';
  import applyContrast from '../utils/canvas/applyContrast';
  import applyGrayTones from '../utils/canvas/applyGrayTones';
  import applyHalftone from '../utils/canvas/applyHalftone';
  import drawImage from '../utils/canvas/drawImage';
  import getCropDetails from '../utils/canvas/getCropDetails';
  import Border from './Border.svelte';
  import Card from './Card.svelte';
  import Flex from './Flex.svelte';

  const blob = $derived($character.avatar.blob);
  let editEnabled = $state(false);
  let image = $state<HTMLImageElement | null>(null);
  let canvas = $state<HTMLCanvasElement | null>(null);
  let context = $derived(canvas ? canvas.getContext('2d') : null);
  let contrast = $derived($character.avatar.contrast);
  let gray = $derived($character.avatar.gray);
  let black = $derived($character.avatar.black);

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
      $character.avatar.x,
      $character.avatar.y,
      $character.avatar.scale,
    );
    if (panning === null) {
      applyContrast(canvas, contrast);
      applyGrayTones(canvas, context, gray, black);
      applyHalftone(canvas, 6, 30);
    }
  });

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
    if (!canvas) return;
    const relativeX = ev.clientX - panning.pointerX;
    const relativeY = ev.clientY - panning.pointerY;
    const canvasScale =
      (canvas.width / canvas.offsetWidth) * $character.avatar.scale;
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
    if (!canvas) return;

    const oldScale = $character.avatar.scale;
    const newScale = Math.min(Math.max(0.1, oldScale - ev.deltaY / 1000), 10);

    // Mouse position
    const rect = canvas.getBoundingClientRect();
    const mouseX = ev.clientX - rect.left;
    const mouseY = ev.clientY - rect.top;

    // Convert mouse coordinates
    const canvasMouseX = (mouseX / canvas.offsetWidth) * canvas.width;
    const canvasMouseY = (mouseY / canvas.offsetHeight) * canvas.height;

    // Calculate the point in the image space that the mouse is over
    const imagePointX = (canvasMouseX - $character.avatar.x) / oldScale;
    const imagePointY = (canvasMouseY - $character.avatar.y) / oldScale;

    $character.avatar.scale = newScale;
    $character.avatar.x = canvasMouseX - imagePointX * newScale;
    $character.avatar.y = canvasMouseY - imagePointY * newScale;
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
      <Flex column>
        <label>
          <Flex justify="start">
            <span>Edit</span>
            <input type="checkbox" bind:checked={editEnabled} />
          </Flex>
        </label>
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
</div>

<style lang="scss">
  .controls {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 1;
    opacity: 0;

    &:hover {
      opacity: 1;
    }
  }
  .container {
    position: relative;
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
