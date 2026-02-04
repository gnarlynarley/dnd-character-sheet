import { tick } from 'svelte';

const portalContainer = document.createElement('div');
document.body.appendChild(portalContainer);

export function portal(node: HTMLElement) {
  tick().then(() => {
    portalContainer.appendChild(node);
  });
  return {
    destroy: () => {
      node.remove();
    },
  };
}
