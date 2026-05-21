import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const PASSPORT_DIR = path.resolve('..', 'passport-photos');

export async function load() {
	const entries = await readdir(PASSPORT_DIR);
	const pngs = entries.filter((f) => f.endsWith('.png'));

	const withTimes = await Promise.all(
		pngs.map(async (f) => {
			const s = await stat(path.join(PASSPORT_DIR, f));
			return { id: f.replace('.png', ''), birthtime: s.birthtimeMs };
		})
	);

	withTimes.sort((a, b) => b.birthtime - a.birthtime);

	return { ids: withTimes.map((e) => e.id) };
}
