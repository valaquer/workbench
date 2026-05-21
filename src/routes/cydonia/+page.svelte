<script lang="ts">
	export let data;

	let activeCondition: 'A1' | 'B1' = 'A1';
	let activeTc: string = 'TC1';
	let showDirector = true;

	function escapeHtml(text: string): string {
		return text
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
	}

	function normalizeDashes(text: string): string {
		return text
			.replace(/—/g, ' – ')   // em dash → en dash with spaces
			.replace(/–/g, ' – ')   // en dash → en dash with spaces (normalizes missing spaces)
			.replace(/ - /g, ' – ') // spaced hyphen → en dash with spaces
			.replace(/  +/g, ' ');  // collapse any double spaces
	}

	function renderSophieText(text: string): string {
		let result = escapeHtml(text);
		result = normalizeDashes(result);
		// First pass: action tags — starts with "I " or >5 words
		result = result.replace(/\*([^*\n]+?)\*/g, (_match, content) => {
			const wordCount = content.trim().split(/\s+/).length;
			const isAction = content.trimStart().startsWith('I ') || wordCount > 5;
			if (isAction) {
				return `<em class="action-tag">${content}</em>`;
			}
			return `*${content}*`; // leave for second pass
		});
		// Second pass: remaining spoken emphasis
		result = result.replace(/\*([^*\n]+?)\*/g, '<em>$1</em>');
		return result;
	}

	$: conversations = data.conditions[activeCondition] || [];
	$: activeConvo = conversations.find((c: any) => c.tc === activeTc);
	$: tcScore = data.tcScores?.[activeTc];
	$: scene = data.sceneContexts?.[activeTc];
	$: inlineFeedback = data.tcFeedbackInline?.[activeTc]?.[activeCondition];

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
</script>

