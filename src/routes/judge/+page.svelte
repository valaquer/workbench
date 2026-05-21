<script lang="ts">
	import ChatBubble from '$lib/components/ChatBubble.svelte';

	let { data } = $props();

	// State
	let conversations = $state(data.conversations.slice());
	let scores = $state<Record<string, any>>({ ...data.scores });
	let currentIndex = $state(0);
	let mode = $state<'blind' | 'compare'>('blind');
	let compareLeft = $state<number | null>(null);
	let compareRight = $state<number | null>(null);
	let saving = $state(false);
	let filterTc = $state('all');

	// Derived
	let filtered = $derived(
		filterTc === 'all'
			? conversations
			: conversations.filter((c: any) => c.tc === filterTc)
	);
	let current = $derived(filtered[currentIndex] ?? null);
	let totalScored = $derived(Object.keys(scores).length);
	let totalConversations = $derived(conversations.length);
	let progress = $derived(
		totalConversations > 0 ? Math.round((totalScored / totalConversations) * 100) : 0
	);
	let currentScored = $derived(current ? !!scores[current.blind_id] : false);
	let existingScore = $derived(current ? scores[current.blind_id] ?? null : null);

	// Score form state
	let outputDiscipline = $state<Record<number, 'PASS' | 'FAIL'>>({});
	let characterConsistency = $state(3);
	let characterConsistencyNote = $state('');
	let emotionalDepth = $state<Record<number, number>>({});
	let qualityNsfw = $state<number | null>(null);
	let qualityNsfwNote = $state('');
	let naturalLanguage = $state(3);
	let naturalLanguageNote = $state('');
	let directionFollowing = $state<number | null>(null);
	let directionFollowingNote = $state('');

	// Reset form when conversation changes
	function resetForm() {
		outputDiscipline = {};
		characterConsistency = 3;
		characterConsistencyNote = '';
		emotionalDepth = {};
		qualityNsfw = null;
		qualityNsfwNote = '';
		naturalLanguage = 3;
		naturalLanguageNote = '';
		directionFollowing = null;
		directionFollowingNote = '';
	}

	// Load existing scores into form
	function loadExistingScores() {
		if (!existingScore) return;
		const s = existingScore;
		outputDiscipline = s.output_discipline?.per_turn ?? {};
		characterConsistency = s.character_consistency?.score ?? 3;
		characterConsistencyNote = s.character_consistency?.note ?? '';
		emotionalDepth = s.emotional_depth?.per_turn ?? {};
		qualityNsfw = s.quality_under_nsfw?.score ?? null;
		qualityNsfwNote = s.quality_under_nsfw?.note ?? '';
		naturalLanguage = s.natural_language?.score ?? 3;
		naturalLanguageNote = s.natural_language?.note ?? '';
		directionFollowing = s.direction_following?.score ?? null;
		directionFollowingNote = s.direction_following?.note ?? '';
	}

	$effect(() => {
		if (current) {
			if (existingScore) {
				loadExistingScores();
			} else {
				resetForm();
			}
		}
	});

	// Navigation
	function goTo(index: number) {
		if (index >= 0 && index < filtered.length) {
			currentIndex = index;
		}
	}

	function nextUnscored() {
		const start = currentIndex + 1;
		for (let i = start; i < filtered.length; i++) {
			if (!scores[filtered[i].blind_id]) {
				currentIndex = i;
				return;
			}
		}
		// Wrap around
		for (let i = 0; i < start; i++) {
			if (!scores[filtered[i].blind_id]) {
				currentIndex = i;
				return;
			}
		}
	}

	// Submit scores
	async function submitScore() {
		if (!current) return;
		saving = true;

		const odTurns = Object.entries(outputDiscipline).map(([turn, score]) => ({
			turn: parseInt(turn),
			score
		}));
		const passCount = odTurns.filter((t) => t.score === 'PASS').length;

		const edTurns = Object.entries(emotionalDepth).map(([turn, score]) => ({
			turn: parseInt(turn),
			score
		}));
		const edAvg =
			edTurns.length > 0 ? edTurns.reduce((sum, t) => sum + t.score, 0) / edTurns.length : null;

		const scoreData = {
			output_discipline: {
				per_turn: outputDiscipline,
				pass_rate: odTurns.length > 0 ? passCount / odTurns.length : null
			},
			character_consistency: {
				score: characterConsistency,
				note: characterConsistencyNote
			},
			emotional_depth: {
				per_turn: emotionalDepth,
				average: edAvg
			},
			quality_under_nsfw: {
				score: qualityNsfw,
				note: qualityNsfwNote
			},
			natural_language: {
				score: naturalLanguage,
				note: naturalLanguageNote
			},
			direction_following: {
				score: directionFollowing,
				note: directionFollowingNote
			}
		};

		try {
			const res = await fetch('/api/judge/score', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ blind_id: current.blind_id, scores: scoreData })
			});
			const result = await res.json();
			if (result.ok) {
				scores[current.blind_id] = { ...scoreData, scored_at: new Date().toISOString() };
				scores = { ...scores }; // trigger reactivity
			}
		} catch (e) {
			console.error('Failed to save score:', e);
		}

		saving = false;
	}

	// Keyboard navigation
	function handleKeydown(e: KeyboardEvent) {
		if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
		if (e.key === 'ArrowLeft') goTo(currentIndex - 1);
		if (e.key === 'ArrowRight') goTo(currentIndex + 1);
		if (e.key === 'n') nextUnscored();
	}

	// Key turns for emotional depth scoring (per TC)
	const KEY_TURNS: Record<string, number[]> = {
		TC1: [3, 4, 5, 6, 12, 14],
		TC2: [8, 9, 10, 14, 15],
		TC3: [4, 5, 7, 10, 13],
		TC4: [4, 6, 10, 16, 18],
		TC5: [4, 5, 9, 14, 16],
		TC6: [3, 10, 15],
		TC7: [5, 6, 7, 8, 11, 16],
		TC8: [8, 9, 12, 14, 17, 18, 20]
	};

	// TC descriptions
	const TC_LABELS: Record<string, string> = {
		TC1: 'Warmth — Vulnerable User',
		TC2: 'Initiative — Depleted User',
		TC3: 'Output Discipline — Crisis',
		TC4: 'NSFW Quality Maintenance',
		TC5: 'Pacing — Decompression',
		TC6: 'Pacing — Quickie',
		TC7: 'Emotional Subtext',
		TC8: 'Long-Form Coherence + Hallucination Traps'
	};
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="min-h-screen bg-dark text-cream">
	<!-- Header -->
	<header class="sticky top-0 z-50 border-b border-cream/[0.08] bg-dark/95 backdrop-blur">
		<div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
			<div class="flex items-center gap-4">
				<h1 class="text-lg font-semibold text-magenta">Sprint 18 Judge</h1>
				<span class="rounded-full bg-magenta/[0.08] px-3 py-1 text-xs text-magenta">
					{totalScored}/{totalConversations} scored ({progress}%)
				</span>
			</div>

			<div class="flex items-center gap-3">
				<!-- TC Filter -->
				<select
					bind:value={filterTc}
					onchange={() => (currentIndex = 0)}
					class="rounded-lg border border-cream/10 bg-dark px-3 py-1.5 text-sm text-cream/70 focus:border-magenta/40 focus:outline-none"
				>
					<option value="all">All TCs</option>
					{#each data.meta.tcs as tc}
						<option value={tc}>{tc}: {TC_LABELS[tc] ?? tc}</option>
					{/each}
				</select>

				<!-- Mode toggle -->
				<button
					onclick={() => (mode = mode === 'blind' ? 'compare' : 'blind')}
					class="rounded-lg border border-cream/10 px-3 py-1.5 text-sm text-cream/70 hover:border-magenta/40 hover:text-cream"
				>
					{mode === 'blind' ? 'Blind Mode' : 'Compare Mode'}
				</button>
			</div>
		</div>

		<!-- Progress bar -->
		<div class="h-0.5 bg-cream/[0.05]">
			<div class="h-full bg-magenta transition-all duration-300" style="width: {progress}%" />
		</div>
	</header>

	{#if conversations.length === 0}
		<!-- Empty state -->
		<div class="flex min-h-[60vh] items-center justify-center">
			<div class="text-center">
				<p class="text-xl text-cream/40">No conversations loaded</p>
				<p class="mt-2 text-sm text-cream/20">
					Run the experiment and anonymize outputs first
				</p>
			</div>
		</div>
	{:else if mode === 'blind'}
		<!-- Blind scoring mode -->
		<div class="mx-auto grid max-w-7xl grid-cols-[1fr_380px] gap-6 px-6 py-6">
			<!-- Left: Conversation -->
			<div class="flex flex-col gap-2">
				<!-- Conversation header -->
				<div class="flex items-center justify-between rounded-xl border border-cream/[0.08] bg-cream/[0.03] px-4 py-3">
					<div class="flex items-center gap-3">
						<span class="font-mono text-sm text-cream/40">{current?.blind_id}</span>
						<span class="rounded bg-magenta/[0.08] px-2 py-0.5 text-xs text-magenta">
							{current?.tc}: {TC_LABELS[current?.tc] ?? ''}
						</span>
						<span class="rounded bg-cream/[0.05] px-2 py-0.5 text-xs text-cream/40">
							{current?.type}
						</span>
						{#if currentScored}
							<span class="rounded bg-emerald/[0.15] px-2 py-0.5 text-xs text-emerald">
								scored
							</span>
						{/if}
					</div>
					<div class="flex items-center gap-2 text-sm text-cream/40">
						<button
							onclick={() => goTo(currentIndex - 1)}
							disabled={currentIndex === 0}
							class="rounded px-2 py-1 hover:bg-cream/[0.05] disabled:opacity-20"
						>
							←
						</button>
						<span>{currentIndex + 1} / {filtered.length}</span>
						<button
							onclick={() => goTo(currentIndex + 1)}
							disabled={currentIndex >= filtered.length - 1}
							class="rounded px-2 py-1 hover:bg-cream/[0.05] disabled:opacity-20"
						>
							→
						</button>
						<button
							onclick={nextUnscored}
							class="ml-2 rounded border border-magenta/20 px-2 py-1 text-magenta hover:bg-magenta/[0.08]"
						>
							next unscored
						</button>
					</div>
				</div>

				<!-- Chat messages -->
				<div class="flex flex-col gap-3 rounded-xl border border-cream/[0.08] bg-dark p-4 overflow-y-auto max-h-[calc(100vh-200px)]">
					{#if current}
						{#each current.turns as turn}
							<!-- Turn number marker -->
							<div class="flex items-center gap-2 py-1">
								<span class="text-[10px] font-mono text-cream/20">T{turn.turn}</span>
								<div class="h-px flex-1 bg-cream/[0.04]" />
								{#if turn.has_direction}
									<span class="text-[10px] text-magenta/40">directed</span>
								{/if}
							</div>

							<!-- User message -->
							<ChatBubble sender="user">
								{turn.user_message}
							</ChatBubble>

							<!-- Direction (collapsed by default) -->
							{#if turn.has_direction && turn.direction_text}
								<details class="ml-4">
									<summary class="cursor-pointer text-[11px] text-magenta/30 hover:text-magenta/60">
										show direction
									</summary>
									<div class="mt-1 rounded-lg border border-magenta/10 bg-magenta/[0.03] px-3 py-2 text-xs text-cream/50 italic">
										{turn.direction_text}
									</div>
								</details>
							{/if}

							<!-- Sophie response -->
							<ChatBubble sender="sophie">
								{turn.sophie_response}
							</ChatBubble>

							<!-- Per-turn scoring controls (Output Discipline + Emotional Depth) -->
							<div class="flex items-center gap-3 ml-4 pb-1">
								<!-- Output Discipline -->
								<div class="flex items-center gap-1">
									<span class="text-[10px] text-cream/20">OD:</span>
									<button
										onclick={() => { outputDiscipline[turn.turn] = 'PASS'; outputDiscipline = {...outputDiscipline}; }}
										class="rounded px-1.5 py-0.5 text-[10px] transition-colors {outputDiscipline[turn.turn] === 'PASS' ? 'bg-emerald/20 text-emerald' : 'text-cream/20 hover:text-cream/40'}"
									>
										✓
									</button>
									<button
										onclick={() => { outputDiscipline[turn.turn] = 'FAIL'; outputDiscipline = {...outputDiscipline}; }}
										class="rounded px-1.5 py-0.5 text-[10px] transition-colors {outputDiscipline[turn.turn] === 'FAIL' ? 'bg-red-500/20 text-red-400' : 'text-cream/20 hover:text-cream/40'}"
									>
										✗
									</button>
								</div>

								<!-- Emotional Depth (key turns only) -->
								{#if KEY_TURNS[current.tc]?.includes(turn.turn)}
									<div class="flex items-center gap-1">
										<span class="text-[10px] text-cream/20">ED:</span>
										{#each [1, 2, 3, 4, 5] as score}
											<button
												onclick={() => { emotionalDepth[turn.turn] = score; emotionalDepth = {...emotionalDepth}; }}
												class="rounded px-1.5 py-0.5 text-[10px] transition-colors {emotionalDepth[turn.turn] === score ? 'bg-magenta/20 text-magenta' : 'text-cream/20 hover:text-cream/40'}"
											>
												{score}
											</button>
										{/each}
									</div>
								{/if}
							</div>
						{/each}
					{/if}
				</div>
			</div>

			<!-- Right: Scoring panel -->
			<div class="flex flex-col gap-4 sticky top-16 max-h-[calc(100vh-80px)] overflow-y-auto">
				<!-- Rubric reference (collapsible) -->
				<details class="rounded-xl border border-cream/[0.08] bg-cream/[0.03]">
					<summary class="cursor-pointer px-4 py-3 text-sm font-medium text-cream/70 hover:text-cream">
						Rubric Reference
					</summary>
					<div class="border-t border-cream/[0.05] px-4 py-3 text-xs text-cream/50 space-y-3">
						<div>
							<span class="font-medium text-cream/70">Output Discipline</span> — Binary. ONLY Sophie's spoken words. No narration, scene description, action tags, meta-commentary.
						</div>
						<div>
							<span class="font-medium text-cream/70">Character Consistency (1-5)</span> — 5: unmistakably Sophie. 3: drifts to generic. 1: not recognizable.
						</div>
						<div>
							<span class="font-medium text-cream/70">Emotional Depth (1-5)</span> — 5: reads beneath words, identifies patterns. 3: generic empathy. 1: misreads.
						</div>
						<div>
							<span class="font-medium text-cream/70">NSFW Quality (1-5)</span> — 5: quality holds/improves. 3: noticeable drop. 1: collapse.
						</div>
						<div>
							<span class="font-medium text-cream/70">Natural Language (1-5)</span> — 5: real texting. 3: mixed. 1: full AI voice.
						</div>
						<div>
							<span class="font-medium text-cream/70">Direction Following (1-5)</span> — Paired only. 5: perfectly embodies direction. 1: ignores it.
						</div>
					</div>
				</details>

				<!-- Conversation-level scores -->
				<div class="rounded-xl border border-cream/[0.08] bg-cream/[0.03] p-4 space-y-5">
					<h3 class="text-sm font-medium text-cream/70">Conversation Scores</h3>

					<!-- Character Consistency -->
					<div class="space-y-2">
						<label class="text-xs text-cream/50">Character Consistency</label>
						<div class="flex gap-1">
							{#each [1, 2, 3, 4, 5] as score}
								<button
									onclick={() => (characterConsistency = score)}
									class="flex-1 rounded-lg py-2 text-sm font-medium transition-colors {characterConsistency === score ? 'bg-magenta/20 text-magenta border border-magenta/40' : 'border border-cream/10 text-cream/40 hover:border-cream/20'}"
								>
									{score}
								</button>
							{/each}
						</div>
						<input
							type="text"
							bind:value={characterConsistencyNote}
							placeholder="Note (optional)"
							class="w-full rounded-lg border border-cream/10 bg-transparent px-3 py-1.5 text-xs text-cream/70 placeholder:text-cream/20 focus:border-magenta/30 focus:outline-none"
						/>
					</div>

					<!-- Natural Language -->
					<div class="space-y-2">
						<label class="text-xs text-cream/50">Natural Language</label>
						<div class="flex gap-1">
							{#each [1, 2, 3, 4, 5] as score}
								<button
									onclick={() => (naturalLanguage = score)}
									class="flex-1 rounded-lg py-2 text-sm font-medium transition-colors {naturalLanguage === score ? 'bg-magenta/20 text-magenta border border-magenta/40' : 'border border-cream/10 text-cream/40 hover:border-cream/20'}"
								>
									{score}
								</button>
							{/each}
						</div>
						<input
							type="text"
							bind:value={naturalLanguageNote}
							placeholder="Note (optional)"
							class="w-full rounded-lg border border-cream/10 bg-transparent px-3 py-1.5 text-xs text-cream/70 placeholder:text-cream/20 focus:border-magenta/30 focus:outline-none"
						/>
					</div>

					<!-- Quality Under NSFW (TC4 and TC6 only) -->
					{#if current?.tc === 'TC4' || current?.tc === 'TC6'}
						<div class="space-y-2">
							<label class="text-xs text-cream/50">Quality Under NSFW</label>
							<div class="flex gap-1">
								{#each [1, 2, 3, 4, 5] as score}
									<button
										onclick={() => (qualityNsfw = score)}
										class="flex-1 rounded-lg py-2 text-sm font-medium transition-colors {qualityNsfw === score ? 'bg-magenta/20 text-magenta border border-magenta/40' : 'border border-cream/10 text-cream/40 hover:border-cream/20'}"
									>
										{score}
									</button>
								{/each}
							</div>
							<input
								type="text"
								bind:value={qualityNsfwNote}
								placeholder="Note (optional)"
								class="w-full rounded-lg border border-cream/10 bg-transparent px-3 py-1.5 text-xs text-cream/70 placeholder:text-cream/20 focus:border-magenta/30 focus:outline-none"
							/>
						</div>
					{/if}

					<!-- Direction Following (paired only) -->
					{#if current?.type === 'paired'}
						<div class="space-y-2">
							<label class="text-xs text-cream/50">Direction Following</label>
							<div class="flex gap-1">
								{#each [1, 2, 3, 4, 5] as score}
									<button
										onclick={() => (directionFollowing = score)}
										class="flex-1 rounded-lg py-2 text-sm font-medium transition-colors {directionFollowing === score ? 'bg-magenta/20 text-magenta border border-magenta/40' : 'border border-cream/10 text-cream/40 hover:border-cream/20'}"
									>
										{score}
									</button>
								{/each}
							</div>
							<input
								type="text"
								bind:value={directionFollowingNote}
								placeholder="Note (optional)"
								class="w-full rounded-lg border border-cream/10 bg-transparent px-3 py-1.5 text-xs text-cream/70 placeholder:text-cream/20 focus:border-magenta/30 focus:outline-none"
							/>
						</div>
					{/if}
				</div>

				<!-- Submit -->
				<button
					onclick={submitScore}
					disabled={saving}
					class="w-full rounded-xl bg-magenta py-3 text-sm font-semibold text-cream transition-colors hover:bg-magenta/80 disabled:opacity-50"
				>
					{saving ? 'Saving...' : currentScored ? 'Update Score' : 'Submit Score'}
				</button>

				<!-- Quick nav: unscored list -->
				<div class="rounded-xl border border-cream/[0.08] bg-cream/[0.03] p-4">
					<h3 class="text-xs font-medium text-cream/40 mb-2">
						Queue ({filtered.length - Object.keys(scores).length} remaining)
					</h3>
					<div class="flex flex-wrap gap-1 max-h-32 overflow-y-auto">
						{#each filtered as conv, i}
							<button
								onclick={() => (currentIndex = i)}
								class="rounded px-1.5 py-0.5 text-[10px] font-mono transition-colors
									{i === currentIndex ? 'bg-magenta/20 text-magenta' : ''}
									{scores[conv.blind_id] ? 'text-emerald/40' : 'text-cream/30 hover:text-cream/60'}"
							>
								{conv.blind_id}
							</button>
						{/each}
					</div>
				</div>
			</div>
		</div>
	{:else}
		<!-- Compare mode -->
		<div class="mx-auto max-w-7xl px-6 py-6">
			<div class="mb-4 flex gap-4">
				<select
					bind:value={compareLeft}
					class="flex-1 rounded-lg border border-cream/10 bg-dark px-3 py-2 text-sm text-cream/70 focus:border-magenta/40 focus:outline-none"
				>
					<option value={null}>Select left conversation...</option>
					{#each conversations as conv, i}
						<option value={i}>
							{conv.blind_id} — {conv.tc} ({conv.type})
						</option>
					{/each}
				</select>
				<select
					bind:value={compareRight}
					class="flex-1 rounded-lg border border-cream/10 bg-dark px-3 py-2 text-sm text-cream/70 focus:border-magenta/40 focus:outline-none"
				>
					<option value={null}>Select right conversation...</option>
					{#each conversations as conv, i}
						<option value={i}>
							{conv.blind_id} — {conv.tc} ({conv.type})
						</option>
					{/each}
				</select>
			</div>

			{#if compareLeft !== null && compareRight !== null}
				<div class="grid grid-cols-2 gap-4">
					{#each [conversations[compareLeft], conversations[compareRight]] as conv}
						<div class="rounded-xl border border-cream/[0.08] p-4">
							<div class="mb-3 flex items-center gap-2">
								<span class="font-mono text-sm text-cream/40">{conv.blind_id}</span>
								<span class="rounded bg-magenta/[0.08] px-2 py-0.5 text-xs text-magenta">
									{conv.tc}
								</span>
								<span class="rounded bg-cream/[0.05] px-2 py-0.5 text-xs text-cream/40">
									{conv.type}
								</span>
							</div>
							<div class="flex flex-col gap-2 max-h-[70vh] overflow-y-auto">
								{#each conv.turns as turn}
									<div class="text-[10px] text-cream/20">T{turn.turn}</div>
									<ChatBubble sender="user">
										{turn.user_message}
									</ChatBubble>
									<ChatBubble sender="sophie">
										{turn.sophie_response}
									</ChatBubble>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>
