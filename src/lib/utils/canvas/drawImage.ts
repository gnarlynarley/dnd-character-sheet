export default function drawImage(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement | HTMLCanvasElement | ImageBitmap,
) {
  const context = canvas.getContext('2d')!;
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const imageWidth = image.width;
  const imageHeight = image.height;
  const canvasAspect = canvasWidth / canvasHeight;
  const imageAspect = imageWidth / imageHeight;
  let sourceX = 0;
  let sourceY = 0;
  let sourceWidth = imageWidth;
  let sourceHeight = imageHeight;
  if (imageAspect > canvasAspect) {
    // Image is wider than canvas, crop horizontally
    sourceWidth = imageHeight * canvasAspect;
    sourceX = (imageWidth - sourceWidth) / 2;
  } else {
    // Image is taller than canvas, crop vertically
    sourceHeight = imageWidth / canvasAspect;
    sourceY = (imageHeight - sourceHeight) / 2;
  }
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    canvasWidth,
    canvasHeight,
  );
}
