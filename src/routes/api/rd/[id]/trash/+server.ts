import { error, json } from '@sveltejs/kit';
import { access } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';
import type { RequestHandler } from './$types';

const exec = promisify(execFile);
const GALLERY_DIR = path.resolve('..', 'gallery');

export const POST: RequestHandler = async ({ params }) => {
	const id = params.id;

	if (!/^[A-Z0-9][\w-]*$/i.test(id)) {
		throw error(400, 'Invalid ID');
	}

	const filePath = path.join(GALLERY_DIR, `${id}.png`);

	try {
		await access(filePath);
	} catch {
		throw error(404, 'Image not found');
	}

	// Move to macOS Trash via AppleScript
	await exec('osascript', [
		'-e',
		`tell application "Finder" to delete POSIX file "${filePath}"`
	]);

	return json({ ok: true, trashed: id });
};
