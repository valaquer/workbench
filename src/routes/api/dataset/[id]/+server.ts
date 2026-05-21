import { error } from '@sveltejs/kit';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { RequestHandler } from './$types';

const DATASET_DIR = path.resolve('..', 'gallery', 'dataset-c2');

export const GET: RequestHandler = async ({ params }) => {
	const id = params.id;

	if (!/^[\w.-]+$/i.test(id)) {
		throw error(400, 'Invalid ID');
	}

	const filePath = path.join(DATASET_DIR, `${id}.png`);

	try {
		const file = await readFile(filePath);
		return new Response(file, {
			headers: {
				'Content-Type': 'image/png',
				'Cache-Control': 'no-cache'
			}
		});
	} catch {
		throw error(404, 'Image not found');
	}
};
