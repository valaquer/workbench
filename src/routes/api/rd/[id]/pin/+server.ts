import { error, json } from '@sveltejs/kit';
import { access, mkdir, rename } from 'node:fs/promises';
import path from 'node:path';
import type { RequestHandler } from './$types';

const GALLERY_DIR = path.resolve('..', 'gallery');
const PINNED_DIR = path.join(GALLERY_DIR, 'pinned');

export const POST: RequestHandler = async ({ params }) => {
	const id = params.id;

	if (!/^[A-Z0-9][\w-]*$/i.test(id)) {
		throw error(400, 'Invalid ID');
	}

	const src = path.join(GALLERY_DIR, `${id}.png`);
	const dest = path.join(PINNED_DIR, `${id}.png`);

	try {
		await access(src);
	} catch {
		throw error(404, 'Image not found');
	}

	await mkdir(PINNED_DIR, { recursive: true });
	await rename(src, dest);

	return json({ ok: true, pinned: id });
};
