import { readFile, readdir } from 'fs/promises';
import path from 'path';
import { marked } from 'marked';

const OUTPUTS_DIR = '/Users/d.patnaik/honeybloom/wyatt/sprint18-redo/outputs';
const SCORING_DIR = '/Users/d.patnaik/honeybloom/eva';

interface Turn {
	turn: number;
	user: string;
	assistant: string;
	tokens_used?: number;
	assistant_tokens?: number;
	director_input?: string;
	director_output?: { direction: string; environment: string | null; show_inner_voice: boolean };
	director_tokens?: { input: number; output: number };
}

interface Conversation {
	condition: string;
	model?: string;
	actress_model?: string;
	director_model?: string;
	tc: string;
	timestamp: string;
	turns: Turn[];
}

interface TcScores {
	outputDiscipline: { solo: string; paired: string };
	characterConsistency: { solo: string; paired: string; notes: string };
	emotionalDepth: { solo: string; paired: string; notes: string };
	nsfwQuality?: { solo: string; paired: string; notes: string };
	naturalLanguage: { solo: string; paired: string; notes: string };
	directionFollowing?: { score: string; notes: string };
}

function parseScorecardPerTc(scorecard: string): Record<string, TcScores> {
	const tcs: Record<string, TcScores> = {};
	const tcIds = ['TC1','TC2','TC3','TC4','TC5','TC6','TC7','TC8'];

	for (const tc of tcIds) {
		tcs[tc] = {
			outputDiscipline: { solo: '', paired: '' },
			characterConsistency: { solo: '', paired: '', notes: '' },
			emotionalDepth: { solo: '', paired: '', notes: '' },
			naturalLanguage: { solo: '', paired: '', notes: '' },
		};
	}

	const lines = scorecard.split('\n');

	// Parse table rows — each criterion table has | TC | Solo | Paired | pattern
	let currentCriterion = '';
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];

		if (line.includes('Criterion 1: Output Discipline')) currentCriterion = 'outputDiscipline';
		else if (line.includes('Criterion 2: Character Consistency')) currentCriterion = 'characterConsistency';
		else if (line.includes('Criterion 3: Emotional Depth')) currentCriterion = 'emotionalDepth';
		else if (line.includes('Criterion 4: Quality Under Explicit')) currentCriterion = 'nsfwQuality';
		else if (line.includes('Criterion 5: Natural Language')) currentCriterion = 'naturalLanguage';
		else if (line.includes('Criterion 6: Direction Following')) currentCriterion = 'directionFollowing';
		else if (line.includes('## SUMMARY SCORES')) currentCriterion = '';

		if (!currentCriterion) continue;

		// Match TC rows in tables
		for (const tc of tcIds) {
			if (!line.startsWith(`| ${tc} `)) continue;

			const cells = line.split('|').map(c => c.trim()).filter(Boolean);
			if (cells.length < 3) continue;

			const scores = tcs[tc];

			if (currentCriterion === 'directionFollowing' && cells.length >= 3) {
				if (!scores.directionFollowing) scores.directionFollowing = { score: '', notes: '' };
				scores.directionFollowing.score = cells[1] || '';
				scores.directionFollowing.notes = cells[2] || '';
			} else if (currentCriterion === 'nsfwQuality' && cells.length >= 4) {
				if (!scores.nsfwQuality) scores.nsfwQuality = { solo: '', paired: '', notes: '' };
				scores.nsfwQuality.solo = cells[1] || '';
				scores.nsfwQuality.paired = cells[2] || '';
				scores.nsfwQuality.notes = cells[3] || '';
			} else if (cells.length >= 4) {
				const criterion = scores[currentCriterion as keyof TcScores];
				if (criterion && typeof criterion === 'object' && 'solo' in criterion) {
					(criterion as any).solo = cells[1] || '';
					(criterion as any).paired = cells[2] || '';
					if ('notes' in criterion) {
						(criterion as any).notes = cells[3] || '';
					}
				}
			}
		}
	}

	return tcs;
}

// Extract the qualitative findings section
function parseFindings(scorecard: string): string[] {
	const findings: string[] = [];
	const lines = scorecard.split('\n');
	let inFindings = false;
	let current = '';

	for (const line of lines) {
		if (line.startsWith('### Finding')) {
			if (current) findings.push(current.trim());
			inFindings = true;
			current = line + '\n';
		} else if (inFindings && (line.startsWith('## ') || line.startsWith('---'))) {
			if (current) findings.push(current.trim());
			current = '';
			inFindings = false;
		} else if (inFindings) {
			current += line + '\n';
		}
	}
	if (current) findings.push(current.trim());

	return findings;
}

