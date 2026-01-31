import createCanvas from './createCanvas';

export async function screenshotElement(element: HTMLElement) {
  const { canvas, context } = createCanvas();

  const { html2canvas } = await import('html2canvas-pro');
  const customProperties = {
    '--color-white': 'white',
    '--color-black': 'black',
    '--color-paper': 'white',
    '--color-ink': 'black',
    '--color-faded:': '#ccc',
    color: 'black',
    padding: '1em',
  };

  for (const [key, value] of Object.entries(customProperties)) {
    element.style.setProperty(key, value);
  }

  const f = await html2canvas(element, {
    backgroundColor: null,
    scale: 2,
  });

  for (const key of Object.keys(customProperties)) {
    element.style.removeProperty(key);
  }
  canvas.width = f.width;
  canvas.height = f.height;
  context.filter = 'url("#pencil")';
  context.drawImage(f, 0, 0);

  return canvas;
}
