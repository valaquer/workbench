<script lang="ts">
	let { data } = $props();
	let f002Ids = $state(data.f002Ids.slice());
	let f003Ids = $state(data.f003Ids.slice());
	let blueHairIds = $state(data.blueHairIds.slice());
	let votes: Record<string, string> = $state({ ...data.votes });

	// Combined for lightbox navigation
	let allIds = $derived([...f002Ids, ...f003Ids, ...blueHairIds]);

	// I-number mapping starting from I071
	function getINumber(id: string): string {
		if (id === 'I048-face') return 'I048';
		const idx = allIds.indexOf(id);
		if (idx === -1) return '';
		return `I${String(71 + idx).padStart(3, '0')}`;
	}

	// Lightbox
	let lightboxId: string | null = $state(null);
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

	// Compare
	let compareIds: [string, string] | null = $state(null);
	let dragId: string | null = $state(null);

	async function castVote(id: string, vote: 'approved' | 'rejected') {
		if (votes[id] === vote) {
			delete votes[id];
			votes = { ...votes };
			await fetch('/api/obj005/vote', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
		} else {
			votes[id] = vote;
			votes = { ...votes };
			await fetch('/api/obj005/vote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, vote }) });
		}
	}

	function onDragStart(e: DragEvent, id: string) {
		dragId = id;
		if (e.dataTransfer) {
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('text/plain', id);
		}
	}

	function onDrop(e: DragEvent, targetId: string) {
		e.preventDefault();
		if (dragId && dragId !== targetId) {
			compareIds = [dragId, targetId];
		}
		dragId = null;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			if (compareIds) compareIds = null;
			else if (zoom) zoom = null;
			else if (lightboxId) { lightboxId = null; zoom = null; }
		} else if (lightboxId && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
			const currentIdx = allIds.indexOf(lightboxId);
			if (currentIdx === -1) return;
			zoom = null;
			if (e.key === 'ArrowLeft' && currentIdx > 0) {
				lightboxId = allIds[currentIdx - 1];
			} else if (e.key === 'ArrowRight' && currentIdx < allIds.length - 1) {
				lightboxId = allIds[currentIdx + 1];
			}
		}
	}

	function getLabel(id: string): string {
		if (id === 'I048-face') return 'Reference Sophie';
		const parts = id.split('_');
		const lora = parts[1]; // F002 or F003
		const prompt = parts[2]; // P009, P010, or BLUEHAIR
		const steps = parts[3]; // s25 or s50
		const seed = parts[4]; // seed0, seed1, seed2

		if (prompt === 'BLUEHAIR') return `${lora} Blue Hair`;
		return `${lora} ${prompt} ${steps} ${seed}`;
	}

	function getShortLabel(id: string): string {
		const parts = id.split('_');
		return parts[4] || ''; // seed0, seed1, seed2
	}
</script>

{#snippet voteButtons(id: string, size: 'sm' | 'lg')}
	{@const w = size === 'sm' ? 'w-5 h-5' : 'w-7 h-7'}
	{@const iconCheck = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'}
	{@const iconX = size === 'sm' ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5'}
	<button
		class="{w} rounded-full flex items-center justify-center transition-all
		       {votes[id] === 'approved' ? 'bg-green-500 text-white' : 'bg-black/50 text-cream/40 hover:bg-green-500/40 hover:text-white'}"
		onclick={(e) => { e.stopPropagation(); castVote(id, 'approved'); }}
		title="Approve (Good)"
	>
		<svg class="{iconCheck}" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
	</button>
	<button
		class="{w} rounded-full flex items-center justify-center transition-all
		       {votes[id] === 'rejected' ? 'bg-red-500 text-white' : 'bg-black/50 text-cream/40 hover:bg-red-500/40 hover:text-white'}"
		onclick={(e) => { e.stopPropagation(); castVote(id, 'rejected'); }}
		title="Reject (Bad)"
	>
		<svg class="{iconX}" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
	</button>
{/snippet}

{#snippet imageCard(id: string)}
	{@const parts = id.split('_')}
	{@const lora = parts[1]}
	{@const promptCode = parts[2]}
	{@const stepsNum = parts[3]?.replace('s', '')}
	{@const seedNum = parts[4]?.replace('seed', '')}
	{@const loraName = lora === 'F002' ? 'F002 (step 1000)' : 'F003 (step 1250)'}
	{@const promptName = promptCode === 'P009' ? 'Work Wife' : 'Erotic Nun'}
	<div
		class="flex flex-col"
		style="width: 160px;"
	>
		<div
			class="group relative overflow-hidden rounded-lg cursor-grab active:cursor-grabbing transition-opacity
			       {dragId === id ? 'opacity-30' : ''}"
			draggable="true"
			onclick={() => lightboxId = id}
			ondragstart={(e) => onDragStart(e, id)}
			ondragover={(e) => e.preventDefault()}
			ondrop={(e) => onDrop(e, id)}
			ondragend={() => dragId = null}
			role="listitem"
		>
			<img
				src="/api/obj005/{id}"
				alt={id}
				class="w-full pointer-events-none"
				loading="lazy"
			/>
			</div>
		<div class="mt-1 px-1 text-[10px] leading-tight flex items-start gap-2">
			<div class="flex-1">
				<div class="text-cream font-bold">{getINumber(id)}</div>
				<div class="text-cream/70">{loraName}, {promptName}, {stepsNum} steps, seed {seedNum}</div>
			</div>
			<div class="flex gap-1 mt-0.5">
				{@render voteButtons(id, 'sm')}
			</div>
		</div>
	</div>
{/snippet}

{#snippet blueHairCard(id: string)}
	{@const lora = id.includes('F002') ? 'F002 (step 1000)' : 'F003 (step 1250)'}
	<div class="flex flex-col" style="width: 280px;">
		<div
			class="group relative overflow-hidden rounded-lg cursor-grab active:cursor-grabbing transition-opacity
			       {dragId === id ? 'opacity-30' : ''}"
			draggable="true"
			onclick={() => lightboxId = id}
			ondragstart={(e) => onDragStart(e, id)}
			ondragover={(e) => e.preventDefault()}
			ondrop={(e) => onDrop(e, id)}
			ondragend={() => dragId = null}
			role="listitem"
		>
			<img
				src="/api/obj005/{id}"
				alt={id}
				class="w-full pointer-events-none"
				loading="lazy"
			/>
			<div class="absolute top-2 right-2 flex gap-1">
				{@render voteButtons(id, 'lg')}
			</div>
		</div>
		<div class="mt-1 px-1 text-[11px] leading-tight">
			<div class="text-cream font-bold">{getINumber(id)}</div>
			<div class="text-cream/70">{lora}, Blue Hair Test</div>
		</div>
	</div>
{/snippet}

<svelte:head>
	<title>OBJ-005 FLUX LoRA Validation</title>
</svelte:head>

<svelte:window onkeydown={handleKeydown} />

<!-- Header -->
<nav class="py-4 px-6 bg-dark">
	<div class="max-w-7xl mx-auto">
		<h1 class="font-satoshi text-xl text-cream">OBJ-005 FLUX LoRA Validation</h1>
		<p class="text-cream/50 text-sm mt-1">F002 (step 1000) vs F003 (step 1250) | Drag to compare. Click to zoom. Arrow keys to navigate.</p>
	</div>
</nav>

<!-- Reference Face -->
<div class="bg-dark px-6 py-4 border-b border-cream/10">
	<div class="max-w-7xl mx-auto flex items-center gap-6">
		<div
			class="relative cursor-grab active:cursor-grabbing {dragId === 'I048-face' ? 'opacity-30' : ''}"
			draggable="true"
			ondragstart={(e) => onDragStart(e, 'I048-face')}
			ondragover={(e) => e.preventDefault()}
			ondrop={(e) => onDrop(e, 'I048-face')}
			ondragend={() => dragId = null}
		>
			<img src="/obj005/I048-face.png" alt="Sophie Reference" class="w-32 rounded-lg border-2 border-cream/30" />
			<div class="absolute top-1 right-1 flex gap-1">
				{@render voteButtons('I048-face', 'sm')}
			</div>
		</div>
		<div>
			<div class="text-cream font-bold">Reference: Sophie (I048)</div>
			<div class="text-cream/60 text-sm">Drag to compare against any image</div>
		</div>
	</div>
</div>

<!-- Main Grid -->
<div class="min-h-screen bg-dark px-6 pb-12 pt-6">
	<div class="max-w-[1600px] mx-auto">
		<table class="w-full border-collapse">
			<thead>
				<tr>
					<th class="w-20 p-2"></th>
					<th class="p-2 text-center text-cream/60 text-xs font-mono font-normal">P009 s25</th>
					<th class="p-2 text-center text-cream/60 text-xs font-mono font-normal">P009 s50</th>
					<th class="p-2 text-center text-cream/60 text-xs font-mono font-normal">P010 s25</th>
					<th class="p-2 text-center text-cream/60 text-xs font-mono font-normal">P010 s50</th>
				</tr>
			</thead>
			<tbody>
				<!-- F002 Row -->
				<tr>
					<td class="p-2 align-top">
						<div class="font-satoshi text-cream font-bold text-lg">F002</div>
						<div class="text-cream/40 text-xs">step 1000</div>
					</td>
					<td class="p-2 align-top">
						<div class="flex gap-1 justify-center">
							{#each f002Ids.filter(id => id.includes('P009_s25')) as id}
								{@render imageCard(id)}
							{/each}
						</div>
					</td>
					<td class="p-2 align-top">
						<div class="flex gap-1 justify-center">
							{#each f002Ids.filter(id => id.includes('P009_s50')) as id}
								{@render imageCard(id)}
							{/each}
						</div>
					</td>
					<td class="p-2 align-top">
						<div class="flex gap-1 justify-center">
							{#each f002Ids.filter(id => id.includes('P010_s25')) as id}
								{@render imageCard(id)}
							{/each}
						</div>
					</td>
					<td class="p-2 align-top">
						<div class="flex gap-1 justify-center">
							{#each f002Ids.filter(id => id.includes('P010_s50')) as id}
								{@render imageCard(id)}
							{/each}
						</div>
					</td>
				</tr>
				<!-- F003 Row -->
				<tr>
					<td class="p-2 align-top pt-6">
						<div class="font-satoshi text-cream font-bold text-lg">F003</div>
						<div class="text-cream/40 text-xs">step 1250</div>
					</td>
					<td class="p-2 align-top pt-6">
						<div class="flex gap-1 justify-center">
							{#each f003Ids.filter(id => id.includes('P009_s25')) as id}
								{@render imageCard(id)}
							{/each}
						</div>
					</td>
					<td class="p-2 align-top pt-6">
						<div class="flex gap-1 justify-center">
							{#each f003Ids.filter(id => id.includes('P009_s50')) as id}
								{@render imageCard(id)}
							{/each}
						</div>
					</td>
					<td class="p-2 align-top pt-6">
						<div class="flex gap-1 justify-center">
							{#each f003Ids.filter(id => id.includes('P010_s25')) as id}
								{@render imageCard(id)}
							{/each}
						</div>
					</td>
					<td class="p-2 align-top pt-6">
						<div class="flex gap-1 justify-center">
							{#each f003Ids.filter(id => id.includes('P010_s50')) as id}
								{@render imageCard(id)}
							{/each}
						</div>
					</td>
				</tr>
			</tbody>
		</table>

		<!-- Blue Hair Test -->
		<div class="mt-10 border-t border-cream/20 pt-6">
			<h2 class="font-satoshi text-cream font-bold text-lg mb-3">Blue Hair Flexibility Test</h2>
			<p class="text-cream/50 text-sm mb-4">Tests if LoRA can render non-training hair colors</p>
			<div class="flex gap-6">
				{#each blueHairIds as id}
					{@render blueHairCard(id)}
				{/each}
			</div>
		</div>
	</div>
</div>

<!-- Lightbox -->
{#if lightboxId}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
		onclick={() => lightboxId = null}
		onkeydown={() => {}}
		role="dialog"
	>
		<div class="relative overflow-hidden" onclick={(e) => e.stopPropagation()}>
			<img
				src="/api/obj005/{lightboxId}"
				alt={lightboxId}
				class="max-h-[90vh] max-w-[90vw] object-contain transition-transform duration-200 {zoom ? 'cursor-zoom-out' : 'cursor-zoom-in'}"
				style={zoom ? `transform: scale(3); transform-origin: ${zoom.x}% ${zoom.y}%` : ''}
				onclick={onLightboxClick}
			/>
			{#if !zoom}
				<div class="absolute bottom-2 right-2 flex gap-1">
					{@render voteButtons(lightboxId, 'lg')}
				</div>
			{/if}
		</div>
		<span class="absolute bottom-6 font-mono text-xs tracking-wider text-cream/70">
			{lightboxId} — {getLabel(lightboxId)}
		</span>
		<span class="absolute top-4 right-4 text-cream/40 text-sm">
			← → to navigate | Click to zoom | ESC to close
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
						src={cid === 'I048-face' ? '/obj005/I048-face.png' : `/api/obj005/${cid}`}
						alt={cid}
						class="max-h-[85vh] object-contain"
					/>
					{#if cid !== 'I048-face'}
						<div class="absolute bottom-2 right-2 flex gap-1">
							{@render voteButtons(cid, 'lg')}
						</div>
					{/if}
				</div>
				<div class="text-center">
					<div class="text-cream font-bold text-lg">{getINumber(cid)}</div>
					<div class="text-cream/70 text-sm">{getLabel(cid)}</div>
				</div>
			</div>
		{/each}
		<span class="absolute top-4 right-4 text-cream/40 text-sm">
			Click outside to close
		</span>
	</div>
{/if}
