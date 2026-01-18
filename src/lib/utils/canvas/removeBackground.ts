export default function removeBackground(canvas: HTMLCanvasElement) {
	const ctx = canvas.getContext("2d", { willReadFrequently: true });
	if (!ctx) return;

	const w = canvas.width | 0;
	const h = canvas.height | 0;
	if (w <= 0 || h <= 0) return;

	const img = ctx.getImageData(0, 0, w, h);
	const d = img.data;

	const clamp255 = (v: number) => (v < 0 ? 0 : v > 255 ? 255 : v);
	const idxOf = (x: number, y: number) => (y * w + x) * 4;

	const median = (arr: number[]) => {
		if (arr.length === 0) return 255;
		const a = arr.slice().sort((a, b) => a - b);
		return a[(a.length / 2) | 0];
	};

	// 1) Sample the border to estimate background color (robust against a few dark pixels)
	const step = Math.max(1, Math.round(Math.min(w, h) / 200)); // ~200 samples per edge
	const rs: number[] = [];
	const gs: number[] = [];
	const bs: number[] = [];

	const pushIfOpaque = (x: number, y: number) => {
		const o = idxOf(x, y);
		const a = d[o + 3];
		if (a < 16) return;
		rs.push(d[o + 0]);
		gs.push(d[o + 1]);
		bs.push(d[o + 2]);
	};

	for (let x = 0; x < w; x += step) {
		pushIfOpaque(x, 0);
		pushIfOpaque(x, h - 1);
	}
	for (let y = 0; y < h; y += step) {
		pushIfOpaque(0, y);
		pushIfOpaque(w - 1, y);
	}

	const bgR = median(rs);
	const bgG = median(gs);
	const bgB = median(bs);

	// 2) Adaptive tolerance from border variability (MAD), with a minimum for noisy scans
	const abs = Math.abs;
	const mad = (arr: number[], m: number) => median(arr.map((v) => abs(v - m)));

	const madR = mad(rs, bgR);
	const madG = mad(gs, bgG);
	const madB = mad(bs, bgB);

	// Convert MAD to a loose tolerance; ensure minimum works for slightly uneven lighting.
	const tol = Math.max(18, Math.round(6 * Math.max(madR, madG, madB))); // in RGB distance units

	// --- NEW: luminance buffer + better masks for edge + enclosed pockets ---
	const n = w * h;
	const lum = new Uint8Array(n);
	for (let i = 0; i < n; i++) {
		const o = i * 4;
		const r = d[o + 0],
			g = d[o + 1],
			b = d[o + 2];
		lum[i] = (0.2126 * r + 0.7152 * g + 0.0722 * b) | 0;
	}

	const bgLum = (0.2126 * bgR + 0.7152 * bgG + 0.0722 * bgB) | 0;

	// Edge fill: slightly more forgiving than the base tol (handles uneven paper shading)
	const tolEdge = Math.round(tol * 1.25);
	const tolEdge2 = tolEdge * tolEdge;

	// Hole detection: even looser (for enclosed pockets) but still requires "bright enough"
	const tolHole = Math.round(tol * 1.6);
	const tolHole2 = tolHole * tolHole;
	const HOLE_LUM_FLOOR = Math.max(0, bgLum - 60); // don't remove darker interior regions by accident

	// What counts as ink around a hole (used to decide if a pocket is enclosed by lines)
	const INK_LUM_THRESH = 90;
	const MIN_DARK_BORDER_RATIO = 0.22;
	const SMALL_POCKET_AREA = 200;

	const withinTolEdge = (i: number) => {
		const o = i * 4;
		const a = d[o + 3];
		if (a < 16) return true;
		if (lum[i] < HOLE_LUM_FLOOR) return false;

		const dr = d[o + 0] - bgR;
		const dg = d[o + 1] - bgG;
		const db = d[o + 2] - bgB;
		return dr * dr + dg * dg + db * db <= tolEdge2;
	};

	// Precompute a loose "background candidate" mask for enclosed pockets
	const bgCand = new Uint8Array(n);
	for (let i = 0; i < n; i++) {
		const o = i * 4;
		const a = d[o + 3];
		if (a < 16) {
			bgCand[i] = 1;
			continue;
		}
		if (lum[i] < HOLE_LUM_FLOOR) continue;

		const dr = d[o + 0] - bgR;
		const dg = d[o + 1] - bgG;
		const db = d[o + 2] - bgB;
		if (dr * dr + dg * dg + db * db <= tolHole2) bgCand[i] = 1;
	}

	// 3) Flood fill from edges to find connected background region(s)
	const visited = new Uint8Array(n);
	const q = new Int32Array(n);
	let qh = 0;
	let qt = 0;

	const enqueue = (x: number, y: number) => {
		const i = y * w + x;
		if (visited[i]) return;
		if (!withinTolEdge(i)) return;
		visited[i] = 1;
		q[qt++] = i;
	};

	for (let x = 0; x < w; x++) {
		enqueue(x, 0);
		enqueue(x, h - 1);
	}
	for (let y = 0; y < h; y++) {
		enqueue(0, y);
		enqueue(w - 1, y);
	}

	while (qh < qt) {
		const i = q[qh++];
		const x = i % w;
		const y = (i / w) | 0;

		if (x > 0) enqueue(x - 1, y);
		if (x + 1 < w) enqueue(x + 1, y);
		if (y > 0) enqueue(x, y - 1);
		if (y + 1 < h) enqueue(x, y + 1);
	}

	// --- NEW: remove enclosed background pockets (holes) not connected to the edge ---
	const seen = new Uint8Array(n);
	const comp: number[] = [];

	for (let i = 0; i < n; i++) {
		if (!bgCand[i] || visited[i] || seen[i]) continue;

		comp.length = 0;
		let cqh = 0;
		let cqt = 0;
		q[cqt++] = i;
		seen[i] = 1;

		let touchesEdge = false;
		let border = 0;
		let darkBorder = 0;

		while (cqh < cqt) {
			const p = q[cqh++];
			comp.push(p);

			const x = p % w;
			const y = (p / w) | 0;

			if (x === 0 || y === 0 || x === w - 1 || y === h - 1) touchesEdge = true;

			const checkNeighbor = (nx: number, ny: number) => {
				if (nx < 0 || nx >= w || ny < 0 || ny >= h) return;
				const ni = ny * w + nx;

				if (bgCand[ni]) {
					if (!seen[ni] && !visited[ni]) {
						seen[ni] = 1;
						q[cqt++] = ni;
					}
				} else {
					border++;
					const no = ni * 4;
					const na = d[no + 3];
					if (na >= 16 && lum[ni] <= INK_LUM_THRESH) darkBorder++;
				}
			};

			checkNeighbor(x - 1, y);
			checkNeighbor(x + 1, y);
			checkNeighbor(x, y - 1);
			checkNeighbor(x, y + 1);
		}

		if (touchesEdge) continue; // edge-connected already handled by flood fill

		const area = comp.length;
		const ratio = border > 0 ? darkBorder / border : 0;

		// If it's a small pocket OR it's bounded by ink, treat as background and remove it.
		if (area <= SMALL_POCKET_AREA || ratio >= MIN_DARK_BORDER_RATIO) {
			for (let k = 0; k < comp.length; k++) visited[comp[k]] = 1;
		}
	}

	// 4) Apply: make visited background pixels transparent
	for (let i = 0; i < visited.length; i++) {
		if (!visited[i]) continue;
		const o = i * 4;

		d[o + 0] = 0;
		d[o + 1] = 0;
		d[o + 2] = 0;
		d[o + 3] = 0;
	}

	ctx.clearRect(0, 0, w, h);
	ctx.putImageData(img, 0, 0);
}
