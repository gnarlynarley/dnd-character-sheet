export default function applyOutline(
  canvas: HTMLCanvasElement,
  width: number = 4
) {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return;

  const w = canvas.width | 0;
  const h = canvas.height | 0;
  if (w <= 0 || h <= 0) return;

  const r = Math.max(1, width | 0);

  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;

  const n = w * h;
  const ALPHA_THRESH = 16;

  // Binary ink mask (what counts as "line")
  const ink = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    ink[i] = d[i * 4 + 3] >= ALPHA_THRESH ? 1 : 0;
  }

  // --- NEW: ignore small blots when generating thickening/outline ---
  // Tune this: higher => more small specks ignored for thickening.
  const MIN_BLOT_AREA = Math.max(12, Math.round(r * r * 0.6));

  const inkForDilation = new Uint8Array(ink); // start same as ink; we'll zero small components
  const visited = new Uint8Array(n);
  const q = new Int32Array(n);
  const comp: number[] = [];

  for (let i = 0; i < n; i++) {
    if (!inkForDilation[i] || visited[i]) continue;

    comp.length = 0;
    let qh = 0;
    let qt = 0;
    q[qt++] = i;
    visited[i] = 1;

    while (qh < qt) {
      const p = q[qh++];
      comp.push(p);

      const x = p % w;
      const y = (p / w) | 0;

      // 8-neighborhood so diagonal specks/components are treated as one blot
      const tryPush = (nx: number, ny: number) => {
        if (nx < 0 || nx >= w || ny < 0 || ny >= h) return;
        const ni = ny * w + nx;
        if (visited[ni] || !inkForDilation[ni]) return;
        visited[ni] = 1;
        q[qt++] = ni;
      };

      tryPush(x - 1, y);
      tryPush(x + 1, y);
      tryPush(x, y - 1);
      tryPush(x, y + 1);
      tryPush(x - 1, y - 1);
      tryPush(x + 1, y - 1);
      tryPush(x - 1, y + 1);
      tryPush(x + 1, y + 1);
    }

    if (comp.length < MIN_BLOT_AREA) {
      for (let k = 0; k < comp.length; k++) {
        inkForDilation[comp[k]] = 0; // ignore this blot for dilation
      }
    }
  }
  // --- end NEW ---

  // Circular offsets for dilation
  const offsets: Array<[dx: number, dy: number]> = [];
  for (let dy = -r; dy <= r; dy++) {
    for (let dx = -r; dx <= r; dx++) {
      if (dx === 0 && dy === 0) continue;
      if (dx * dx + dy * dy <= r * r) offsets.push([dx, dy]);
    }
  }

  // Dilate: thick = inkForDilation ⊕ disk(r)
  const thick = new Uint8Array(n);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const p = y * w + x;
      if (inkForDilation[p]) {
        thick[p] = 1;
        continue;
      }

      let near = 0;
      for (let k = 0; k < offsets.length; k++) {
        const [dx, dy] = offsets[k];
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
        if (inkForDilation[ny * w + nx]) {
          near = 1;
          break;
        }
      }
      thick[p] = near;
    }
  }

  // Keep original ink (including blots) but only thicken around non-blot ink
  const thickFinal = thick;
  for (let i = 0; i < n; i++) {
    if (ink[i]) thickFinal[i] = 1;
  }

  // Write crisp result: alpha is strictly 0/255 (sharp edges).
  // Existing ink keeps its original RGB; new thickened pixels are black.
  for (let i = 0; i < n; i++) {
    const o = i * 4;

    if (!thickFinal[i]) {
      d[o + 0] = 0;
      d[o + 1] = 0;
      d[o + 2] = 0;
      d[o + 3] = 0;
      continue;
    }

    if (!ink[i]) {
      d[o + 0] = 0;
      d[o + 1] = 0;
      d[o + 2] = 0;
    }
    d[o + 3] = 255;
  }

  ctx.putImageData(img, 0, 0);
}
