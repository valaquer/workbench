import { readdir } from 'node:fs/promises';
import path from 'node:path';

const DATASET_DIR = path.resolve('..', 'gallery', 'dataset-c2');

export async function load() {
	const entries = await readdir(DATASET_DIR);
	const pngs = entries.filter((f) => f.endsWith('.png')).sort();
	const ids = pngs.map((f) => f.replace('.png', ''));

	return { ids };
}
