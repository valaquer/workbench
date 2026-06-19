import { json, error } from '@sveltejs/kit';
import { readFile, writeFile, rename, readdir, mkdir } from 'node:fs/promises';
import { readdirSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';
import type { RequestHandler } from './$types';

const BAVARIA_DIR = '/Users/d.patnaik/honeybloom/library/bavaria';
const MANIFEST_FILE = path.join(BAVARIA_DIR, 'bavaria-manifest.json');
const SUBDIRS = ['accepted', 'rejected', 'pending-review'] as const;
const VOTE_TO_DIR: Record<string, string> = {
	approved: 'accepted',
	rejected: 'rejected',
	intermediate: 'pending-review',
};

interface AssetEntry {
	vote: 'approved' | 'rejected' | 'intermediate' | null;
	filename: string;
}

interface Manifest {
	assets: Record<string, AssetEntry>;
}

function findAssetFile(id: string): string | null {
	const dirs = [BAVARIA_DIR, ...SUBDIRS.map((d) => path.join(BAVARIA_DIR, d))];
	for (const dir of dirs) {
		try {
			const files = readdirSync(dir);
			const match = files.find(
				(f) => /\.(png|jpg|jpeg|webp)$/i.test(f) && f.replace(/\.(png|jpg|jpeg|webp)$/i, '') === id
			);
			if (match) return path.join(dir, match);
		} catch {}
	}
	return null;
}

function setImmutable(filePath: string, lock: boolean): void {
	try {
		execSync(`chflags ${lock ? 'uchg' : 'nouchg'} "${filePath}"`, { timeout: 3000 });
	} catch (err) {
		console.error(`[vault] chflags failed for ${filePath}:`, err instanceof Error ? err.message : String(err));
	}
}

async function moveAsset(id: string, targetSubdir: string): Promise<void> {
	const currentPath = findAssetFile(id);
	if (!currentPath) return;
	const filename = path.basename(currentPath);
	const targetDir = path.join(BAVARIA_DIR, targetSubdir);
	const targetPath = path.join(targetDir, filename);
	if (currentPath === targetPath) return;
	// Unlock before move if locked
	setImmutable(currentPath, false);
	await rename(currentPath, targetPath);
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

	if (!id || !['approved', 'rejected', 'intermediate'].includes(vote)) {
		throw error(400, 'Invalid payload');
	}

	const manifest = await loadManifest();
	if (!manifest.assets[id]) {
		manifest.assets[id] = { vote: null, filename: id };
	}
	manifest.assets[id].vote = vote;
	await writeFile(MANIFEST_FILE, JSON.stringify(manifest, null, '\t'));

	// Move file to corresponding subfolder
	const targetDir = VOTE_TO_DIR[vote];
	if (targetDir) {
		await moveAsset(id, targetDir);
		// Re-lock if approved
		const movedPath = findAssetFile(id);
		if (movedPath && vote === 'approved') {
			setImmutable(movedPath, true);
		}
	}

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

	// Move back to root (pending-review)
	await moveAsset(id, 'pending-review');

	return json({ ok: true });
};
