export default function applyTransparency(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
) {
  const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // If the pixel is white, set its alpha to 0 (transparent)
    if (r === 255 && g === 255 && b === 255) {
      data[i + 3] = 0;
    }
  }

  context.putImageData(imgData, 0, 0);
}
