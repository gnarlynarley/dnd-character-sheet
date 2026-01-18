export default function applyContrast(
	canvas: HTMLCanvasElement,
	amount = 0.4, // -1..1 (negative reduces contrast, positive increases)
	toBlackWhite = false,
	bwThreshold = 128 // 0..255 (higher => more becomes black)
) {
	const ctx = canvas.getContext("2d", { willReadFrequently: true });
	if (!ctx) return;

	const w = canvas.width | 0;
	const h = canvas.height | 0;
	if (w <= 0 || h <= 0) return;

	const img = ctx.getImageData(0, 0, w, h);
	const d = img.data;

	const a = Math.max(-1, Math.min(1, amount));
	// Classic contrast formula using "c" in [-255..255]
	const c = a * 255;
	const factor = (259 * (c + 255)) / (255 * (259 - c));

	const clamp = (v: number) => (v < 0 ? 0 : v > 255 ? 255 : v);
	const adj = (v: number) => clamp(factor * (v - 128) + 128);

	for (let i = 0; i < d.length; i += 4) {
		const alpha = d[i + 3];
		if (alpha === 0) continue;

		const r = d[i + 0];
		const g = d[i + 1];
		const b = d[i + 2];

		if (toBlackWhite) {
			// luminance -> contrast -> threshold
			const y = 0.2126 * r + 0.7152 * g + 0.0722 * b;
			const y2 = adj(y);
			const v = y2 < bwThreshold ? 0 : 255;
			d[i + 0] = v;
			d[i + 1] = v;
			d[i + 2] = v;
		} else {
			d[i + 0] = adj(r);
			d[i + 1] = adj(g);
			d[i + 2] = adj(b);
		}
	}

	ctx.putImageData(img, 0, 0);
}
