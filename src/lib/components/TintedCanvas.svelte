<script lang="ts">
  type Props = {
    canvas: HTMLCanvasElement | null;
    context: CanvasRenderingContext2D | null;
    width?: number;
    height?: number;
  };

  let {
    canvas = $bindable(),
    context = $bindable(),
    width,
    height,
  }: Props = $props();

  $effect(() => {
    context = canvas?.getContext('2d', { willReadFrequently: true }) ?? null;
  });
</script>

<div class="wrapper">
  <div class="overlay" data-html2canvas-ignore></div>
  <canvas bind:this={canvas} {width} {height}></canvas>
</div>

<style lang="scss">
  .wrapper {
    position: relative;
    z-index: 0;
    flex-grow: 1;

    @media screen {
      background-color: var(--color-white);
    }
  }

  .overlay {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-black);
    mix-blend-mode: lighten;
    z-index: 1;
    pointer-events: none;
  }

  canvas {
    width: 100%;
    display: block;
    mix-blend-mode: multiply;
  }
</style>
