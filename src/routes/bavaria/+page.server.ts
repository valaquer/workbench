import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const BAVARIA_DIR = '/Users/d.patnaik/honeybloom/library/bavaria';
const MANIFEST_FILE = path.join(BAVARIA_DIR, 'bavaria-manifest.json');

interface AssetEntry {
	vote: 'approved' | 'rejected' | null;
	filename: string;
}

interface Manifest {
	assets: Record<string, AssetEntry>;
}

async function loadManifest(): Promise<Manifest> {
	try {
		return JSON.parse(await readFile(MANIFEST_FILE, 'utf-8'));
	} catch {
		return { assets: {} };
	}
}

export async function load() {
	const entries = await readdir(BAVARIA_DIR).catch(() => []);
	const images = entries.filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f));
	const ids = images.map((f) => f.replace(/\.(png|jpg|jpeg|webp)$/i, ''));

	ids.sort((a, b) => a.localeCompare(b));

	const manifest = await loadManifest();

	const votes: Record<string, string> = {};
	for (const id of ids) {
		const entry = manifest.assets[id];
		if (entry?.vote) {
			votes[id] = entry.vote;
		}
	}

	return { ids, votes };
}
