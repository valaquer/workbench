import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const GALLERY_DIR = '/Users/d.patnaik/images/2026-03-03-E006';
const VOTES_FILE = path.join(GALLERY_DIR, '.votes.json');

export async function load() {
	const entries = await readdir(GALLERY_DIR);
	const pngs = entries.filter((f) => f.endsWith('.png'));

	const ids = pngs.map((f) => f.replace('.png', ''));

	// Split into groups
	const officeIds = ids.filter(id => id.startsWith('E001') || id.startsWith('E002') || id.startsWith('E003') || id.startsWith('E004') || id.startsWith('E005'));
	const nunIds = ids.filter(id => id.startsWith('E006') || id.startsWith('E007') || id.startsWith('E008') || id.startsWith('E009') || id.startsWith('E010'));
	const fcIds = ids.filter(id => id.startsWith('E011') || id.startsWith('E012'));
	const fcSoloIds = ids.filter(id => id.startsWith('E013') || id.startsWith('E014'));

	// Sort each group by experiment number
	const sortByExp = (a: string, b: string) => {
		const numA = parseInt(a.match(/E(\d+)/)?.[1] || '0');
		const numB = parseInt(b.match(/E(\d+)/)?.[1] || '0');
		return numA - numB;
	};

	officeIds.sort(sortByExp);
	nunIds.sort(sortByExp);
	fcIds.sort(sortByExp);
	fcSoloIds.sort(sortByExp);

	let votes: Record<string, string> = {};
	try {
		votes = JSON.parse(await readFile(VOTES_FILE, 'utf-8'));
	} catch {}

	return { officeIds, nunIds, fcIds, fcSoloIds, votes };
}
