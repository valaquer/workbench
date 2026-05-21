import { json, error, type RequestEvent } from '@sveltejs/kit';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const JUDGE_DATA_DIR = path.resolve('static/judge-data');
const SCORES_FILE = path.join(JUDGE_DATA_DIR, '.scores.json');

async function loadScores(): Promise<Record<string, any>> {
	try {
		return JSON.parse(await readFile(SCORES_FILE, 'utf-8'));
	} catch {
		return {};
	}
}

export async function POST({ request }: RequestEvent) {
	const body = await request.json();
	const { blind_id, scores: scoreData } = body;

	if (!blind_id || !scoreData) {
		throw error(400, 'Missing blind_id or scores');
	}

	const allScores = await loadScores();
	allScores[blind_id] = {
		...scoreData,
		scored_at: new Date().toISOString()
	};

	await writeFile(SCORES_FILE, JSON.stringify(allScores, null, '\t'));
	return json({ ok: true, total_scored: Object.keys(allScores).length });
}

export async function DELETE({ request }: RequestEvent) {
	const { blind_id } = await request.json();

	if (!blind_id) {
		throw error(400, 'Missing blind_id');
	}

	const allScores = await loadScores();
	delete allScores[blind_id];
	await writeFile(SCORES_FILE, JSON.stringify(allScores, null, '\t'));
	return json({ ok: true });
}
