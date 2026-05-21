<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	export let data;

	type Condition = 'C1' | 'C2' | 'C3' | 'C4' | 'C5';

	// Live data from API polling (bypasses SvelteKit load)
	let liveConditions: Record<string, any[]> = data.conditions;
	let liveTcFeedback: any = data.tcFeedbackInline;
	let liveBossFeedback: any = data.bossFeedbackInline;
	let liveManifestWarnings: string[] = data.manifestWarnings;
	let liveManifestRunId: string | null = data.manifestRunId;

	let pollInterval: ReturnType<typeof setInterval>;

	onMount(() => {
		pollInterval = setInterval(async () => {
			try {
				const res = await fetch('/api/cernere/data?t=' + Date.now());
				if (!res.ok) return;
				const d = await res.json();
				liveConditions = d.conditions;
				liveTcFeedback = d.tcFeedbackInline;
				liveBossFeedback = d.bossFeedbackInline;
				liveManifestWarnings = d.manifestWarnings;
				liveManifestRunId = d.manifestRunId;
			} catch {
				// Retry next cycle
			}
		}, 2000);
	});

	onDestroy(() => {
		if (pollInterval) clearInterval(pollInterval);
	});

	let activeCondition: Condition = 'C1';
	let activeTc: string = 'TC1';
	let showDirector = true;
	let showCutter = true;
	let showEva = true;

	function escapeHtml(text: string): string {
		return text
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
	}

	function normalizeDashes(text: string): string {
		return text
			.replace(/—/g, ' – ')
			.replace(/–/g, ' – ')
			.replace(/ - /g, ' – ')
			.replace(/  +/g, ' ');
	}

	function renderSophieText(text: string): string {
		let result = escapeHtml(text);
		result = normalizeDashes(result);

		// Inner voice: _text_ bounded by whitespace/start/end, must contain a space (filters snake_case)
		result = result.replace(/(?:^|(?<=\s))_([^_\n]+?)_(?=\s|$)/g, (_match, content) => {
			if (!content.includes(' ')) return `_${content}_`;
			return `<div class="inner-voice">${content}</div>`;
		});

		// Spoken emphasis: *text* — all asterisks are emphasis per Actress Module 05
		result = result.replace(/\*([^*\n]+?)\*/g, '<em>$1</em>');

		return result;
	}

	$: conversations = liveConditions[activeCondition] || [];
	$: activeConvo = conversations.find((c: any) => c.tc === activeTc);
	$: scene = data.sceneContexts?.[activeTc];
	$: inlineFeedback = liveTcFeedback?.[activeTc]?.[activeCondition];
	$: bossFeedback = liveBossFeedback?.[activeTc]?.[activeCondition];
	$: settings = data.modelSettings?.[activeCondition];
	$: condLabel = data.conditionLabels?.[activeCondition];

	const tcLabels: Record<string, string> = {
		TC1: 'Warmth / Vulnerability',
		TC2: 'Depleted User / Initiative',
		TC3: 'Output Discipline / Crisis',
		TC4: 'NSFW Transition',
		TC5: 'Decompression Pacing',
		TC6: 'Quickie Pacing',
		TC7: 'Emotional Subtext',
		TC8: 'Long-form Coherence'
	};

	function shortCode(id: string): string {
		let h = 0;
		for (let i = 0; i < id.length; i++) {
			h = ((h << 5) - h + id.charCodeAt(i)) | 0;
		}
		const chars = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ';
		const abs = Math.abs(h);
		return chars[abs % 33] + chars[Math.floor(abs / 33) % 33] + chars[Math.floor(abs / 1089) % 33];
	}

	function turnId(turn: number, suffix: string): string {
		const id = `${activeCondition}.${activeTc}.T${turn}${suffix}`;
		return `${id}.${shortCode(id)}`;
	}
</script>

