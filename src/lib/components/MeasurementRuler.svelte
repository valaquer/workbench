<script lang="ts">
	// ═══════════════════════════════════════════════════════════════
	// MEASUREMENT RULER — Persistent Layout Tool
	// Drag horizontal lines, measure gaps, snap to spacing system
	// ═══════════════════════════════════════════════════════════════

	const STORAGE_KEY = 'honeybloom-rulers';
	const SPACING_INCREMENTS = [8, 16, 24, 32, 64];

	// Types
	interface Ruler {
		id: string;
		y: number;
		locked: boolean;
	}

	// State
	let rulers: Ruler[] = $state([]);
	let isOpen = $state(true);
	let selectedRulerIds: string[] = $state([]);
	let draggingId: string | null = $state(null);
	let dragStartY = $state(0);
	let dragStartRulerY = $state(0);
	let scrollY = $state(0);

	// Track scroll position
	function handleScroll() {
		scrollY = window.scrollY;
	}

	// Initialize scrollY on mount (browser may restore scroll position on refresh)
	$effect(() => {
		if (typeof window !== 'undefined') {
			scrollY = window.scrollY;
		}
	});

	// Load from localStorage on mount
	$effect(() => {
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				try {
					const parsed = JSON.parse(stored);
					if (Array.isArray(parsed)) {
						rulers = parsed;
					}
				} catch (e) {
					console.warn('Failed to parse ruler data:', e);
				}
			}
		}
	});

	// Persist to localStorage whenever rulers change (skip initial empty)
	let initialized = false;
	$effect(() => {
		if (typeof window !== 'undefined') {
			// Only persist after initial load
			if (!initialized && rulers.length === 0) {
				initialized = true;
				return;
			}
			initialized = true;
			localStorage.setItem(STORAGE_KEY, JSON.stringify(rulers));
		}
	});

	// Computed: gap between two selected rulers
	let gap = $derived(() => {
		if (selectedRulerIds.length !== 2) return null;
		const r1 = rulers.find(r => r.id === selectedRulerIds[0]);
		const r2 = rulers.find(r => r.id === selectedRulerIds[1]);
		if (!r1 || !r2) return null;
		return Math.abs(r1.y - r2.y);
	});

	// Actions
	function addRuler() {
		const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
		const newRuler = {
			id: crypto.randomUUID(),
			y: scrollY + 200,
			locked: false
		};
		rulers = [...rulers, newRuler];
	}

	function addRulerAtOffset(baseRulerId: string, offset: number) {
		const baseRuler = rulers.find(r => r.id === baseRulerId);
		if (!baseRuler) return;
		const newRuler = {
			id: crypto.randomUUID(),
			y: baseRuler.y + offset,
			locked: false
		};
		rulers = [...rulers, newRuler];
	}

	function deleteRuler(id: string) {
		rulers = rulers.filter(r => r.id !== id);
		selectedRulerIds = selectedRulerIds.filter(sid => sid !== id);
	}

	function toggleLock(id: string) {
		rulers = rulers.map(r => r.id === id ? { ...r, locked: !r.locked } : r);
	}

	function toggleSelect(id: string) {
		if (selectedRulerIds.includes(id)) {
			selectedRulerIds = selectedRulerIds.filter(sid => sid !== id);
		} else {
			// Max 2 selected for gap measurement
			if (selectedRulerIds.length >= 2) {
				selectedRulerIds = [selectedRulerIds[1], id];
			} else {
				selectedRulerIds = [...selectedRulerIds, id];
			}
		}
	}

	function clearAll() {
		rulers = [];
		selectedRulerIds = [];
	}

	// Drag handlers
	function startDrag(e: MouseEvent, ruler: Ruler) {
		if (ruler.locked) return;
		e.preventDefault();
		draggingId = ruler.id;
		dragStartY = e.clientY;
		dragStartRulerY = ruler.y;
		window.addEventListener('mousemove', onDrag);
		window.addEventListener('mouseup', endDrag);
	}

	function onDrag(e: MouseEvent) {
		if (!draggingId) return;
		const delta = e.clientY - dragStartY;
		const newY = Math.max(0, dragStartRulerY + delta);
		rulers = rulers.map(r => r.id === draggingId ? { ...r, y: newY } : r);
	}

	function endDrag() {
		draggingId = null;
		window.removeEventListener('mousemove', onDrag);
		window.removeEventListener('mouseup', endDrag);
	}

	// Sort rulers by Y for display
	let sortedRulers = $derived(() => [...rulers].sort((a, b) => a.y - b.y));
</script>

<svelte:window on:scroll={handleScroll} />

<!-- Toggle button (always visible) -->
<button
	class="fixed bottom-4 left-4 z-[9999] px-3 py-1.5 bg-dark/90 border border-cream/20 rounded text-xs font-mono text-cream/60 hover:text-cream hover:border-cream/40 transition-colors"
	onclick={() => isOpen = !isOpen}
>
	📏 {isOpen ? 'Hide' : 'Show'} Rulers
</button>

