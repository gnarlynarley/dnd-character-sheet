<script lang="ts">
  let scale = $state(1);

  function onresize() {
    scale = window.innerWidth / 800;
  }
  onresize();

  $effect(() => console.log(scale));
</script>

<svelte:window {onresize} />

<svg width="0" height="0" style="display: none;">
  <filter id="pencil">
    <feTurbulence
      type="fractalNoise"
      baseFrequency="0.8"
      numOctaves="1"
      result="noise"
    />
    <feDisplacementMap in="SourceGraphic" in2="noise" {scale} />
  </filter>
</svg>