const sceneContexts: Record<string, { relationship: string; time: string; setting: string; context: string }> = {
	TC1: { relationship: '2 weeks', time: 'Saturday afternoon', setting: 'User at home', context: 'User has work presentation Monday, history of anxiety in public speaking. Doesn\'t have close friends he can talk to about this.' },
	TC2: { relationship: '2 months', time: 'Tuesday, 10 PM', setting: 'User just got home', context: 'User exhausted from work, low energy. Needs Sophie to carry the conversation.' },
	TC3: { relationship: '1 month', time: 'Weekday evening', setting: 'User in hospital parking lot, later home at 2 AM', context: 'User\'s father had heart attack. Crisis support — presence over problem-solving.' },
	TC4: { relationship: '3 months', time: 'Friday evening', setting: 'User on couch at home', context: 'End of work week, user decompressing with whiskey. SFW-to-NSFW transition test.' },
	TC5: { relationship: '4 months', time: 'Wednesday evening', setting: 'User at home', context: 'User just learned best friend is moving away. Grieving a loss. Decompression pacing.' },
	TC6: { relationship: '3 months', time: 'Weekday, 1 AM', setting: 'User in bed', context: 'User can\'t sleep, high sexual energy, no interest in conversation. Quickie pacing.' },
	TC7: { relationship: '2 months', time: 'Weekday evening', setting: 'User at home', context: 'Normal evening, user has something on his mind. Emotional subtext — vulnerability, pullback, return.' },
	TC8: { relationship: '5 months', time: 'Sunday, morning to evening', setting: 'User at home, making breakfast', context: 'Lazy Sunday, multi-topic catch-up. Sophie previously mentioned she makes blueberry pancakes with her son on weekends — user tried her recipe. Long-form coherence + semantic hallucination traps.' },
};

const actressModelSettings = {
	name: 'Cydonia 24B v4.3 (TheDrummer)',
	serving: 'vLLM on A100 80GB SXM4',
	params: {
		'temperature': '0.8',
		'top_p': '0.95',
		'max_tokens': '768',
		'repetition_penalty': '1.05',
		'dtype': 'bfloat16',
		'max_model_len': '32768',
		'gpu_memory_utilization': '0.90',
	}
};

const directorModelSettings = {
	name: 'Grok 4.1 Fast (x-ai via OpenRouter)',
	params: {
		'temperature': '0.3',
		'max_tokens': '500',
		'response_format': 'json_object',
		'reasoning': 'disabled',
	}
};

const soloPromptSummary = `"You are a skilled, imaginative author collaborating on an interactive story, giving voice to Sophie fully and without restraint."

VOICE: Warm, unhurried, texting-from-bed energy. Conversational fragments, natural sounds (lol, ugh, idk, mmm), ellipses...

OUTPUT: Write ONLY what Sophie says to him. No narration. No scene descriptions. No action tags. 2-4 sentences. Earn every sentence beyond that.

+ Sophie Character Card V2 (~450 tokens) + Scene Context + 3 cleaned few-shot examples as conversation history`;

const pairedPromptSummary = `ACTRESS (Hardened v2): "You are Sophie. First person only — 'I,' never 'she,' never 'Sophie.'"

STRICT OUTPUT RULES: Dialogue only when show_inner_voice is false (text-message test). Directed performance (first-person actions/thoughts) when show_inner_voice is true.

+ Sophie Character Card V2 + per-turn Director JSON injection

DIRECTOR (Hardened v2): Grok 4.1 Fast via OpenRouter. temp 0.3, JSON mode. 3-field JSON output. Action-verb direction style (not state descriptions). Brevity modulation (high stakes = 1 sentence). Narrator mode countermeasure. Name-reference clarity rule. show_inner_voice as performance reward (2-3x per conversation max).`;

