<script lang="ts">
  import { getContext, setContext } from "svelte";

  interface Item {
    name: string | number;
  }

  type T = $$Generic<Item>;

  interface Props {
    items: T[];
    onReorder: (items: T[]) => void;
    children: any;
  }

  let { items = $bindable(), onReorder }: Props = $props();

  let draggedIndex: number | null = $state(null);
  let dragOverIndex: number | null = $state(null);

  function handleDragStart(index: number) {
    draggedIndex = index;
  }

  function handleDragOver(index: number, e: DragEvent) {
    e.preventDefault();
    dragOverIndex = index;
  }

  function handleDragLeave() {
    dragOverIndex = null;
  }

  function handleDrop(index: number, e: DragEvent) {
    e.preventDefault();
    dragOverIndex = null;

    if (draggedIndex === null || draggedIndex === index) return;

    const newItems = [...items];
    const [draggedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, draggedItem);

    items = newItems;
    onReorder?.(newItems);
    draggedIndex = null;
  }

  setContext("dnd", {
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    isDragging: (index: number) => draggedIndex === index,
    isDragOver: (index: number) => dragOverIndex === index,
  });
</script>

<div class="dnd-container">
  <slot />
</div>

<style>
  .dnd-container {
    width: 100%;
  }
</style>
