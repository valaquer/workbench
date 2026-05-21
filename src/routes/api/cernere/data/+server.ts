import { json } from '@sveltejs/kit';
import { readFile, readdir } from 'fs/promises';
import path from 'path';
import { marked } from 'marked';

const OUTPUTS_DIR = '/Users/d.patnaik/honeybloom/wyatt/cernere/outputs';
const SCORING_DIR = '/Users/d.patnaik/honeybloom/eva';
const TC_FEEDBACK_DIR = path.join(SCORING_DIR, 'tc-feedback');
const BOSS_FEEDBACK_DIR = path.join(SCORING_DIR, 'boss-feedback');

const CONDITIONS = ['C1', 'C2', 'C3', 'C4', 'C5'] as const;
type Condition = (typeof CONDITIONS)[number];

interface InlineBlock { perTurn: Record<number, string>; tcLevel: string }
type InlineFeedback = Record<Condition, InlineBlock>;

async function renderMd(src: string): Promise<string> {
	let html = await marked(src);
	html = html.replace(/(?<!\*)\*([^*\n<>]+?)\*(?!\*)/g, '<em>$1</em>');
	return html;
}

function isEmptyBody(body: string): boolean {
	const stripped = body.trim();
	if (!stripped) return true;
	if (/^\(empty\)$/i.test(stripped)) return true;
	return false;
}

async function parseInlineFeedback(raw: string): Promise<InlineFeedback> {
	const lines = raw.split('\n');
	const out: InlineFeedback = {
		C1: { perTurn: {}, tcLevel: '' },
		C2: { perTurn: {}, tcLevel: '' },
		C3: { perTurn: {}, tcLevel: '' },
		C4: { perTurn: {}, tcLevel: '' },
		C5: { perTurn: {}, tcLevel: '' },
	};
	let condition: Condition | null = null;
	let bucket: 'perTurn' | 'tcLevel' | null = null;
	let turnKey: number | null = null;
	let buf: string[] = [];

	const flush = async () => {
		if (!condition || !bucket) { buf = []; return; }
		const body = buf.join('\n');
		buf = [];
		if (isEmptyBody(body)) return;
		const html = await renderMd(body);
		if (bucket === 'perTurn' && turnKey !== null) {
			out[condition].perTurn[turnKey] = html;
		} else if (bucket === 'tcLevel') {
			out[condition].tcLevel = html;
		}
	};

	for (const line of lines) {
		const h2 = line.match(/^##\s+(C[1-5])\s*(?:—|–|-)?\s*(.*)$/);
		const h3 = line.match(/^###\s+T(\d+)\s*$/);
		const h1 = /^#\s/.test(line);
		if (h2) {
			await flush();
			condition = h2[1] as Condition;
			const label = (h2[2] || '').trim().toLowerCase();
			if (label === 'tc-level' || label === 'tc level') {
				bucket = 'tcLevel';
				turnKey = null;
			} else {
				bucket = null;
				turnKey = null;
			}
			continue;
		}
		if (h3 && condition) {
			await flush();
			bucket = 'perTurn';
			turnKey = parseInt(h3[1], 10);
			continue;
		}
		if (h1) {
			await flush();
			condition = null;
			bucket = null;
			turnKey = null;
			continue;
		}
		if (bucket) buf.push(line);
	}
	await flush();
	return out;
}

export async function GET() {
	const conditions: Record<string, any[]> = { C1: [], C2: [], C3: [], C4: [], C5: [] };
	const manifestWarnings: string[] = [];

	let manifest: any = null;
	try {
		const raw = await readFile(path.join(OUTPUTS_DIR, 'MANIFEST.json'), 'utf-8');
		manifest = JSON.parse(raw);
	} catch { /* no manifest yet */ }

	for (const condition of CONDITIONS) {
		const dir = path.join(OUTPUTS_DIR, condition);
		const allowed = new Set<string>(manifest?.files?.[condition] ?? []);
		let onDisk: string[] = [];
		try {
			onDisk = (await readdir(dir)).filter(f => f.endsWith('.json'));
		} catch { continue; }

		for (const file of onDisk) {
			if (!allowed.has(file)) {
				manifestWarnings.push(`${condition}/${file} is on disk but not in MANIFEST.json — ignoring.`);
			}
		}
		for (const file of allowed) {
			if (!onDisk.includes(file)) {
				manifestWarnings.push(`${condition}/${file} is in MANIFEST.json but missing from disk.`);
			}
		}
		for (const file of [...allowed].sort()) {
			if (!onDisk.includes(file)) continue;
			const raw = await readFile(path.join(dir, file), 'utf-8');
			conditions[condition].push(JSON.parse(raw));
		}
	}

	const tcFeedbackInline: Record<string, InlineFeedback> = {};
	for (const tc of ['tc1', 'tc2', 'tc3', 'tc4', 'tc5', 'tc6', 'tc7', 'tc8']) {
		try {
			const raw = await readFile(path.join(TC_FEEDBACK_DIR, `${tc}.md`), 'utf-8');
			tcFeedbackInline[tc.toUpperCase()] = await parseInlineFeedback(raw);
		} catch { /* not yet */ }
	}

	const bossFeedbackInline: Record<string, InlineFeedback> = {};
	for (const tc of ['tc1', 'tc2', 'tc3', 'tc4', 'tc5', 'tc6', 'tc7', 'tc8']) {
		try {
			const raw = await readFile(path.join(BOSS_FEEDBACK_DIR, `${tc}.md`), 'utf-8');
			bossFeedbackInline[tc.toUpperCase()] = await parseInlineFeedback(raw);
		} catch { /* not yet */ }
	}

	return json({
		conditions,
		tcFeedbackInline,
		bossFeedbackInline,
		manifestWarnings,
		manifestRunId: manifest?.run_id ?? null,
	}, {
		headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' }
	});
}