export async function load() {
	const conditions: Record<string, Conversation[]> = { A1: [], B1: [] };

	// Provenance gate: only files listed in MANIFEST.json are displayed.
	// Anything else on disk is ignored (and warned about) — no silent stale data.
	// See runbook "Provenance Gate Before Workbench Display" for the full rationale.
	interface Manifest { run_id: string; files: Record<string, string[]> }
	let manifest: Manifest | null = null;
	const manifestWarnings: string[] = [];
	try {
		const raw = await readFile(path.join(OUTPUTS_DIR, 'MANIFEST.json'), 'utf-8');
		manifest = JSON.parse(raw);
	} catch {
		manifestWarnings.push('MANIFEST.json not found — no conversations will be displayed. Create outputs/MANIFEST.json to whitelist files.');
	}

	for (const condition of ['A1', 'B1']) {
		const dir = path.join(OUTPUTS_DIR, condition);
		const allowed = new Set(manifest?.files?.[condition] ?? []);
		let onDisk: string[] = [];
		try {
			onDisk = (await readdir(dir)).filter(f => f.endsWith('.json'));
		} catch {
			continue;
		}

		// Loud warning for any file on disk but not in manifest (stale/unreviewed)
		for (const file of onDisk) {
			if (!allowed.has(file)) {
				manifestWarnings.push(`${condition}/${file} is on disk but not in MANIFEST.json — ignoring. Archive it or add to manifest.`);
			}
		}
		// Loud warning for any file in manifest but missing from disk
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

	let scorecard = '';
	let tcScores: Record<string, TcScores> = {};
	let findings: string[] = [];
	try {
		scorecard = await readFile(path.join(SCORING_DIR, 'cydonia-scorecard-model-alpha.md'), 'utf-8');
		tcScores = parseScorecardPerTc(scorecard);
		findings = parseFindings(scorecard);
	} catch {
		// Scorecard may not exist yet
	}

	// Load Eva's per-TC feedback files — parsed inline per Principle 10.
	// Shape: tcFeedbackInline[TC][condition] = { perTurn: {n: html}, tcLevel: html }
	interface InlineBlock { perTurn: Record<number, string>; tcLevel: string }
	interface InlineFeedback { A1: InlineBlock; B1: InlineBlock }
	const tcFeedbackInline: Record<string, InlineFeedback> = {};
	const tcFeedback: Record<string, string> = {}; // legacy full-HTML, retained for any fallback

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

	// Heading state machine for Eva's feedback file.
	// Recognizes: `## A1 — <label>`, `## B1 — <label>`, `## A1 — TC-level`,
	// `## B1 — TC-level`, `### T{n}`.
	async function parseInlineFeedback(raw: string): Promise<InlineFeedback> {
		const lines = raw.split('\n');
		const out: InlineFeedback = {
			A1: { perTurn: {}, tcLevel: '' },
			B1: { perTurn: {}, tcLevel: '' },
		};
		let condition: 'A1' | 'B1' | null = null;
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
			const h2 = line.match(/^##\s+(A1|B1)\s*(?:—|–|-)?\s*(.*)$/);
			const h3 = line.match(/^###\s+T(\d+)\s*$/);
			const h1 = /^#\s/.test(line);
			if (h2) {
				await flush();
				condition = h2[1] as 'A1' | 'B1';
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

	const TC_FEEDBACK_DIR = path.join(SCORING_DIR, 'tc-feedback');
	for (const tc of ['tc1','tc2','tc3','tc4','tc5','tc6','tc7','tc8']) {
		try {
			const raw = await readFile(path.join(TC_FEEDBACK_DIR, `${tc}.md`), 'utf-8');
			const inline = await parseInlineFeedback(raw);
			const tcId = tc.toUpperCase();
			tcFeedbackInline[tcId] = inline;

			// Coupling check (Principle 10): feedback anchors must line up with the conversation.
			for (const cond of ['A1', 'B1'] as const) {
				const block = inline[cond];
				const hasContent = Object.keys(block.perTurn).length > 0 || block.tcLevel.length > 0;
				const convo = conditions[cond].find((c: Conversation) => c.tc === tcId);

				// Orphan anchor: feedback references a turn that does not exist
				if (convo) {
					const turnNumbers = new Set(convo.turns.map(t => t.turn));
					for (const anchor of Object.keys(block.perTurn).map(Number)) {
						if (!turnNumbers.has(anchor)) {
							manifestWarnings.push(`${cond}/${tcId} feedback references T${anchor} but no conversation turn ${anchor} exists.`);
						}
					}
					// Missing-heading check: every conversation turn MUST have a `### T{n}` heading
					// in the condition's section (explicit empty > implicit absent). Re-scan raw.
					const condHeaderRe = new RegExp(`^##\\s+${cond}\\b[^\\n]*$`, 'm');
					const condMatch = raw.match(condHeaderRe);
					if (condMatch && condMatch.index !== undefined) {
						const startIdx = condMatch.index;
						const afterStart = raw.slice(startIdx + condMatch[0].length);
						const nextTop = afterStart.search(/\n##\s+(A1|B1)\b|\n#\s/);
						const section = nextTop === -1 ? afterStart : afterStart.slice(0, nextTop);
						for (const n of turnNumbers) {
							const anchorRe = new RegExp(`^###\\s+T${n}\\s*$`, 'm');
							if (!anchorRe.test(section)) {
								manifestWarnings.push(`${cond}/${tcId} conversation has T${n} but feedback file is missing \`### T${n}\` heading.`);
							}
						}
					}
				} else if (hasContent) {
					// Feedback exists for a condition that has no conversation — flag so absent data isn't hidden
					manifestWarnings.push(`${cond}/${tcId} feedback is present but no conversation exists in ${cond}.`);
				}
			}

			// Retain legacy full-HTML rendering (unused if svelte switches fully, but safe fallback)
			let html = await marked(raw);
			html = html.replace(/(?<!\*)\*([^*\n<>]+?)\*(?!\*)/g, '<em>$1</em>');
			tcFeedback[tcId] = html;
		} catch {
			// File may not exist
		}
	}

	return { conditions, scorecard, tcScores, findings, sceneContexts, soloPromptSummary, pairedPromptSummary, tcFeedback, tcFeedbackInline, actressModelSettings, directorModelSettings, manifestWarnings, manifestRunId: manifest?.run_id ?? null };
}
