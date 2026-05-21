<script lang="ts">
	let { data } = $props();
	let ids = $state(data.ids.slice());
	let votes: Record<string, string> = $state({ ...data.votes });

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
			await fetch('/api/bavaria/vote', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
		} else {
			votes[id] = vote;
			votes = { ...votes };
			await fetch('/api/bavaria/vote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, vote }) });
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
			const currentIdx = ids.indexOf(lightboxId);
			if (currentIdx === -1) return;
			zoom = null;
			if (e.key === 'ArrowLeft' && currentIdx > 0) {
				lightboxId = ids[currentIdx - 1];
			} else if (e.key === 'ArrowRight' && currentIdx < ids.length - 1) {
				lightboxId = ids[currentIdx + 1];
			}
		}
	}
</script>

{#snippet voteButtons(id: string, size: 'sm' | 'lg')}
	{@const w = size === 'sm' ? 'w-4 h-4' : 'w-6 h-6'}
	{@const iconCheck = size === 'sm' ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5'}
	{@const iconX = size === 'sm' ? 'w-2 h-2' : 'w-3 h-3'}
	<button
		class="{w} rounded-full flex items-center justify-center transition-all
		       {votes[id] === 'approved' ? 'bg-green-500 text-white' : 'bg-black/50 text-cream/40 hover:bg-green-500/40 hover:text-white'}"
		onclick={(e) => { e.stopPropagation(); castVote(id, 'approved'); }}
		title="Approve"
	>
		<svg class="{iconCheck}" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
	</button>
	<button
		class="{w} rounded-full flex items-center justify-center transition-all
		       {votes[id] === 'rejected' ? 'bg-red-500 text-white' : 'bg-black/50 text-cream/40 hover:bg-red-500/40 hover:text-white'}"
		onclick={(e) => { e.stopPropagation(); castVote(id, 'rejected'); }}
		title="Reject"
	>
		<svg class="{iconX}" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
	</button>
{/snippet}

{#snippet imageCard(id: string)}
	<div
		class="group relative overflow-hidden rounded-lg cursor-grab active:cursor-grabbing transition-opacity
		       {dragId === id ? 'opacity-30' : ''}"
		style="width: 220px;"
		draggable="true"
		onclick={() => lightboxId = id}
		ondragstart={(e) => onDragStart(e, id)}
		ondragover={(e) => e.preventDefault()}
		ondrop={(e) => onDrop(e, id)}
		ondragend={() => dragId = null}
		role="listitem"
	>
		<img
			src="/api/bavaria/{id}"
			alt={id}
			class="w-full pointer-events-none"
			loading="lazy"
		/>
		<div class="absolute bottom-1 right-1 flex gap-1">
			{@render voteButtons(id, 'sm')}
		</div>
		<div
			class="absolute inset-x-0 bottom-0 flex items-end justify-center pb-1
			       bg-gradient-to-t from-black/60 to-transparent h-8 pointer-events-none"
		>
			<span class="font-mono text-[10px] tracking-wider text-cream/90 font-medium">
				{id}
			</span>
		</div>
	</div>
{/snippet}

<svelte:window onkeydown={handleKeydown} />

<!-- Header -->
<nav class="py-4 px-6 bg-dark">
	<div class="max-w-7xl mx-auto">
		<h1 class="font-satoshi text-xl text-cream">Bavaria -- Production Assets</h1>
		<p class="text-cream/50 text-sm mt-1">Drag to compare. Click to zoom. Arrow keys to navigate.</p>
		<p class="text-cream/50 text-sm">{ids.length} assets. {Object.values(votes).filter(v => v === 'approved').length} approved. {Object.values(votes).filter(v => v === 'rejected').length} rejected.</p>
	</div>
</nav>

<!-- Grid -->
<div class="min-h-screen bg-dark px-6 pb-12">
	<div class="max-w-7xl mx-auto">
		{#if ids.length === 0}
			<div class="flex items-center justify-center h-64">
				<p class="text-cream/40 text-lg">No assets in Bavaria folder yet.</p>
			</div>
		{:else}
			<div class="flex flex-wrap gap-4 mt-6">
				{#each ids as id}
					{@render imageCard(id)}
				{/each}
			</div>
		{/if}
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
				src="/api/bavaria/{lightboxId}"
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
			{lightboxId}
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
						src="/api/bavaria/{cid}"
						alt={cid}
						class="max-h-[85vh] object-contain"
					/>
					<div class="absolute bottom-2 right-2 flex gap-1">
						{@render voteButtons(cid, 'lg')}
					</div>
				</div>
				<span class="font-mono text-xs tracking-wider text-cream/70">
					{cid}
				</span>
			</div>
		{/each}
	</div>
{/if}
