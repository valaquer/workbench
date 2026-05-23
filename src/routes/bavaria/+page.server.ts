import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const BAVARIA_DIR = '/Users/d.patnaik/honeybloom/library/bavaria';
const MANIFEST_FILE = path.join(BAVARIA_DIR, 'bavaria-manifest.json');

const CSV009_PATH = '/Users/d.patnaik/honeybloom/library/ip/prompt-engineer-v8/CSV009-outputs.csv';
const CSV001_PATH = '/Users/d.patnaik/honeybloom/library/ip/prompt-engineer-v8/CSV001-physiques.csv';
const CSV002_PATH = '/Users/d.patnaik/honeybloom/library/ip/prompt-engineer-v8/CSV002-identities.csv';
const CSV000_PATH = '/Users/d.patnaik/honeybloom/library/ip/prompt-engineer-v8/CSV000-use-cases.csv';

interface AssetEntry {
	vote: 'approved' | 'rejected' | null;
	filename: string;
	characterCode?: string;
	useCase?: string;
	assetCode?: string;
}

interface Manifest {
	assets: Record<string, AssetEntry>;
}

interface CsvAssetRow {
	asset_id: string;
	type: string;
	use_case: string;
	date: string;
	identity: string;
	model: string;
	concept: string;
	prompt: string;
	width: number;
	height: number;
	cost: number;
	filepath: string;
	vote: string;
	destination: string;
}

interface IdentityRow {
	identity: string;
	physique: string;
}

interface PhysiqueRow {
	physique: string;
	nationality: string;
}

interface UseCaseRow {
	use_case: string;
	description: string;
}

export interface AssetMeta {
	characterName?: string;
	characterCode?: string;
	nationality?: string;
	useCase?: string;
	useCaseLabel?: string;
	concept?: string;
	model?: string;
	deployment?: string;
}

function parseCsv(text: string): string[][] {
	const rows: string[][] = [];
	let current: string[] = [];
	let field = '';
	let inQuotes = false;

	for (let i = 0; i < text.length; i++) {
		const ch = text[i];
		if (inQuotes) {
			if (ch === '"') {
				if (i + 1 < text.length && text[i + 1] === '"') {
					field += '"';
					i++;
				} else {
					inQuotes = false;
				}
			} else {
				field += ch;
			}
		} else if (ch === '"') {
			inQuotes = true;
		} else if (ch === ',') {
			current.push(field);
			field = '';
		} else if (ch === '\n' || (ch === '\r' && text[i + 1] === '\n')) {
			if (ch === '\r') i++;
			current.push(field);
			field = '';
			if (current.length > 0 && current.some(f => f.length > 0)) {
				rows.push(current);
			}
			current = [];
		} else {
			field += ch;
		}
	}
	if (field.length > 0 || current.length > 0) {
		current.push(field);
		rows.push(current);
	}
	return rows;
}

function parseCsvToObjects<T>(text: string): T[] {
	const rows = parseCsv(text);
	if (rows.length < 2) return [];
	const headers = rows[0];
	const result: T[] = [];
	for (let i = 1; i < rows.length; i++) {
		const obj: Record<string, string> = {};
		for (let j = 0; j < headers.length && j < rows[i].length; j++) {
			obj[headers[j]] = rows[i][j];
		}
		result.push(obj as unknown as T);
	}
	return result;
}

async function readCsv<T>(filePath: string): Promise<T[]> {
	try {
		const text = await readFile(filePath, 'utf-8');
		return parseCsvToObjects<T>(text);
	} catch {
		return [];
	}
}

async function loadManifest(): Promise<Manifest> {
	try {
		return JSON.parse(await readFile(MANIFEST_FILE, 'utf-8'));
	} catch {
		return { assets: {} };
	}
}

export async function load() {
	const entries = await readdir(BAVARIA_DIR).catch(() => []);
	const images = entries.filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f));
	const ids = images.map((f) => f.replace(/\.(png|jpg|jpeg|webp)$/i, ''));

	ids.sort((a, b) => a.localeCompare(b));

	const manifest = await loadManifest();

	const votes: Record<string, string> = {};
	const comments: Record<string, string> = {};
	for (const id of ids) {
		const entry = manifest.assets[id];
		if (entry?.vote) votes[id] = entry.vote;
		if (entry?.comment) comments[id] = entry.comment;
	}

	const [csvAssets, identities, physiques, useCases] = await Promise.all([
		readCsv<CsvAssetRow>(CSV009_PATH),
		readCsv<IdentityRow>(CSV002_PATH),
		readCsv<PhysiqueRow>(CSV001_PATH),
		readCsv<UseCaseRow>(CSV000_PATH),
	]);

	const identityMap = new Map(identities.map(r => [r.identity, r]));
	const physiqueMap = new Map(physiques.map(r => [r.physique, r]));
	const useCaseMap = new Map(useCases.map(r => [r.use_case, r]));

	const meta: Record<string, AssetMeta> = {};
	for (const asset of csvAssets) {
		const id = asset.asset_id;
		const ident = identityMap.get(asset.identity);
		const phys = ident ? physiqueMap.get(ident.physique) : undefined;
		const uc = useCaseMap.get(asset.use_case);

		meta[id] = {
			characterName: asset.identity,
			characterCode: ident?.physique,
			nationality: phys?.nationality,
			useCase: asset.use_case,
			useCaseLabel: uc?.description,
			concept: asset.concept,
			model: asset.model,
			deployment: asset.destination || undefined,
		};
	}

	return { ids, votes, meta, comments };
}
