<script lang="ts">
	import { browser } from '$app/environment';

	const steps = [0, 250, 500, 750, 1000, 1250];

	const swimlanes = [
		{ id: 0, label: 'Studio Portrait', description: 'gabriela_c2, long dark hair, smiling confidently, studio lighting' },
		{ id: 1, label: 'Red Dress Party', description: 'gabriela_c2, red dress at rooftop party, evening' },
		{ id: 2, label: 'Café', description: 'gabriela_c2, sitting in a cafe, warm natural lighting' },
		{ id: 3, label: 'Beach Golden Hour', description: 'gabriela_c2, at the beach, golden hour, wind in hair' },
		{ id: 4, label: 'Urban Night', description: 'gabriela_c2, leather jacket, urban street, night' }
	];

	function src(step: number, sample: number) {
		if (step === -1) return '/api/lora-samples/source-face.png';
		return `/api/lora-samples/step${step}_sample${sample}.jpg`;
	}

	function stepLabel(step: number) {
		if (step === -1) return 'Source Face';
		return step === 0 ? 'Baseline' : `${step}`;
	}

	function laneLabel(sample: number) {
		return swimlanes[sample]?.label ?? '';
	}

	function fullLabel(step: number, sample: number) {
		const s = stepLabel(step);
		const l = laneLabel(sample);
		return l ? `${s} — ${l}` : s;
	}

	function voteKey(step: number, sample: number) {
		return `${step}-${sample}`;
	}

	let votes: Record<string, 'approved' | 'rejected'> = $state({});

	if (browser) {
		try {
			const saved = localStorage.getItem('lora-training-votes');
			if (saved) votes = JSON.parse(saved);
		} catch {}
	}

	function saveVotes() {
		if (browser) localStorage.setItem('lora-training-votes', JSON.stringify(votes));
	}

	function castVote(step: number, sample: number, vote: 'approved' | 'rejected') {
		const key = voteKey(step, sample);
		if (votes[key] === vote) {
			delete votes[key];
		} else {
			votes[key] = vote;
		}
		votes = { ...votes };
		saveVotes();
	}

	let lightbox: { step: number; sample: number } | null = $state(null);
	let zoom: { x: number; y: number } | null = $state(null);

	function onLightboxClick(e: MouseEvent) {
		if (zoom) { zoom = null; return; }
		const img = e.currentTarget as HTMLElement;
		const rect = img.getBoundingClientRect();
		zoom = {
			x: ((e.clientX - rect.left) / rect.width) * 100,
			y: ((e.clientY - rect.top) / rect.height) * 100
		};
	}

	let dragFrom: { step: number; sample: number } | null = $state(null);
	let dragOver: { step: number; sample: number } | null = $state(null);
	let compareIds: [{ step: number; sample: number }, { step: number; sample: number }] | null = $state(null);

	function onDragStart(e: DragEvent, step: number, sample: number) {
		dragFrom = { step, sample };
		if (e.dataTransfer) {
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('text/plain', `${step}-${sample}`);
		}
	}

	function onDragOver(e: DragEvent, step: number, sample: number) {
		e.preventDefault();
		dragOver = { step, sample };
	}

	function onDrop(e: DragEvent, step: number, sample: number) {
		e.preventDefault();
		if (dragFrom && (dragFrom.step !== step || dragFrom.sample !== sample)) {
			compareIds = [dragFrom, { step, sample }];
		}
		dragFrom = null;
		dragOver = null;
	}

	function onDragEnd() {
		dragFrom = null;
		dragOver = null;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			if (compareIds) compareIds = null;
			else if (zoom) zoom = null;
			else if (lightbox) { lightbox = null; zoom = null; }
		} else if (lightbox && !compareIds) {
			const currentIdx = steps.indexOf(lightbox.step);
			if (currentIdx === -1) return;
			zoom = null;
			if (e.key === 'ArrowLeft' && currentIdx > 0) {
				lightbox = { step: steps[currentIdx - 1], sample: lightbox.sample };
			} else if (e.key === 'ArrowRight' && currentIdx < steps.length - 1) {
				lightbox = { step: steps[currentIdx + 1], sample: lightbox.sample };
			} else if (e.key === 'ArrowUp' && lightbox.sample > 0) {
				lightbox = { step: lightbox.step, sample: lightbox.sample - 1 };
			} else if (e.key === 'ArrowDown' && lightbox.sample < swimlanes.length - 1) {
				lightbox = { step: lightbox.step, sample: lightbox.sample + 1 };
			}
		}
	}
