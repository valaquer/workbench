import { error } from '@sveltejs/kit';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import type { RequestHandler } from './$types';

const BAVARIA_DIR = '/Users/d.patnaik/honeybloom/library/bavaria';

export const GET: RequestHandler = async ({ params }) => {
	const id = params.id;

	if (!/^[\w-]+$/i.test(id)) {
		throw error(400, 'Invalid ID');
	}

	const entries = await readdir(BAVARIA_DIR).catch(() => []);
	const match = entries.find((f) => f.startsWith(id + '.') && /\.(png|jpg|jpeg|webp)$/i.test(f));

	if (!match) {
		throw error(404, 'Image not found');
	}

	const filePath = path.join(BAVARIA_DIR, match);
	const ext = path.extname(match).toLowerCase();
	const contentType =
		ext === '.png' ? 'image/png' :
		ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' :
		ext === '.webp' ? 'image/webp' :
		'application/octet-stream';

	try {
		const file = await readFile(filePath);
		return new Response(file, {
			headers: {
				'Content-Type': contentType,
				'Cache-Control': 'no-cache'
			}
		});
	} catch {
		throw error(404, 'Image not found');
	}
};