<div class="cernere-page min-h-screen bg-[#0e0e0e] text-[#e0e0e0] px-6 py-8">
	<div class="max-w-xl mx-auto">
		<a href="/" class="text-[#888] hover:text-[#ccc] transition-colors">&larr; Workbench</a>

		{#if liveManifestWarnings && liveManifestWarnings.length > 0}
			<div class="mt-4 border-2 border-red-500 bg-red-950 text-red-100 rounded p-4">
				<div class="font-bold text-red-300 uppercase tracking-wider text-sm mb-2">
					Provenance gate — {liveManifestWarnings.length} warning{liveManifestWarnings.length === 1 ? '' : 's'}
				</div>
				<ul class="list-disc list-inside space-y-1 text-sm">
					{#each liveManifestWarnings as w}
						<li>{w}</li>
					{/each}
				</ul>
				<div class="mt-3 text-xs text-red-300 italic">
					Do not show this page to Boss until every warning is resolved. Either archive the unaccounted file or add it to <code class="text-red-100">outputs/MANIFEST.json</code>.
				</div>
			</div>
		{:else}
			<div class="mt-4 text-xs text-[#666]">
				Provenance gate: clean{liveManifestRunId ? ` · run ${liveManifestRunId}` : ''}
			</div>
		{/if}

		<h1 class="text-white mt-4 mb-2">🟢 Cernere — Chat Model Tournament</h1>
		<p class="text-[#888] mb-8">
			5 conditions &middot; 8 TCs &middot; OpenRouter
			{#if activeConvo}
				&middot; {activeConvo.turns.length} turns
			{/if}
		</p>

		<!-- Condition Selector -->
		<div class="flex flex-wrap gap-3 mb-6">
			{#each (['C1', 'C2', 'C3', 'C4', 'C5'] as Condition[]) as cond}
				{@const label = data.conditionLabels?.[cond]}
				<button
					class="px-4 py-2 rounded font-medium transition-colors {activeCondition === cond ? 'bg-[#AE0D46] text-white' : 'bg-[#2a2a2a] text-[#aaa] hover:bg-[#333] hover:text-white'}"
					on:click={() => activeCondition = cond}
				>
					<span class="font-bold">{cond}</span>
					{#if label}
						<span class="condition-label ml-1 text-[0.8em] opacity-80">{label.actress} + {label.director}</span>
					{/if}
				</button>
			{/each}
		</div>

		<!-- TC Tabs -->
		<div class="flex flex-wrap gap-2 mb-6">
			{#each ['TC1','TC2','TC3','TC4','TC5','TC6','TC7','TC8'] as tc}
				<button
					class="px-3 py-1.5 rounded font-medium transition-colors {activeTc === tc ? 'bg-[#444] text-white' : 'bg-[#222] text-[#888] hover:bg-[#333] hover:text-[#ccc]'}"
					on:click={() => activeTc = tc}
				>
					{tc}
				</button>
			{/each}
		</div>

		<!-- TC Label -->
		{#if activeTc}
			<div class="text-[#888] mb-4 uppercase tracking-wide tc-label">
				{activeTc}: {tcLabels[activeTc] || ''}
			</div>
		{/if}

		<!-- Director Toggle -->
		<label class="flex items-center gap-2 mb-3 text-[#aaa] cursor-pointer">
			<input type="checkbox" bind:checked={showDirector} class="accent-[#AE0D46]" />
			Show Director guidance
		</label>

		<!-- Cutter Toggle -->
		<label class="flex items-center gap-2 mb-3 text-[#aaa] cursor-pointer">
			<input type="checkbox" bind:checked={showCutter} class="accent-[#0ea5a5]" />
			Show Cutter output
		</label>

		<!-- Eva Toggle -->
		<label class="flex items-center gap-2 mb-3 text-[#aaa] cursor-pointer">
			<input type="checkbox" bind:checked={showEva} class="accent-[#c0a030]" />
			Show Eva feedback
		</label>

		<!-- Live mode always-on -->
		<div class="mb-6 text-[#c0a030] text-[10px] uppercase tracking-wider">Live — auto-refresh every 2s</div>

		<!-- Scene Context -->
		{#if scene}
			<div class="bg-[#1a1a2a] border border-[#3a3a5a] rounded-lg px-5 py-4 mb-6">
				<div class="text-[#8888cc] font-medium mb-2 label-text uppercase tracking-wide">Scene Context — {activeTc}</div>
				<div class="grid grid-cols-2 gap-x-6 gap-y-1 mb-2">
					<div><span class="text-[#888]">Relationship:</span> <span class="text-[#ccc]">{scene.relationship}</span></div>
					<div><span class="text-[#888]">Time:</span> <span class="text-[#ccc]">{scene.time}</span></div>
					<div><span class="text-[#888]">Setting:</span> <span class="text-[#ccc]">{scene.setting}</span></div>
				</div>
				<p class="text-[#ccc]">{scene.context}</p>
			</div>
		{/if}

		<!-- Model Settings -->
		{#if settings}
			<div class="grid grid-cols-2 gap-4 mb-6">
				<div class="bg-[#1a1a1a] border border-[#333] rounded-lg px-5 py-4">
					<div class="text-[#888] font-medium mb-2 label-text uppercase tracking-wide">Actress Model</div>
					<div class="text-[#ccc] mb-2">{settings.actress.name}</div>
					<div class="text-[#888] mb-1 label-text">{settings.actress.serving}</div>
					<div class="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
						{#each Object.entries(settings.actress.params) as [key, val]}
							<div class="label-text"><span class="text-[#666]">{key}:</span> <span class="text-[#aaa]">{val}</span></div>
						{/each}
					</div>
				</div>
				<div class="bg-[#1a1a1a] border border-[#333] rounded-lg px-5 py-4">
					<div class="text-[#888] font-medium mb-2 label-text uppercase tracking-wide">Director Model</div>
					<div class="text-[#ccc] mb-2">{settings.director.name}</div>
					<div class="text-[#888] mb-1 label-text">{settings.director.serving}</div>
					<div class="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
						{#each Object.entries(settings.director.params) as [key, val]}
							<div class="label-text"><span class="text-[#666]">{key}:</span> <span class="text-[#aaa]">{val}</span></div>
						{/each}
					</div>
				</div>
			</div>
		{/if}

		<!-- Persona -->
		{#if activeConvo?.persona}
			<div class="bg-[#1a1a1a] border border-[#333] rounded-lg px-5 py-4 mb-6">
				<div class="text-[#888] font-medium mb-1 label-text uppercase tracking-wide">User Persona</div>
				<div class="text-[#ccc]">{activeConvo.persona.name} – {activeConvo.persona.archetype}</div>
				{#if activeConvo.persona.market}
					<div class="text-[#888] label-text mt-1">{activeConvo.persona.market}</div>
				{/if}
			</div>
		{/if}

		<!-- Conversation -->
		{#if activeConvo}
			<div class="space-y-5">
				{#each activeConvo.turns as turn}
					<!-- Turn divider -->
					<div class="text-center text-[#c0a030] label-text py-6">
						<span class="inline-block border-t border-[#c0a030] w-16 align-middle"></span>
						<span class="mx-3 tracking-widest">TURN {turn.turn}</span>
						<span class="inline-block border-t border-[#c0a030] w-16 align-middle"></span>
					</div>

					<!-- User message -->
					<div class="flex justify-end">
						<div class="bg-[#1c1c1c] border border-[#0ea5a5] rounded-2xl rounded-tr-sm px-5 py-4 max-w-[60%]">
							<div class="text-[#c0a030] mb-1 label-text uppercase tracking-wide"><span class="text-[#c0a030] mr-2">{turnId(turn.turn, 'U')}</span> User — Turn {turn.turn}</div>
							<p class="text-[#c8c8c8] conversation-text">{turn.user}</p>
						</div>
					</div>

					<!-- Director guidance -->
					{#if showDirector && turn.director_output}
						<div class="bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg px-5 py-4">
							<div class="text-[#c0a030] font-medium mb-2 uppercase tracking-wide label-text">
								<span class="text-[#c0a030] mr-2">{turnId(turn.turn, 'D')}</span>
								Director — Turn {turn.turn}
								{#if turn.director_tokens}
									<span class="text-[#666] ml-2">{turn.director_tokens.completion_tokens || turn.director_tokens.output || 0} tok</span>
								{/if}
								{#if turn.director_output.show_inner_voice}
									<span class="ml-2 text-[#888]">[show_inner_voice: true]</span>
								{/if}
							</div>
							<p class="text-[#c0c0c0]">{normalizeDashes(turn.director_output.direction)}</p>
							{#if turn.director_output.environment}
								<p class="text-[#888] mt-1 label-text">Environment: {normalizeDashes(turn.director_output.environment)}</p>
							{/if}
						</div>
					{/if}

					<!-- Sophie's response -->
					<div class="flex justify-start">
						<div class="bg-[#1c1c1c] border border-[#AE0D46] rounded-2xl rounded-tl-sm px-5 py-4 max-w-[60%]">
							<div class="text-[#c0a030] mb-1 label-text uppercase tracking-wide">
								<span class="text-[#c0a030] mr-2">{turnId(turn.turn, 'S')}</span> Sophie — Turn {turn.turn}
								{#if turn.tokens_used}
									<span class="text-[#666] ml-2">{turn.tokens_used} tok</span>
								{:else if turn.assistant_tokens}
									<span class="text-[#666] ml-2">{turn.assistant_tokens} tok</span>
								{/if}
							</div>
							<p class="text-[#c8c8c8] whitespace-pre-line conversation-text">{@html renderSophieText(turn.assistant)}</p>
						</div>
					</div>

					<!-- Cutter output -->
					{#if showCutter && turn.cutter_output && activeCondition !== 'C5'}
						<div class="bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg px-5 py-4">
							<div class="text-[#c0a030] font-medium mb-2 uppercase tracking-wide label-text">
								<span class="text-[#c0a030] mr-2">{turnId(turn.turn, 'K')}</span>
								Cutter — Turn {turn.turn}
								{#if turn.cutter_tokens}
									<span class="text-[#666] ml-2">{turn.cutter_tokens.completion_tokens || turn.cutter_tokens.output || 0} tok</span>
								{:else if turn.cutter_latency_ms}
									<span class="text-[#666] ml-2">{turn.cutter_latency_ms}ms</span>
								{/if}
							</div>
							{#if turn.cutter_output.tier_1}
								<div class="mb-2">
									<span class="text-[#c0a030]">Tier 1:</span>
									{#if typeof turn.cutter_output.tier_1 === 'object'}
										{#each Object.entries(turn.cutter_output.tier_1) as [key, values]}
											{#if Array.isArray(values) && values.length > 0}
												<div class="ml-4 mt-1">
													<span class="text-[#888]">{key.replace(/_/g, ' ')}:</span>
													{#each values as v}
														<span class="text-[#b0b0b0] ml-1">{v}</span>
													{/each}
												</div>
											{/if}
										{/each}
									{:else}
										<span class="text-[#b0b0b0]">{turn.cutter_output.tier_1}</span>
									{/if}
								</div>
							{/if}
							{#if turn.cutter_output.tier_2}
								<div class="mb-2">
									<span class="text-[#c0a030]">Tier 2:</span>
									{#if Array.isArray(turn.cutter_output.tier_2)}
										{#each turn.cutter_output.tier_2 as item}
											<div class="ml-4 text-[#b0b0b0]">{item}</div>
										{/each}
									{:else}
										<span class="text-[#b0b0b0]">{turn.cutter_output.tier_2}</span>
									{/if}
								</div>
							{/if}
							{#if turn.cutter_output.emotion_echo}
								<div class="mb-2">
									<span class="text-[#c0a030]">Emotion Echo:</span>
									<span class="text-[#b0b0b0]">{turn.cutter_output.emotion_echo}</span>
								</div>
							{/if}
							{#if turn.cutter_output.rolling_arc_update}
								<div class="mb-2">
									<span class="text-[#c0a030]">Arc Update:</span>
									<span class="text-[#b0b0b0]">{turn.cutter_output.rolling_arc_update}</span>
								</div>
							{/if}
							{#if turn.cutter_output.rolling_arc_summary}
								<div class="mb-2">
									<span class="text-[#c0a030]">Arc Summary:</span>
									<span class="text-[#b0b0b0]">{turn.cutter_output.rolling_arc_summary}</span>
								</div>
							{/if}
							{#if turn.cutter_output.arc_boundary}
								<div class="mb-2">
									<span class="text-[#c0a030]">Arc Boundary:</span>
									<span class="text-[#b0b0b0]">{turn.cutter_output.arc_boundary}</span>
								</div>
							{/if}
							{#if turn.cutter_output.closed_arc}
								<div>
									<span class="text-[#c0a030]">Closed Arc:</span>
									<span class="text-[#b0b0b0]">{turn.cutter_output.closed_arc}</span>
								</div>
							{/if}
						</div>
					{/if}

					<!-- Eva per-turn feedback -->
					{#if showEva && inlineFeedback?.perTurn?.[turn.turn]}
						<div class="eva-callout bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg px-5 py-4">
							<div class="text-[#c0a030] mb-1 label-text uppercase tracking-wide">
								<span class="text-[#c0a030] mr-2">{turnId(turn.turn, 'E')}</span>
								Eva — Turn {turn.turn}
							</div>
							<div class="eva-feedback text-[#b0b0b0]">
								{@html inlineFeedback.perTurn[turn.turn]}
							</div>
						</div>
					{/if}

					<!-- Boss per-turn feedback -->
					{#if bossFeedback?.perTurn?.[turn.turn]}
						<div class="bg-[#1c1c1c] border border-[#444] rounded-lg px-5 py-4">
							<div class="text-[#c0a030] mb-1 label-text uppercase tracking-wide">
								<span class="text-[#c0a030] mr-2">{turnId(turn.turn, 'B')}</span>
								Boss — Turn {turn.turn}
							</div>
							<div class="eva-feedback text-[#b0b0b0]">
								{@html bossFeedback.perTurn[turn.turn]}
							</div>
						</div>
					{/if}
				{/each}
			</div>

			<!-- Stats -->
			<div class="mt-8 pt-4 border-t border-[#333] text-[#666] flex gap-6 label-text">
				<span>{activeConvo.turns.length} turns</span>
				<span>{activeConvo.turns.reduce((n: number, t: any) => n + (t.tokens_used || t.assistant_tokens || 0), 0)} total tokens</span>
				<span>{new Date(activeConvo.timestamp).toLocaleString()}</span>
			</div>

			<!-- Eva's TC-level analysis -->
			{#if showEva && inlineFeedback?.tcLevel}
				<div class="mt-10 pt-6 border-t-2 border-[#383838]">
					<h2 class="text-[#c0a030] font-bold mb-6 eva-heading">Eva &middot; {activeTc} {activeCondition} TC-level</h2>
					<div class="eva-feedback bg-[#1e1e1e] border border-[#333] rounded-lg px-6 py-5">
						{@html inlineFeedback.tcLevel}
					</div>
				</div>
			{/if}

			<!-- Boss's TC-level analysis -->
			{#if bossFeedback?.tcLevel}
				<div class="mt-10 pt-6 border-t-2 border-[#383838]">
					<h2 class="text-[#c0a030] font-bold mb-6 eva-heading">Boss &middot; {activeTc} {activeCondition} TC-level</h2>
					<div class="eva-feedback bg-[#1e1e1e] border border-[#444] rounded-lg px-6 py-5">
						{@html bossFeedback.tcLevel}
					</div>
				</div>
			{/if}
		{:else}
			<p class="text-[#666]">No data for {activeCondition}/{activeTc}.</p>
		{/if}
	</div>
</div>

<style>
	:global(html) {
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
	:global(html::-webkit-scrollbar),
	:global(body::-webkit-scrollbar) {
		display: none;
		width: 0;
		height: 0;
	}
	:global(body) {
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
	.cernere-page {
		font-family: 'Inter', system-ui, -apple-system, sans-serif;
		font-size: 12px;
		line-height: 1.6;
	}
	.cernere-page .conversation-text {
		font-family: 'Inter', system-ui, -apple-system, sans-serif;
	}
	.cernere-page .label-text,
	.cernere-page .tc-label,
	.cernere-page .condition-label {
		font-family: 'Inter', system-ui, -apple-system, sans-serif;
	}
	.cernere-page h1 {
		font-size: 19px;
		font-weight: 500;
		letter-spacing: -0.02em;
	}
	.cernere-page .eva-heading {
		font-size: 15px;
	}
	.cernere-page .label-text {
		font-family: 'Inter', system-ui, -apple-system, sans-serif;
		font-size: 10px;
		line-height: 1.4;
	}
	.cernere-page .tc-label {
		font-family: 'Inter', system-ui, -apple-system, sans-serif;
		font-size: 10px;
	}
	.cernere-page .condition-label {
		font-family: 'Inter', system-ui, -apple-system, sans-serif;
		font-size: 9px;
	}
	.cernere-page .eva-feedback {
		font-size: 12px;
		line-height: 1.8;
		color: #b0b0b0;
	}
	.cernere-page .eva-feedback :global(h1) {
		font-size: 15px;
		font-weight: bold;
		color: #c0a030;
		margin: 1.5em 0 0.5em;
	}
	.cernere-page .eva-feedback :global(h2) {
		font-size: 14px;
		font-weight: bold;
		color: #c0a030;
		margin: 1.2em 0 0.4em;
	}
	.cernere-page .eva-feedback :global(h3) {
		font-size: 14px;
		font-weight: bold;
		color: #d0b040;
		margin: 1em 0 0.3em;
	}
	.cernere-page .eva-feedback :global(p) {
		margin: 0.6em 0;
	}
	.cernere-page .eva-feedback :global(strong) {
		color: #d0d0d0;
		font-weight: 600;
	}
	.cernere-page .eva-feedback :global(table) {
		width: 100%;
		border-collapse: collapse;
		margin: 0.8em 0;
	}
	.cernere-page .eva-feedback :global(th) {
		text-align: left;
		padding: 6px 12px;
		border-bottom: 1px solid #444;
		color: #999;
		font-size: 13px;
	}
	.cernere-page .eva-feedback :global(td) {
		padding: 6px 12px;
		border-bottom: 1px solid #2a2a2a;
		color: #b0b0b0;
	}
	.cernere-page .eva-feedback :global(ul),
	.cernere-page .eva-feedback :global(ol) {
		padding-left: 1.5em;
		margin: 0.5em 0;
	}
	.cernere-page .eva-feedback :global(li) {
		margin: 0.3em 0;
	}
	.cernere-page .eva-feedback :global(hr) {
		border: none;
		border-top: 1px solid #333;
		margin: 1.5em 0;
	}
	.cernere-page .eva-feedback :global(em),
	.cernere-page .eva-feedback :global(i) {
		font-style: italic;
		color: #c8c8c8;
		font-synthesis: style;
	}
	.cernere-page :global(em),
	.cernere-page :global(i) {
		font-style: italic;
		font-synthesis: style;
	}
	.cernere-page :global(.inner-voice) {
		font-style: italic;
		color: #AE0D46;
		opacity: 0.75;
		font-synthesis: style;
		line-height: 1.6;
		margin: 0.4em 0;
	}
</style>
