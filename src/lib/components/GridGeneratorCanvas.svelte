<script lang="ts">
  import TintedCanvas from '$lib/components/TintedCanvas.svelte';
  import Flex from './Flex.svelte';
  import BorderLine from './BorderLine.svelte';
  import type { EventHandler } from 'svelte/elements';
  import Button from './Button.svelte';

  let canvas = $state<HTMLCanvasElement | null>(null);
  let context = $state<CanvasRenderingContext2D | null>(null);

  let stroke = $state(2);
  let x = $state(10);
  let y = $state(8);
  let size = $state(100);
  let offset = $state(30);

  $effect(() => {
    if (!canvas || !context) return;

    canvas.width = offset * 2 + x * size;
    canvas.height = offset * 2 + y * size;
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.filter = `url(#pencil)`;
    context.lineWidth = stroke;

    for (let i = 1; i < x; i++) {
      context.beginPath();
      const px = offset + i * size;
      context.moveTo(px, offset);
      context.lineTo(px, canvas.height - offset);
      context.stroke();
    }
    for (let i = 1; i < y; i++) {
      context.beginPath();
      const py = offset + i * size;
      context.moveTo(offset, py);
      context.lineTo(canvas.width - offset, py);
      context.stroke();
    }

    context.lineWidth = stroke * 1.5;
    context.beginPath();
    context.roundRect(
      offset,
      offset,
      canvas.width - offset * 2,
      canvas.height - offset * 2,
      stroke * 5,
    );
    context.stroke();
  });

  const onsubmit: EventHandler<SubmitEvent, HTMLFormElement> = (ev) => {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const nextX = parseInt(fd.get('x')?.toString() || '') || x;
    const nextY = parseInt(fd.get('y')?.toString() || '') || y;
    const nextSize = parseInt(fd.get('size')?.toString() || '') || size;
    const averageSize = Math.sqrt(nextX * nextY * nextSize * nextSize);
    if (averageSize > 4000) {
      if (
        !confirm(
          'The grid will be pretty large and can cause issues, are you sure?',
        )
      ) {
        return;
      }
    }
    x = nextX;
    y = nextY;
    size = nextSize;
    stroke = parseInt(fd.get('stroke')?.toString() || '') || stroke;
  };
</script>

<div class="wrapper">
  <form {onsubmit}>
    <Flex column>
      <label>
        <span>Size</span>
        <input name="size" type="number" defaultValue={size} />
      </label>
      <label>
        <span>Columns</span>
        <input name="x" type="number" defaultValue={x} />
      </label>
      <label>
        <span>Rows</span>
        <input name="y" type="number" defaultValue={y} />
      </label>
      <label>
        <span>Stroke width</span>
        <input name="stroke" type="number" defaultValue={stroke} />
      </label>

      <Button type="submit">Generate</Button>
    </Flex>
  </form>
  <BorderLine vertical />
  <div class="canvas">
    <TintedCanvas bind:canvas bind:context />
  </div>
</div>

<style lang="scss">
  .wrapper {
    flex-grow: 1;
    display: grid;
    grid-template-columns: auto auto 1fr;
    align-items: start;
    gap: var(--gutter);
    padding: var(--gutter);
  }

  form {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
  }

  .canvas {
    flex-grow: 1;
    position: relative;
    display: flex;
    align-self: stretch;

    :global(canvas) {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      flex-grow: 1;
      object-fit: contain;
    }
  }
</style>
