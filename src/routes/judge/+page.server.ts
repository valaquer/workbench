import { readFile } from 'fs/promises';
import path from 'path';

const JUDGE_DATA_DIR = path.resolve('static/judge-data');
const SCORES_FILE = path.join(JUDGE_DATA_DIR, '.scores.json');

export async function load() {
	// Load anonymized conversations
	let conversations: any[] = [];
	try {
		const raw = await readFile(path.join(JUDGE_DATA_DIR, 'conversations.json'), 'utf-8');
		conversations = JSON.parse(raw);
	} catch {
		// No data yet — execution hasn't run
	}

	// Load metadata
	let meta = { total_conversations: 0, tcs: [] as string[], types: [] as string[] };
	try {
		const raw = await readFile(path.join(JUDGE_DATA_DIR, 'meta.json'), 'utf-8');
		meta = JSON.parse(raw);
	} catch {}

	// Load existing scores
	let scores: Record<string, any> = {};
	try {
		const raw = await readFile(SCORES_FILE, 'utf-8');
		scores = JSON.parse(raw);
	} catch {}

	return { conversations, meta, scores };
};
