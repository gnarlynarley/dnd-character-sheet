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
  <canvas bind:this={canvas} {width} {height}></canvas>
</div>

<style lang="scss">
  .wrapper {
    position: relative;
    z-index: 0;

    @media screen {
      background-color: var(--color-white);

      &::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--color-black);
        mix-blend-mode: lighten;
        z-index: 1;
      }
    }
  }
  canvas {
    width: 100%;
    display: block;
    mix-blend-mode: multiply;
  }
</style>
