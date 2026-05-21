import { error } from '@sveltejs/kit';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import type { RequestHandler } from './$types';

const SAMPLES_DIR = path.resolve('..', 'ip', 'loras', 'gabriela', 'flux', 'samples');
const SOURCE_FACE = path.resolve('..', 'ip', 'loras', 'gabriela', 'reactor', 'gabriela-face.png');

// Build a lookup: "step{STEP}_sample{IDX}" -> actual filename on disk
let fileIndex: Map<string, string> | null = null;

async function getFileIndex() {
	if (fileIndex) return fileIndex;
	fileIndex = new Map();
	const files = await readdir(SAMPLES_DIR);
	for (const f of files) {
		// AI-Toolkit format: {timestamp}__{step 9-padded}_{sampleIdx}.jpg
		const match = f.match(/^\d+__(\d{9})_(\d+)\.jpg$/);
		if (match) {
			const step = parseInt(match[1], 10);
			const sample = parseInt(match[2], 10);
			fileIndex.set(`step${step}_sample${sample}`, f);
		}
	}
	return fileIndex;
}

export const GET: RequestHandler = async ({ params }) => {
	const name = params.name;

	if (name === 'source-face.png') {
		try {
			const file = await readFile(SOURCE_FACE);
			return new Response(file, {
				headers: { 'Content-Type': 'image/png', 'Cache-Control': 'no-cache' }
			});
		} catch {
			throw error(404, 'Source face not found');
		}
	}

	// Expected: step{N}_sample{N}.jpg
	const match = name.match(/^step(\d+)_sample(\d+)\.jpg$/);
	if (!match) throw error(400, 'Invalid filename');

	const idx = await getFileIndex();
	const key = `step${parseInt(match[1], 10)}_sample${parseInt(match[2], 10)}`;
	const actual = idx.get(key);
	if (!actual) throw error(404, `Sample not found: ${key}`);

	try {
		const file = await readFile(path.join(SAMPLES_DIR, actual));
		return new Response(file, {
			headers: { 'Content-Type': 'image/jpeg', 'Cache-Control': 'no-cache' }
		});
	} catch {
		throw error(404, 'Sample file read error');
	}
};
