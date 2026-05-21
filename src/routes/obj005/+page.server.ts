import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const GALLERY_DIR = '/Users/d.patnaik/honeybloom/vincent/OBJ-005-flux-validation';
const VOTES_FILE = path.join(GALLERY_DIR, '.votes.json');

export async function load() {
	const entries = await readdir(GALLERY_DIR);
	const pngs = entries.filter((f) => f.endsWith('.png'));
	const ids = pngs.map((f) => f.replace('.png', ''));

	// Group by LoRA
	const f002Ids = ids.filter(id => id.includes('F002') && !id.includes('BLUEHAIR'));
	const f003Ids = ids.filter(id => id.includes('F003') && !id.includes('BLUEHAIR'));
	const blueHairIds = ids.filter(id => id.includes('BLUEHAIR'));

	// Sort by prompt, steps, seed
	const sortFn = (a: string, b: string) => a.localeCompare(b);
	f002Ids.sort(sortFn);
	f003Ids.sort(sortFn);
	blueHairIds.sort(sortFn);

	let votes: Record<string, string> = {};
	try {
		votes = JSON.parse(await readFile(VOTES_FILE, 'utf-8'));
	} catch {}

	return { f002Ids, f003Ids, blueHairIds, votes, galleryDir: GALLERY_DIR };
}