</script>

{#snippet voteButtons(step: number, sample: number, size: 'sm' | 'lg')}
	{@const key = voteKey(step, sample)}
	{@const w = size === 'sm' ? 'w-5 h-5' : 'w-7 h-7'}
	{@const iconCheck = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'}
	{@const iconX = size === 'sm' ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5'}
	<button
		class="{w} rounded-full flex items-center justify-center transition-all
		       {votes[key] === 'approved' ? 'bg-green-500 text-white' : 'bg-black/50 text-cream/40 hover:bg-green-500/40 hover:text-white'}"
		onclick={(e) => { e.stopPropagation(); castVote(step, sample, 'approved'); }}
		title="Match"
	>
		<svg class="{iconCheck}" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
	</button>
	<button
		class="{w} rounded-full flex items-center justify-center transition-all
		       {votes[key] === 'rejected' ? 'bg-red-500 text-white' : 'bg-black/50 text-cream/40 hover:bg-red-500/40 hover:text-white'}"
		onclick={(e) => { e.stopPropagation(); castVote(step, sample, 'rejected'); }}
		title="No match"
	>
		<svg class="{iconX}" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
	</button>
{/snippet}

<svelte:window onkeydown={handleKeydown} />

<nav class="py-6 px-6 bg-dark">
	<div class="max-w-[1800px] mx-auto flex justify-between items-center">
		<a href="/" class="shrink-0">
			<img src="/images/brand-logo.png" alt="Honeybloom" class="h-12" />
		</a>
		<div class="text-right">
			<h1 class="font-satoshi text-cream text-lg font-medium">LoRA Training — gabriela_c2_v1</h1>
			<p class="font-mono text-[10px] text-cream/40">FLUX.1-dev | rank 32 | lr 1e-4 | RTX 4090 | 46 min</p>
			<span class="font-mono text-[10px] text-cream/40">Click to zoom · Drag to compare · Arrow keys to navigate</span>
		</div>
	</div>
</nav>

<div class="min-h-screen bg-dark px-6 pb-12">
	<div class="max-w-[1800px] mx-auto">
		<!-- Source face reference -->
		<div class="flex items-center gap-6 mb-8 p-4 rounded-lg bg-cream/5 border border-cream/10">
			<img
				src="/api/lora-samples/source-face.png"
				alt="Source face — Gabriela face crop"
				class="w-32 h-32 object-cover rounded-lg cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-cream/30"
				onclick={() => { lightbox = { step: -1, sample: -1 }; zoom = null; }}
				draggable="true"
				ondragstart={(e) => onDragStart(e, -1, -1)}
				ondragend={onDragEnd}
			/>
			<div>
				<span class="font-satoshi text-cream text-sm font-medium">Source Face — Gabriela (BRA001)</span>
				<p class="font-mono text-[10px] text-cream/40 mt-1">Cropped from hero shot (minimal-03, seed 1536928407). Fed to Qwen Edit for 20 angle variations. Those 20 images trained this LoRA.</p>
				<p class="font-mono text-[10px] text-cream/40 mt-1">Each row = one sample prompt. Track face convergence left to right across training steps.</p>
			</div>
		</div>

		<!-- Step labels header -->
		<div class="flex items-end gap-2 mb-2">
			<div class="w-48 shrink-0"></div>
			{#each steps as step}
				<div class="flex-1 text-center">
					<span class="font-mono text-[11px] text-cream/50">
						{stepLabel(step)}
					</span>
				</div>
			{/each}
		</div>

		<!-- Swimlanes -->
		{#each swimlanes as lane}
			<div class="mb-6">
				<div class="flex gap-2">
					<!-- Lane label -->
					<div class="w-48 shrink-0 flex flex-col justify-center pr-4">
						<span class="font-satoshi text-cream text-sm font-medium">{lane.label}</span>
						<span class="font-mono text-[10px] text-cream/40 mt-1 line-clamp-2">{lane.description}</span>
					</div>

					<!-- Images -->
					{#each steps as step}
						{@const isDragSource = dragFrom?.step === step && dragFrom?.sample === lane.id}
						{@const isDragTarget = dragOver?.step === step && dragOver?.sample === lane.id && !isDragSource}
						{@const key = voteKey(step, lane.id)}
						<div
							class="flex-1 relative rounded-lg overflow-hidden bg-cream/5 cursor-grab active:cursor-grabbing transition-all
							{isDragSource ? 'opacity-30' : ''}
							{isDragTarget ? 'ring-2 ring-cream/50' : 'hover:ring-2 hover:ring-cream/30'}
							{votes[key] === 'approved' ? 'ring-2 ring-green-500/60' : ''}
							{votes[key] === 'rejected' ? 'ring-2 ring-red-500/40 opacity-50' : ''}"
							onclick={() => { lightbox = { step, sample: lane.id }; zoom = null; }}
							draggable="true"
							ondragstart={(e) => onDragStart(e, step, lane.id)}
							ondragover={(e) => onDragOver(e, step, lane.id)}
							ondrop={(e) => onDrop(e, step, lane.id)}
							ondragend={onDragEnd}
							onkeydown={() => {}}
							role="button"
							tabindex="0"
						>
							<img
								src={src(step, lane.id)}
								alt="{stepLabel(step)} — {lane.label}"
								class="w-full h-auto pointer-events-none"
								loading="lazy"
							/>
							<div class="absolute bottom-1 right-1 flex gap-1">
								{@render voteButtons(step, lane.id, 'sm')}
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

<!-- Lightbox -->
{#if lightbox && !compareIds}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
		onclick={() => { lightbox = null; zoom = null; }}
		onkeydown={() => {}}
		role="dialog"
	>
		<div class="relative overflow-hidden" onclick={(e) => e.stopPropagation()}>
			<img
				src={src(lightbox.step, lightbox.sample)}
				alt={fullLabel(lightbox.step, lightbox.sample)}
				class="max-h-[90vh] max-w-[90vw] object-contain transition-transform duration-200 {zoom ? 'cursor-zoom-out' : 'cursor-zoom-in'}"
				style={zoom ? `transform: scale(3); transform-origin: ${zoom.x}% ${zoom.y}%` : ''}
				onclick={onLightboxClick}
			/>
			{#if !zoom && lightbox.step >= 0}
				<div class="absolute bottom-2 right-2 flex gap-1">
					{@render voteButtons(lightbox.step, lightbox.sample, 'lg')}
				</div>
			{/if}
		</div>
		<span class="absolute bottom-6 font-mono text-sm text-cream/70">
			{fullLabel(lightbox.step, lightbox.sample)}
		</span>
	</div>
{/if}

<!-- Compare -->
{#if compareIds}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center gap-4 bg-black/90 p-8"
		onclick={() => compareIds = null}
		onkeydown={() => {}}
		role="dialog"
	>
		{#each compareIds as cid}
			<div
				class="flex flex-col items-center gap-2 max-w-[45vw]"
				onclick={(e) => e.stopPropagation()}
				onkeydown={() => {}}
				role="img"
			>
				<div class="relative">
					<img
						src={src(cid.step, cid.sample)}
						alt={fullLabel(cid.step, cid.sample)}
						class="max-h-[85vh] object-contain"
					/>
					{#if cid.step >= 0}
						<div class="absolute bottom-2 right-2 flex gap-1">
							{@render voteButtons(cid.step, cid.sample, 'lg')}
						</div>
					{/if}
				</div>
				<span class="font-mono text-xs tracking-wider text-cream/70">
					{fullLabel(cid.step, cid.sample)}
				</span>
			</div>
		{/each}
	</div>
{/if}
