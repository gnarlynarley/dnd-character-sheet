export default function createCanvasBuffer(original: HTMLCanvasElement) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) throw new Error('unable to get canvas');

  canvas.width = original.width;
  canvas.height = original.height;
  context.drawImage(original, 0, 0);

  return {
    canvas,
    destroy() {
      canvas.width = 0;
      canvas.height = 0;
    },
  };
}