<div class="cydonia-page min-h-screen bg-[#1a1a1a] text-[#e0e0e0] px-6 py-8">
	<div class="max-w-4xl mx-auto">
		<a href="/" class="text-[#888] hover:text-[#ccc] transition-colors">&larr; Workbench</a>

		{#if data.manifestWarnings && data.manifestWarnings.length > 0}
			<div class="mt-4 border-2 border-red-500 bg-red-950 text-red-100 rounded p-4">
				<div class="font-bold text-red-300 uppercase tracking-wider text-sm mb-2">
					Provenance gate — {data.manifestWarnings.length} warning{data.manifestWarnings.length === 1 ? '' : 's'}
				</div>
				<ul class="list-disc list-inside space-y-1 text-sm">
					{#each data.manifestWarnings as w}
						<li>{w}</li>
					{/each}
				</ul>
				<div class="mt-3 text-xs text-red-300 italic">
					Do not show this page to Boss until every warning is resolved. Either archive the unaccounted file or add it to <code class="text-red-100">outputs/MANIFEST.json</code>. Governed by Principle 9 in the Cydonia runbook.
				</div>
			</div>
		{:else}
			<div class="mt-4 text-xs text-[#666]">
				Provenance gate: clean{data.manifestRunId ? ` · run ${data.manifestRunId}` : ''}
			</div>
		{/if}

		<h1 class="text-white mt-4 mb-2">Cydonia 24B v4.3 — Tournament Outputs</h1>
		<p class="text-[#888] mb-8">
			Sprint 18 Redo &middot; {conversations.reduce((n: number, c: any) => n + c.turns.length, 0)} turns across {conversations.length} TCs
		</p>

		<!-- Condition Toggle -->
		<div class="flex gap-3 mb-6">
			<button
				class="px-4 py-2 rounded font-medium transition-colors {activeCondition === 'A1' ? 'bg-[#AE0D46] text-white' : 'bg-[#2a2a2a] text-[#aaa] hover:bg-[#333] hover:text-white'}"
				on:click={() => activeCondition = 'A1'}
			>
				A1 — Solo (no Director)
			</button>
			<button
				class="px-4 py-2 rounded font-medium transition-colors {activeCondition === 'B1' ? 'bg-[#AE0D46] text-white' : 'bg-[#2a2a2a] text-[#aaa] hover:bg-[#333] hover:text-white'}"
				on:click={() => activeCondition = 'B1'}
			>
				B1 — Paired (+ Grok 4.1 Fast)
			</button>
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

		<!-- Director Toggle (B1 only) -->
		{#if activeCondition === 'B1'}
			<label class="flex items-center gap-2 mb-6 text-[#aaa] cursor-pointer">
				<input type="checkbox" bind:checked={showDirector} class="accent-[#AE0D46]" />
				Show Director guidance
			</label>
		{/if}

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
		<div class="grid grid-cols-2 gap-4 mb-6">
			<div class="bg-[#1a1a1a] border border-[#333] rounded-lg px-5 py-4">
				<div class="text-[#888] font-medium mb-2 label-text uppercase tracking-wide">Actress Model</div>
				<div class="text-[#ccc] mb-2">{data.actressModelSettings.name}</div>
				<div class="text-[#888] mb-1 label-text">{data.actressModelSettings.serving}</div>
				<div class="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
					{#each Object.entries(data.actressModelSettings.params) as [key, val]}
						<div class="label-text"><span class="text-[#666]">{key}:</span> <span class="text-[#aaa]">{val}</span></div>
					{/each}
				</div>
			</div>
			{#if activeCondition === 'B1'}
				<div class="bg-[#1a1a1a] border border-[#333] rounded-lg px-5 py-4">
					<div class="text-[#888] font-medium mb-2 label-text uppercase tracking-wide">Director Model</div>
					<div class="text-[#ccc] mb-2">{data.directorModelSettings.name}</div>
					<div class="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
						{#each Object.entries(data.directorModelSettings.params) as [key, val]}
							<div class="label-text"><span class="text-[#666]">{key}:</span> <span class="text-[#aaa]">{val}</span></div>
						{/each}
					</div>
				</div>
			{/if}
		</div>

		<!-- System Prompt Summary -->
		{#if activeConvo}
			<div class="bg-[#1a1a1a] border border-[#333] rounded-lg px-5 py-4 mb-8">
				<div class="text-[#888] font-medium mb-2 label-text uppercase tracking-wide">
					System Prompt ({activeCondition === 'A1' ? 'Solo' : 'Paired'})
				</div>
				<pre class="text-[#aaa] whitespace-pre-wrap">{activeCondition === 'A1' ? data.soloPromptSummary : data.pairedPromptSummary}</pre>
			</div>
		{/if}

		<!-- Conversation -->
		{#if activeConvo}
			<div class="space-y-5">
				{#each activeConvo.turns as turn}
					<!-- Director guidance (B1 only) -->
					{#if activeCondition === 'B1' && showDirector && turn.director_output}
						<div class="bg-[#1a2e1a] border border-[#3a7a3a] rounded-lg px-5 py-4">
							<div class="text-[#5cb85c] font-medium mb-2 uppercase tracking-wide label-text">
								<span class="text-[#555] mr-2">{activeCondition}.{activeTc.replace('TC','')}.{turn.turn}D</span>
								Director — Turn {turn.turn}
								{#if turn.director_output.show_inner_voice}
									<span class="ml-2 text-[#888]">[show_inner_voice: true]</span>
								{/if}
							</div>
							<p class="text-[#c0c0c0]">{turn.director_output.direction}</p>
							{#if turn.director_output.environment}
								<p class="text-[#888] mt-1 label-text">Environment: {turn.director_output.environment}</p>
							{/if}
						</div>
					{/if}

					<!-- User message -->
					<div class="flex justify-end">
						<div class="bg-[#2a2a3a] border border-[#3a3a4a] rounded-2xl rounded-tr-sm px-5 py-4 max-w-[80%]">
							<div class="text-[#999] mb-1 label-text"><span class="text-[#555] mr-2">{activeCondition}.{activeTc.replace('TC','')}.{turn.turn}U</span> Turn {turn.turn} &middot; User</div>
							<p class="text-[#c8c8c8]">{turn.user}</p>
						</div>
					</div>

					<!-- Sophie's response -->
					<div class="flex justify-start">
						<div class="bg-[#2a1a2a] border border-[#4a2a3a] rounded-2xl rounded-tl-sm px-5 py-4 max-w-[80%]">
							<div class="text-[#d06090] mb-1 label-text">
								<span class="text-[#555] mr-2">{activeCondition}.{activeTc.replace('TC','')}.{turn.turn}S</span> Sophie
								{#if turn.tokens_used}
									<span class="text-[#666] ml-2">{turn.tokens_used} tok</span>
								{:else if turn.assistant_tokens}
									<span class="text-[#666] ml-2">{turn.assistant_tokens} tok</span>
								{/if}
							</div>
							<p class="text-[#c8c8c8] whitespace-pre-line">{@html renderSophieText(turn.assistant)}</p>
						</div>
					</div>

					<!-- Eva per-turn feedback (Principle 10) -->
					{#if inlineFeedback?.perTurn?.[turn.turn]}
						<div class="eva-callout border-l-4 border-[#c0a030] bg-[#1e1c14] px-5 py-3 ml-4">
							<div class="text-[#c0a030] mb-1 label-text uppercase tracking-wide">
								Eva &middot; T{turn.turn}
							</div>
							<div class="eva-feedback text-[#b0b0b0]">
								{@html inlineFeedback.perTurn[turn.turn]}
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

			<!-- Eva's TC-level analysis (Principle 10) -->
			{#if inlineFeedback?.tcLevel}
				<div class="mt-10 pt-6 border-t-2 border-[#383838]">
					<h2 class="text-[#c0a030] font-bold mb-6 eva-heading">Eva &middot; {activeTc} {activeCondition} TC-level</h2>
					<div class="eva-feedback bg-[#1e1e1e] border border-[#333] rounded-lg px-6 py-5">
						{@html inlineFeedback.tcLevel}
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
	.cydonia-page, .cydonia-page * {
		font-family: 'JetBrainsMono Nerd Font', 'JetBrains Mono', 'Fira Code', monospace;
		font-size: 16px;
		line-height: 1.9;
	}
	.cydonia-page h1 {
		font-size: 22px;
	}
	.cydonia-page .eva-heading {
		font-size: 19px;
	}
	.cydonia-page .label-text {
		font-size: 13px;
		line-height: 1.4;
	}
	.cydonia-page .tc-label {
		font-size: 13px;
	}
	.cydonia-page .eva-feedback {
		font-size: 15px;
		line-height: 1.8;
		color: #b0b0b0;
	}
	.cydonia-page .eva-feedback :global(h1) {
		font-size: 18px;
		font-weight: bold;
		color: #c0a030;
		margin: 1.5em 0 0.5em;
	}
	.cydonia-page .eva-feedback :global(h2) {
		font-size: 16px;
		font-weight: bold;
		color: #c0a030;
		margin: 1.2em 0 0.4em;
	}
	.cydonia-page .eva-feedback :global(h3) {
		font-size: 15px;
		font-weight: bold;
		color: #d0b040;
		margin: 1em 0 0.3em;
	}
	.cydonia-page .eva-feedback :global(p) {
		margin: 0.6em 0;
	}
	.cydonia-page .eva-feedback :global(strong) {
		color: #d0d0d0;
		font-weight: 600;
	}
	.cydonia-page .eva-feedback :global(table) {
		width: 100%;
		border-collapse: collapse;
		margin: 0.8em 0;
	}
	.cydonia-page .eva-feedback :global(th) {
		text-align: left;
		padding: 6px 12px;
		border-bottom: 1px solid #444;
		color: #999;
		font-size: 13px;
	}
	.cydonia-page .eva-feedback :global(td) {
		padding: 6px 12px;
		border-bottom: 1px solid #2a2a2a;
		color: #b0b0b0;
	}
	.cydonia-page .eva-feedback :global(ul),
	.cydonia-page .eva-feedback :global(ol) {
		padding-left: 1.5em;
		margin: 0.5em 0;
	}
	.cydonia-page .eva-feedback :global(li) {
		margin: 0.3em 0;
	}
	.cydonia-page .eva-feedback :global(hr) {
		border: none;
		border-top: 1px solid #333;
		margin: 1.5em 0;
	}
	.cydonia-page .eva-feedback :global(em),
	.cydonia-page .eva-feedback :global(i) {
		font-style: italic;
		color: #c8c8c8;
		font-family: 'JetBrains Mono', 'Fira Code', monospace;
		font-synthesis: style;
	}
	.cydonia-page :global(em),
	.cydonia-page :global(i) {
		font-style: italic;
		font-synthesis: style;
	}
	.cydonia-page :global(.action-tag) {
		font-style: italic;
		color: #9a8ec7;
		font-synthesis: style;
	}
</style>
