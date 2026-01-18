export default function applyGrayTones(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  gray: number,
  black: number
) {
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Grayscale using luminosity method
    const average = 0.299 * r + 0.587 * g + 0.114 * b;
    // Threshold to black or white
    let value = 0;
    if (average > gray * 255) {
      value = 200;
    }
    if (average > black * 255) {
      value = 255;
    }

    data[i] = value; // red
    data[i + 1] = value; // green
    data[i + 2] = value; // blue
  }

  context.putImageData(imageData, 0, 0);
}
