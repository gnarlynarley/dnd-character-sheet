<script lang="ts">
  let scale = $state(1);

  function onresize() {
    scale = window.innerWidth / 1200;
  }
  onresize();

  function beforeprint() {
    scale = 0.9;
  }
</script>

<svelte:window
  {onresize}
  on:beforeprint={beforeprint}
  on:afterprint={onresize}
/>

<svg width="0" height="0" style="display: none;">
  <filter id="pencil">
    <feTurbulence
      type="fractalNoise"
      baseFrequency="0.5"
      numOctaves="1"
      result="noise"
    />
    <feDisplacementMap in="SourceGraphic" in2="noise" {scale} />
  </filter>
</svg>
