export default function createCanvas(width = 0, height = 0) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d', { willReadFrequently: true });

  if (!context) throw new Error('Could not obtain context.');

  return {
    canvas,
    context,
    destroy() {
      canvas.width = 0;
      canvas.height = 0;
    },
  };
}
