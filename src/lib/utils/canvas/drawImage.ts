export default function drawImage(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement | HTMLCanvasElement,
  x: number,
  y: number,
  scale: number
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const { width, height } = image;

  ctx.drawImage(image, x, y, width * scale, height * scale);
}
