<script lang="ts">
  import { getContext, type Snippet } from "svelte";

  interface Props {
    index: number;
    children: Snippet;
  }

  const { index, children }: Props = $props();

  const dnd = getContext<any>("dnd");

  let isDragging = $derived(dnd?.isDragging(index) ?? false);
  let isDragOver = $derived(dnd?.isDragOver(index) ?? false);
</script>

<div
  tabindex="-1"
  role="button"
  class="draggable-item"
  class:dragging={isDragging}
  class:drag-over={isDragOver}
  draggable="true"
  ondragstart={() => dnd?.handleDragStart(index)}
  ondragover={(e) => dnd?.handleDragOver(index, e)}
  ondragleave={() => dnd?.handleDragLeave()}
  ondrop={(e) => dnd?.handleDrop(index, e)}
>
  {@render children()}
</div>

<style>
  .draggable-item {
    cursor: grab;
    transition:
      opacity 0.2s,
      background-color 0.2s;
  }

  .draggable-item:active {
    cursor: grabbing;
  }

  .dragging {
    opacity: 0.5;
  }

  .drag-over {
    background-color: var(--highlight-color, rgba(255, 255, 255, 0.1));
    border-radius: 4px;
  }
</style>
