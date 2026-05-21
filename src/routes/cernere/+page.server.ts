import { readFile, readdir } from 'fs/promises';
import path from 'path';
import { marked } from 'marked';

const OUTPUTS_DIR = '/Users/d.patnaik/honeybloom/wyatt/cernere/outputs';
const SCORING_DIR = '/Users/d.patnaik/honeybloom/eva';
const TC_FEEDBACK_DIR = path.join(SCORING_DIR, 'tc-feedback');
const BOSS_FEEDBACK_DIR = path.join(SCORING_DIR, 'boss-feedback');

const CONDITIONS = ['C1', 'C2', 'C3', 'C4', 'C5'] as const;
type Condition = (typeof CONDITIONS)[number];

interface Turn {
	turn: number;
	user: string;
	assistant: string;
	tokens_used?: number;
	assistant_tokens?: number;
	director_input?: string;
	director_output?: { direction: string; environment: string | null; show_inner_voice: boolean };
	director_latency_ms?: number;
	director_tokens?: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number; input?: number; output?: number };
	actress_latency_ms?: number;
	cutter_latency_ms?: number;
	cutter_tokens?: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number; input?: number; output?: number };
	cutter_output?: {
		tier_1?: string | Record<string, string[] | null>;
		tier_2?: string | string[];
		emotion_echo?: string;
		rolling_arc_update?: string;
		rolling_arc_summary?: string;
		arc_boundary?: boolean | string;
		closed_arc?: string | null;
	};
}

interface Conversation {
	condition: string;
	actress_model?: string;
	director_model?: string;
	tc: string;
	timestamp: string;
	persona?: { name: string; archetype: string; market: string };
	turns: Turn[];
}

const conditionLabels: Record<Condition, { actress: string; director: string }> = {
	C1: { actress: 'Cydonia 24B v4.1', director: 'DeepSeek V4 Flash' },
	C2: { actress: 'Cydonia 24B v4.1', director: 'Grok 4.1 Fast' },
	C3: { actress: 'Hermes 3 70B', director: 'DeepSeek V4 Flash' },
	C4: { actress: 'Hermes 3 70B', director: 'Grok 4.1 Fast' },
	C5: { actress: 'Cydonia 24B v4.1', director: 'V4 Flash (raw \u2014 no Cutter)' },
};

const modelSettings: Record<Condition, { actress: { name: string; serving: string; params: Record<string, string> }; director: { name: string; serving: string; params: Record<string, string> } }> = {
	C1: {
		actress: {
			name: 'Cydonia 24B v4.1 (TheDrummer)',
			serving: 'OpenRouter (Parasail)',
			params: { temperature: '0.8', top_p: '0.95', max_tokens: '768', repetition_penalty: '1.05' },
		},
		director: {
			name: 'DeepSeek V4 Flash',
			serving: 'OpenRouter',
			params: { temperature: '0.3', max_tokens: '500', response_format: 'json_object' },
		},
	},
	C2: {
		actress: {
			name: 'Cydonia 24B v4.1 (TheDrummer)',
			serving: 'OpenRouter (Parasail)',
			params: { temperature: '0.8', top_p: '0.95', max_tokens: '768', repetition_penalty: '1.05' },
		},
		director: {
			name: 'Grok 4.1 Fast (x-ai)',
			serving: 'OpenRouter',
			params: { temperature: '0.3', max_tokens: '500', response_format: 'json_object', reasoning: 'disabled' },
		},
	},
	C3: {
		actress: {
			name: 'Nous Hermes 3 70B',
			serving: 'OpenRouter',
			params: { temperature: '0.8', top_p: '0.95', max_tokens: '768' },
		},
		director: {
			name: 'DeepSeek V4 Flash',
			serving: 'OpenRouter',
			params: { temperature: '0.3', max_tokens: '500', response_format: 'json_object' },
		},
	},
	C4: {
		actress: {
			name: 'Nous Hermes 3 70B',
			serving: 'OpenRouter',
			params: { temperature: '0.8', top_p: '0.95', max_tokens: '768' },
		},
		director: {
			name: 'Grok 4.1 Fast (x-ai)',
			serving: 'OpenRouter',
			params: { temperature: '0.3', max_tokens: '500', response_format: 'json_object', reasoning: 'disabled' },
		},
	},
	C5: {
		actress: {
			name: 'Cydonia 24B v4.1 (TheDrummer)',
			serving: 'OpenRouter (Parasail)',
			params: { temperature: '0.8', top_p: '0.95', max_tokens: '768', repetition_penalty: '1.05' },
		},
		director: {
			name: 'DeepSeek V4 Flash (raw — no Cutter)',
			serving: 'OpenRouter',
			params: { temperature: '0.3', max_tokens: '500', response_format: 'json_object', cutter: 'disabled' },
		},
	},
};

