import { json } from '@sveltejs/kit';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { RequestHandler } from './$types';

const GALLERY_DIR = '/Users/d.patnaik/honeybloom/vincent/OBJ-005-flux-validation';
const VOTES_FILE = path.join(GALLERY_DIR, '.votes.json');

async function getVotes(): Promise<Record<string, string>> {
	try {
		return JSON.parse(await readFile(VOTES_FILE, 'utf-8'));
	} catch {
		return {};
	}
}

async function saveVotes(votes: Record<string, string>) {
	await writeFile(VOTES_FILE, JSON.stringify(votes, null, 2));
}

export const POST: RequestHandler = async ({ request }) => {
	const { id, vote } = await request.json();
	const votes = await getVotes();
	votes[id] = vote;
	await saveVotes(votes);
	return json({ success: true });
};

export const DELETE: RequestHandler = async ({ request }) => {
	const { id } = await request.json();
	const votes = await getVotes();
	delete votes[id];
	await saveVotes(votes);
	return json({ success: true });
};
