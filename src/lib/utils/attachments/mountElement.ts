import type { Attachment } from 'svelte/attachments';

export default function mountElement(elementToAttach: HTMLElement | null): Attachment {
	return (element) => {
		if (!elementToAttach) return;
		element.appendChild(elementToAttach);
		return () => {
			element.removeChild(elementToAttach);
		};
	};
}
