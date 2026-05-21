<script lang="ts">
	let { data } = $props();
	let ids = $state(data.ids);

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

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			if (zoom) zoom = null;
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

<svelte:window onkeydown={handleKeydown} />

<!-- Nav -->
<nav class="py-6 px-6 bg-dark">
	<div class="max-w-7xl mx-auto flex justify-between items-center">
		<a href="/" class="shrink-0">
			<img src="/images/brand-logo.png" alt="Honeybloom" class="h-12" />
		</a>
		<div class="flex items-center gap-4">
			<span class="font-satoshi text-small text-cream/60">
				Qwen Edit Dataset -- C2 -- {ids.length} images
			</span>
			<a href="/gallery" class="font-satoshi text-small text-cream/40 hover:text-cream transition-colors">
				Main Gallery
			</a>
		</div>
	</div>
</nav>

<!-- Dataset Gallery -->
<div class="min-h-screen bg-dark px-1 pb-12">
	<div class="flex flex-wrap justify-center gap-1">
		{#each ids as id, idx}
			<div
				class="group relative overflow-hidden rounded-lg cursor-pointer"
				style="width: 240px;"
				onclick={() => lightboxId = id}
				role="listitem"
			>
				<img
					src="/api/dataset/{id}"
					alt={id}
					class="w-full pointer-events-none"
					loading="lazy"
				/>
				<div
					class="absolute inset-x-0 bottom-0 flex items-end justify-between px-2 pb-1
					       bg-gradient-to-t from-black/60 to-transparent h-8 pointer-events-none"
				>
					<span class="font-mono text-[9px] tracking-wider text-cream/70">
						{String(idx + 1).padStart(2, '0')}/20
					</span>
					<span class="font-mono text-[9px] tracking-wider text-cream/50 truncate max-w-[180px]">
						{id}
					</span>
				</div>
			</div>
		{/each}
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
				src="/api/dataset/{lightboxId}"
				alt={lightboxId}
				class="max-h-[90vh] max-w-[90vw] object-contain transition-transform duration-200 {zoom ? 'cursor-zoom-out' : 'cursor-zoom-in'}"
				style={zoom ? `transform: scale(3); transform-origin: ${zoom.x}% ${zoom.y}%` : ''}
				onclick={onLightboxClick}
			/>
		</div>
		<span class="absolute bottom-6 font-mono text-xs tracking-wider text-cream/70">
			{lightboxId} -- {ids.indexOf(lightboxId) + 1}/{ids.length}
		</span>
	</div>
{/if}
