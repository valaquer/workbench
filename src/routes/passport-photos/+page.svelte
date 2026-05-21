<script lang="ts">
	let { data } = $props();
</script>

<nav class="py-6 px-6 bg-dark">
	<div class="max-w-7xl mx-auto flex justify-between items-center">
		<a href="/" class="shrink-0">
			<img src="/images/brand-logo.png" alt="Honeybloom" class="h-12" />
		</a>
		<a href="/" class="text-cream/70 hover:text-cream transition-colors font-satoshi text-small">
			&larr; Back
		</a>
	</div>
</nav>

<div class="min-h-screen bg-dark px-6 pb-12">
	<div class="max-w-7xl mx-auto">
		<h1 class="font-satoshi text-2xl text-cream pt-8 pb-6">Passport Photos</h1>

		{#if data.ids.length === 0}
			<p class="text-cream/50 font-inter">No passport photos yet. Drop PNGs into <code class="text-cream/70">product/passport-photos/</code></p>
		{:else}
			<div class="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{#each data.ids as id}
					<div class="group relative overflow-hidden rounded-xl">
						<img
							src="/api/passport/{id}"
							alt={id}
							class="w-full aspect-square object-cover"
							loading="lazy"
						/>
						<div
							class="absolute inset-x-0 bottom-0 flex items-end justify-center pb-1.5
							       bg-gradient-to-t from-black/50 to-transparent h-12"
						>
							<span class="font-mono text-xs tracking-widest text-cream/70">
								{id}
							</span>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
