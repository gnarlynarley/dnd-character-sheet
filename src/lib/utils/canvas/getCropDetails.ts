import { createImage } from "..";

export default async function getCropDetails(
  blob: Blob,
  width: number,
  height: number
): Promise<{ x: number; y: number; scale: number }> {
  const image = await createImage(blob);
  const imageAspect = image.width / image.height;
  const containerAspect = width / height;

  let scale: number;
  let x: number;
  let y: number;

  if (imageAspect > containerAspect) {
    // Image is wider, scale by height
    scale = height / image.height;
    x = (width - image.width * scale) / 2;
    y = 0;
  } else {
    // Image is taller, scale by width
    scale = width / image.width;
    x = 0;
    y = (height - image.height * scale) / 2;
  }

  image.dispose();

  return { x, y, scale };
}