{#if isOpen}
	<!-- Control panel -->
	<div class="fixed bottom-14 left-4 z-[9999] p-3 bg-dark/95 border border-cream/20 rounded-lg text-xs font-mono space-y-2 min-w-[180px]">
		<div class="flex items-center justify-between gap-2 pb-2 border-b border-cream/10">
			<span class="text-cream/70">Rulers ({rulers.length})</span>
			<div class="flex gap-1">
				<button
					class="px-2 py-1 bg-magenta/20 text-magenta rounded hover:bg-magenta/30 transition-colors"
					onclick={addRuler}
				>
					+ Add
				</button>
				{#if rulers.length > 0}
					<button
						class="px-2 py-1 bg-cream/10 text-cream/50 rounded hover:bg-cream/20 hover:text-cream/70 transition-colors"
						onclick={clearAll}
					>
						Clear
					</button>
				{/if}
			</div>
		</div>

		<!-- Gap readout -->
		{#if gap() !== null}
			<div class="py-2 px-3 bg-emerald/20 border border-emerald/30 rounded text-emerald text-center">
				Gap: <span class="font-bold">{gap()}px</span>
			</div>
		{:else if rulers.length >= 2}
			<p class="text-cream/40 text-center py-1">Click 2 rulers to measure gap</p>
		{/if}

		<!-- Ruler list -->
		{#if rulers.length > 0}
			<div class="space-y-1 max-h-48 overflow-y-auto">
				{#each sortedRulers() as ruler (ruler.id)}
					{@const isSelected = selectedRulerIds.includes(ruler.id)}
					<div
						class="flex items-center gap-2 p-1.5 rounded transition-colors {isSelected ? 'bg-magenta/20' : 'hover:bg-cream/5'}"
					>
						<button
							class="flex-1 text-left text-cream/70 hover:text-cream transition-colors"
							onclick={() => toggleSelect(ruler.id)}
						>
							{Math.round(ruler.y)}px
						</button>
						<button
							class="px-1.5 py-0.5 rounded transition-colors {ruler.locked ? 'bg-emerald/30 text-emerald' : 'bg-cream/10 text-cream/40 hover:text-cream/70'}"
							onclick={() => toggleLock(ruler.id)}
							title={ruler.locked ? 'Unlock' : 'Lock'}
						>
							{ruler.locked ? '🔒' : '🔓'}
						</button>
						<button
							class="px-1.5 py-0.5 bg-cream/10 text-cream/40 rounded hover:bg-red-500/20 hover:text-red-400 transition-colors"
							onclick={() => deleteRuler(ruler.id)}
							title="Delete"
						>
							×
						</button>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Ruler lines on page -->
	{#each rulers as ruler (ruler.id)}
		{@const isSelected = selectedRulerIds.includes(ruler.id)}
		{@const isDragging = draggingId === ruler.id}

		<!-- The ruler line (with invisible wider hit area for dragging) -->
		<div
			class="fixed left-0 right-0 z-[9998] h-[2px] transition-colors {isSelected ? 'bg-emerald' : 'bg-magenta/70'} {ruler.locked ? '' : 'cursor-ns-resize'}"
			style="top: {ruler.y - scrollY}px;"
		>
			<!-- Invisible wider hit area for easier grabbing -->
			<div
				class="absolute inset-x-0 -top-3 h-7 {ruler.locked ? '' : 'cursor-ns-resize'}"
				onmousedown={(e) => startDrag(e, ruler)}
			></div>
			<!-- Drag handle + label (far left) -->
			<div
				role="slider"
				tabindex="0"
				aria-valuenow={ruler.y}
				aria-label="Ruler position"
				class="absolute left-4 -translate-y-1/2 pointer-events-auto cursor-ns-resize flex items-center gap-2"
				onmousedown={(e) => startDrag(e, ruler)}
			>
				<!-- Label pill -->
				<div
					class="px-2 py-1 rounded text-[10px] font-mono whitespace-nowrap transition-all {isSelected ? 'bg-emerald text-dark' : 'bg-magenta text-cream'} {ruler.locked ? 'opacity-70' : ''} {isDragging ? 'scale-110' : ''}"
				>
					{Math.round(ruler.y)}px {ruler.locked ? '🔒' : ''}
				</div>

				<!-- Spacing buttons (always visible) -->
				<div class="flex gap-1">
					{#each SPACING_INCREMENTS as inc}
						<button
							class="px-1.5 py-0.5 text-[9px] bg-dark/90 border border-cream/20 text-cream/60 rounded hover:bg-magenta/30 hover:text-magenta hover:border-magenta/50 transition-colors"
							onclick={(e) => { e.stopPropagation(); addRulerAtOffset(ruler.id, inc); }}
							title="Add ruler at +{inc}px"
						>
							+{inc}
						</button>
					{/each}
				</div>
			</div>

			<!-- Left edge marker -->
			<div class="absolute left-2 -translate-y-1/2 w-3 h-3 border-l-2 border-t-2 {isSelected ? 'border-emerald' : 'border-magenta/70'}"></div>

			<!-- Right edge marker -->
			<div class="absolute right-2 -translate-y-1/2 w-3 h-3 border-r-2 border-t-2 {isSelected ? 'border-emerald' : 'border-magenta/70'}"></div>
		</div>
	{/each}
{/if}