const sceneContexts: Record<string, { relationship: string; time: string; setting: string; context: string }> = {};

interface Manifest { run_id: string; files: Record<string, string[]> }

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

interface InlineBlock { perTurn: Record<number, string>; tcLevel: string }
type InlineFeedback = Record<Condition, InlineBlock>;

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

export async function load() {
	const conditions: Record<string, Conversation[]> = { C1: [], C2: [], C3: [], C4: [], C5: [] };
	const manifestWarnings: string[] = [];

	let manifest: Manifest | null = null;
	try {
		const raw = await readFile(path.join(OUTPUTS_DIR, 'MANIFEST.json'), 'utf-8');
		manifest = JSON.parse(raw);
	} catch {
		// No manifest yet — mock data mode. Suppress warning until BENCH-33.
	}

	for (const condition of CONDITIONS) {
		const dir = path.join(OUTPUTS_DIR, condition);
		const allowed = new Set(manifest?.files?.[condition] ?? []);
		let onDisk: string[] = [];
		try {
			onDisk = (await readdir(dir)).filter(f => f.endsWith('.json'));
		} catch {
			continue;
		}

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

	// Load Eva's per-TC feedback files
	const tcFeedbackInline: Record<string, InlineFeedback> = {};

	for (const tc of ['tc1', 'tc2', 'tc3', 'tc4', 'tc5', 'tc6', 'tc7', 'tc8']) {
		try {
			const raw = await readFile(path.join(TC_FEEDBACK_DIR, `${tc}.md`), 'utf-8');
			const inline = await parseInlineFeedback(raw);
			const tcId = tc.toUpperCase();
			tcFeedbackInline[tcId] = inline;

			// Coupling check: feedback anchors must match conversation turns
			for (const cond of CONDITIONS) {
				const block = inline[cond];
				const hasContent = Object.keys(block.perTurn).length > 0 || block.tcLevel.length > 0;
				const convo = conditions[cond].find((c: Conversation) => c.tc === tcId);

				if (convo) {
					const turnNumbers = new Set(convo.turns.map(t => t.turn));
					for (const anchor of Object.keys(block.perTurn).map(Number)) {
						if (!turnNumbers.has(anchor)) {
							manifestWarnings.push(`${cond}/${tcId} feedback references T${anchor} but no conversation turn ${anchor} exists.`);
						}
					}
					// Missing-heading check
					const condHeaderRe = new RegExp(`^##\\s+${cond}\\b[^\\n]*$`, 'm');
					const condMatch = raw.match(condHeaderRe);
					if (condMatch && condMatch.index !== undefined) {
						const startIdx = condMatch.index;
						const afterStart = raw.slice(startIdx + condMatch[0].length);
						const nextTop = afterStart.search(/\n##\s+C[1-4]\b|\n#\s/);
						const section = nextTop === -1 ? afterStart : afterStart.slice(0, nextTop);
						for (const n of turnNumbers) {
							const anchorRe = new RegExp(`^###\\s+T${n}\\s*$`, 'm');
							if (!anchorRe.test(section)) {
								manifestWarnings.push(`${cond}/${tcId} conversation has T${n} but feedback file is missing \`### T${n}\` heading.`);
							}
						}
					}
				} else if (hasContent) {
					manifestWarnings.push(`${cond}/${tcId} feedback is present but no conversation exists in ${cond}.`);
				}
			}
		} catch {
			// File may not exist yet
		}
	}

	// Load Boss's per-TC feedback files (same format as Eva's)
	const bossFeedbackInline: Record<string, InlineFeedback> = {};

	for (const tc of ['tc1', 'tc2', 'tc3', 'tc4', 'tc5', 'tc6', 'tc7', 'tc8']) {
		try {
			const raw = await readFile(path.join(BOSS_FEEDBACK_DIR, `${tc}.md`), 'utf-8');
			const inline = await parseInlineFeedback(raw);
			const tcId = tc.toUpperCase();
			bossFeedbackInline[tcId] = inline;
		} catch {
			// File may not exist yet
		}
	}

	return {
		conditions,
		sceneContexts,
		modelSettings,
		conditionLabels,
		tcFeedbackInline,
		bossFeedbackInline,
		manifestWarnings,
		manifestRunId: manifest?.run_id ?? null,
	};
}
