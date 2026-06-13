const SEED = 247;
const EPOCH = new Date('2026-06-13T00:00:00Z').getTime();
const CAP = 500;

export function getFoundingCount(): number {
	const daysSinceEpoch = Math.floor((Date.now() - EPOCH) / (1000 * 60 * 60 * 24));
	let total = SEED;
	for (let d = 0; d < daysSinceEpoch; d++) {
		total += 2 + (((d * 2654435761) >>> 0) % 4);
	}
	return Math.min(total, CAP);
}
