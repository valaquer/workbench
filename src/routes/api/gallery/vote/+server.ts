import { json, error } from '@sveltejs/kit';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { RequestHandler } from './$types';

const VOTES_FILE = '/Users/d.patnaik/images/2026-03-03-E006/.votes.json';

async function loadVotes(): Promise<Record<string, string>> {
	try {
		return JSON.parse(await readFile(VOTES_FILE, 'utf-8'));
	} catch {
		return {};
	}
}

export const POST: RequestHandler = async ({ request }) => {
	const { id, vote } = await request.json();

	if (!id || !['approved', 'rejected'].includes(vote)) {
		throw error(400, 'Invalid payload');
	}

	const votes = await loadVotes();
	votes[id] = vote;
	await writeFile(VOTES_FILE, JSON.stringify(votes, null, '\t'));

	return json({ ok: true });
};

export const DELETE: RequestHandler = async ({ request }) => {
	const { id } = await request.json();

	if (!id) {
		throw error(400, 'Missing id');
	}

	const votes = await loadVotes();
	delete votes[id];
	await writeFile(VOTES_FILE, JSON.stringify(votes, null, '\t'));

	return json({ ok: true });
};
