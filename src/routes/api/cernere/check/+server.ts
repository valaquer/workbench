import { json } from '@sveltejs/kit';
import { stat, readdir } from 'fs/promises';
import path from 'path';

const OUTPUTS_DIR = '/Users/d.patnaik/honeybloom/wyatt/cernere/outputs';
const TC_FEEDBACK_DIR = '/Users/d.patnaik/honeybloom/eva/tc-feedback';
const BOSS_FEEDBACK_DIR = '/Users/d.patnaik/honeybloom/eva/boss-feedback';

const CONDITIONS = ['C1', 'C2', 'C3', 'C4', 'C5'];

async function getMtime(filePath: string): Promise<number> {
	try {
		const s = await stat(filePath);
		return s.mtimeMs;
	} catch {
		return 0;
	}
}

export async function GET() {
	const mtimes: Record<string, number> = {};

	// Check output files per condition
	for (const cond of CONDITIONS) {
		const dir = path.join(OUTPUTS_DIR, cond);
		try {
			const files = await readdir(dir);
			for (const f of files.filter(f => f.endsWith('.json'))) {
				mtimes[`${cond}/${f}`] = await getMtime(path.join(dir, f));
			}
		} catch {
			// Directory may not exist
		}
	}

	// Check MANIFEST
	mtimes['MANIFEST'] = await getMtime(path.join(OUTPUTS_DIR, 'MANIFEST.json'));

	// Check Eva feedback files
	for (const tc of ['tc1', 'tc2', 'tc3', 'tc4', 'tc5', 'tc6', 'tc7', 'tc8']) {
		mtimes[`eva/${tc}`] = await getMtime(path.join(TC_FEEDBACK_DIR, `${tc}.md`));
		mtimes[`boss/${tc}`] = await getMtime(path.join(BOSS_FEEDBACK_DIR, `${tc}.md`));
	}

	// Return a single hash string for quick comparison
	const hash = Object.values(mtimes).reduce((a, b) => a + b, 0).toString(36);

	return json({ hash, mtimes }, {
		headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' }
	});
}
