import { json, error } from '@sveltejs/kit';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { RequestHandler } from './$types';

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

export const POST: RequestHandler = async ({ request }) => {
	const { id, vote } = await request.json();

	if (!id || !['approved', 'rejected'].includes(vote)) {
		throw error(400, 'Invalid payload');
	}

	const manifest = await loadManifest();
	if (!manifest.assets[id]) {
		manifest.assets[id] = { vote: null, filename: id };
	}
	manifest.assets[id].vote = vote;
	await writeFile(MANIFEST_FILE, JSON.stringify(manifest, null, '\t'));

	return json({ ok: true });
};

export const DELETE: RequestHandler = async ({ request }) => {
	const { id } = await request.json();

	if (!id) {
		throw error(400, 'Missing id');
	}

	const manifest = await loadManifest();
	if (manifest.assets[id]) {
		manifest.assets[id].vote = null;
	}
	await writeFile(MANIFEST_FILE, JSON.stringify(manifest, null, '\t'));

	return json({ ok: true });
};
