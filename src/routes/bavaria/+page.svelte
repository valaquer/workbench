<script lang="ts">
	import type { AssetMeta } from './+page.server';
	import { invalidateAll } from '$app/navigation';
	import { onDestroy } from 'svelte';

	let { data } = $props();
	let allIds = $derived(data.ids);
	let votes: Record<string, string> = $state({ ...data.votes });
	$effect(() => { votes = { ...data.votes }; });
	let meta: Record<string, AssetMeta> = $derived(data.meta ?? {});
	let comments: Record<string, string> = $derived(data.comments ?? {});
	let folders: string[] = $derived(data.folders ?? []);
	let folderData: Record<string, string[]> = $derived(data.folderData ?? {});
	let videoIds = $derived(new Set(data.videoIds ?? []));
	let selectedFolder = $state('');

	// Realtime asset detection via SSE (REQ-005)
	let eventSource: EventSource | null = null;
	if (typeof window !== 'undefined') {
		eventSource = new EventSource('/api/bavaria/events');
		eventSource.onmessage = (e) => {
			const msg = JSON.parse(e.data);
			if (msg.type === 'change') {
				invalidateAll();
			}
		};
	}
	onDestroy(() => {
		if (eventSource) eventSource.close();
	});

	// Folder selection
	$effect(() => {
		if (typeof localStorage !== 'undefined') {
			const saved = localStorage.getItem('bavaria-selected-folder');
			if (saved && folders.includes(saved)) {
				selectedFolder = saved;
			} else if (folders.length > 0) {
				selectedFolder = folders[0];
			}
		} else if (folders.length > 0 && !selectedFolder) {
			selectedFolder = folders[0];
		}
	});

	$effect(() => {
		if (typeof localStorage !== 'undefined' && selectedFolder) {
			localStorage.setItem('bavaria-selected-folder', selectedFolder);
		}
	});

	function folderLabel(f: string): string {
		return f.replace(/^\d+-/, '').replace(/^[A-Z]\d+\s/, '').replace(/-/g, ' ');
	}

	let ids = $derived.by(() => {
		const folderIds = selectedFolder ? (folderData[selectedFolder] ?? []) : allIds;
		return folderIds.sort((a, b) => a.localeCompare(b));
	});

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
	{#if votes[id] === 'intermediate' || votes[id] === 'archived'}{:else}
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
	{/if}
{/snippet}

{#snippet imageCard(id: string)}
	{@const m = meta[id]}
	<div
		class="group rounded-lg cursor-grab active:cursor-grabbing transition-opacity
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
		{#if videoIds.has(id)}
			<video
				src="/api/bavaria/{id}"
				class="w-full rounded-lg pointer-events-none"
				autoplay muted loop playsinline
			></video>
		{:else}
			<img
				src="/api/bavaria/{id}"
				alt={id}
				class="w-full rounded-lg pointer-events-none"
				loading="lazy"
			/>
		{/if}
		<div class="flex items-center gap-2 mt-1.5">
			<span class="font-mono text-xs tracking-wider text-[#7a5e4a] font-medium">{id}</span>
			{#if m}
				<span class="bg-dark text-cream/70 text-[9px] px-1.5 py-0.5 rounded font-mono border border-cream/10">{m.characterName}</span>
				<span class="bg-dark text-cream/50 text-[9px] px-1.5 py-0.5 rounded font-mono border border-cream/10">{m.useCase}</span>
			{/if}
			<div class="flex gap-0.5 ml-auto">
				{@render voteButtons(id, 'sm')}
			</div>
		</div>
		{#if comments[id]}
			<p class="text-cream/40 text-[9px] mt-1 font-mono leading-tight truncate">{comments[id]}</p>
		{/if}
	</div>
{/snippet}

<svelte:window onkeydown={handleKeydown} />

<div class="bavaria-root">
	<!-- Sidebar (verbatim from Facade +page.svelte lines 1102-1104, 1107-1114, 1118-1124) -->
	<div style="background: var(--color-bg-panel); border-right: 1px dashed var(--color-bg-step4); display: flex; flex-direction: column; height: 100vh; width: 280px; flex-shrink: 0;">
		<div style="flex: 1; overflow-y: auto; font-family: var(--font-sans);">
			<!-- Section header (Facade line 1108-1114) -->
			<div
				style="padding: 1rem 1rem 1rem 1.5rem; cursor: pointer; border-top: 1px dashed var(--color-bg-step4); border-bottom: 1px dashed var(--color-bg-step4);"
			>
				<p style="display: inline-block; font-size: 13px; font-weight: 500; font-family: var(--font-sans); background: var(--gradient-accent); background-repeat: no-repeat; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Teammates</p>
			</div>
			<!-- Folder items (Facade teammate row pattern, lines 1118-1124) -->
			{#each folders as folder, i}
				{@const count = (folderData[folder] ?? []).length}
				<div
					class="sidebar-row"
					onclick={() => selectedFolder = folder}
					style="padding: 0 1rem 0 1.5rem; cursor: pointer; color: {selectedFolder === folder ? 'var(--color-text)' : 'var(--color-text-muted)'}; background: {selectedFolder === folder ? 'var(--color-bg-element)' : (i % 2 === 1 ? 'rgba(255,255,255,0.02)' : 'transparent')}; position: relative;"
					role="button"
					tabindex="0"
					onkeydown={() => {}}
				>
					<div><span>{folderLabel(folder)}</span> {#if count > 0}<span class="sidebar-meta" style="font-size: 9px; color: #666;">{count}</span>{/if}</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Main content -->
	<div style="flex: 1; overflow-y: auto; padding: 1.5rem; background: var(--color-bg);">
		{#if ids.length > 0}
			<div class="flex flex-wrap gap-4">
				{#each ids as id}
					{@render imageCard(id)}
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.bavaria-root {
		--color-bg: #0b0d10;
		--color-bg-panel: #0e1114;
		--color-bg-element: #1e1e1e;
		--color-bg-step4: #282a30;
		--color-text: #CDCCC2;
		--color-text-muted: #808080;
		--font-sans: 'Inter', sans-serif;
		--font-mono: 'JetBrains Mono', ui-monospace, monospace;
		--gradient-accent: linear-gradient(90deg, #5c9cf5, #9d7cd8);
		display: flex;
		height: 100vh;
		background: var(--color-bg);
		color: var(--color-text);
		font-family: var(--font-mono);
		font-size: 12px;
		line-height: 1.8;
		font-weight: 300;
	}
	.sidebar-row:hover .sidebar-meta {
		opacity: 1 !important;
	}
	.sidebar-meta {
		opacity: 0;
		transition: opacity 0.15s;
	}
</style>

<!-- Lightbox -->
{#if lightboxId}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
		onclick={() => lightboxId = null}
		onkeydown={() => {}}
		role="dialog"
	>
		<div class="relative overflow-hidden" onclick={(e) => e.stopPropagation()}>
			{#if videoIds.has(lightboxId)}
				<video
					src="/api/bavaria/{lightboxId}"
					class="max-h-[90vh] max-w-[90vw] object-contain"
					autoplay muted loop playsinline controls
				></video>
			{:else}
				<img
					src="/api/bavaria/{lightboxId}"
					alt={lightboxId}
					class="max-h-[90vh] max-w-[90vw] object-contain transition-transform duration-200 {zoom ? 'cursor-zoom-out' : 'cursor-zoom-in'}"
					style={zoom ? `transform: scale(3); transform-origin: ${zoom.x}% ${zoom.y}%` : ''}
					onclick={onLightboxClick}
				/>
			{/if}
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
					{#if videoIds.has(cid)}
						<video
							src="/api/bavaria/{cid}"
							class="max-h-[85vh] object-contain"
							autoplay muted loop playsinline controls
						></video>
					{:else}
						<img
							src="/api/bavaria/{cid}"
							alt={cid}
							class="max-h-[85vh] object-contain"
						/>
					{/if}
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
