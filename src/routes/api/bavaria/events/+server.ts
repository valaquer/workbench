import type { RequestHandler } from './$types';
import { watch } from 'node:fs';
import { readdir } from 'node:fs/promises';

const BAVARIA_DIR = '/Users/d.patnaik/honeybloom/library/bavaria';

export const GET: RequestHandler = async () => {
	let watcher: ReturnType<typeof watch> | null = null;
	let closed = false;
	let lastCount = -1;
	let debounceTimer: ReturnType<typeof setTimeout> | null = null;

	const stream = new ReadableStream({
		async start(controller) {
			// Send initial count
			const initial = await readdir(BAVARIA_DIR).catch(() => []);
			lastCount = initial.filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f)).length;
			controller.enqueue(`data: ${JSON.stringify({ type: 'connected', count: lastCount })}\n\n`);

			// Watch for filesystem changes (debounce 200ms — macOS fires duplicates)
			watcher = watch(BAVARIA_DIR, () => {
				if (closed) return;
				if (debounceTimer) clearTimeout(debounceTimer);
				debounceTimer = setTimeout(async () => {
					try {
						const entries = await readdir(BAVARIA_DIR).catch(() => []);
						const count = entries.filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f)).length;
						if (count !== lastCount) {
							lastCount = count;
							controller.enqueue(`data: ${JSON.stringify({ type: 'change', count })}\n\n`);
						}
					} catch {
						// ignore
					}
				}, 200);
			});
		},
		cancel() {
			closed = true;
			if (debounceTimer) clearTimeout(debounceTimer);
			if (watcher) watcher.close();
		}
	});

	return new Response(stream, {
		headers: {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			'Connection': 'keep-alive'
		}
	});
};
