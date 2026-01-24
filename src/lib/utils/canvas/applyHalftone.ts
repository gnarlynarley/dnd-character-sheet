export default function applyHalftone(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  dotSize = 6, // radius of max dot
  angle = 45,
) {
  const w = canvas.width | 0;
  const h = canvas.height | 0;
  if (w <= 0 || h <= 0) return;

  const src = context.getImageData(0, 0, w, h);
  const d = src.data;

  // Treat very dark pixels as "ink" that must be preserved (lines/values).
  // If you need more/less preservation, tweak this constant.
  const INK_THRESH = 70; // 0..255

  const n = w * h;
  const lum = new Uint8Array(n);
  const ink = new Uint8Array(n);

  for (let i = 0; i < n; i++) {
    const o = i * 4;
    const a = d[o + 3];
    if (a === 0) {
      lum[i] = 255;
      ink[i] = 0;
      continue;
    }
    const r = d[o + 0];
    const g = d[o + 1];
    const b = d[o + 2];
    // sRGB luminance (good enough for halftone sizing)
    const y = (0.2126 * r + 0.7152 * g + 0.0722 * b) | 0;
    lum[i] = y;
    ink[i] = y <= INK_THRESH ? 1 : 0;
  }

  const off = document.createElement('canvas');
  off.width = w;
  off.height = h;
  const octx = off.getContext('2d');
  if (!octx) return;

  // White paper background, black dots
  octx.clearRect(0, 0, w, h);
  octx.fillStyle = '#fff';
  octx.fillRect(0, 0, w, h);
  octx.fillStyle = '#000';

  const rad = (angle * Math.PI) / 180;
  const ca = Math.cos(rad);
  const sa = Math.sin(rad);

  const cell = Math.max(2, Math.round(dotSize * 2)); // spacing between dot centers
  const cx = w / 2;
  const cy = h / 2;
  const halfDiag = Math.sqrt(w * w + h * h) / 2;

  // Iterate a rotated grid in "halftone space" and map centers back to image space.
  for (let yr = -halfDiag; yr <= halfDiag; yr += cell) {
    for (let xr = -halfDiag; xr <= halfDiag; xr += cell) {
      const x = cx + xr * ca - yr * sa;
      const y = cy + xr * sa + yr * ca;

      const xi = x | 0;
      const yi = y | 0;
      if (xi < 0 || xi >= w || yi < 0 || yi >= h) continue;

      const idx = yi * w + xi;
      const o = idx * 4;

      if (d[o + 3] === 0) continue; // transparent source => no dot
      if (ink[idx]) continue; // preserve ink: do not halftone these pixels

      const yv = lum[idx] / 255; // 0..1
      const rDot = (1 - yv) * dotSize; // darker => bigger dot
      if (rDot <= 0.15) continue;

      octx.beginPath();
      octx.arc(x, y, rDot, 0, Math.PI * 2);
      octx.fill();
    }
  }

  // Composite: overwrite halftone with preserved dark values where ink mask is true.
  const out = octx.getImageData(0, 0, w, h);
  const od = out.data;

  for (let i = 0; i < n; i++) {
    const o = i * 4;

    const a = d[o + 3];
    if (a === 0) {
      od[o + 3] = 0;
      continue;
    }

    if (ink[i]) {
      const y = lum[i];
      od[o + 0] = y;
      od[o + 1] = y;
      od[o + 2] = y;
      od[o + 3] = a;
    } else {
      // keep paper/dot result, but honor original alpha
      od[o + 3] = a;
    }
  }

  context.putImageData(out, 0, 0);
}
