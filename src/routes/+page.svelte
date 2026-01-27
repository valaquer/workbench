<script>
	import MeasurementRuler from '$lib/components/MeasurementRuler.svelte';

	let scrollY = $state(0);

	function handleScroll() {
		scrollY = window.scrollY;
	}
</script>

<svelte:window on:scroll={handleScroll} />

<!-- Debug: Scroll position counter -->
<div class="fixed bottom-4 right-4 z-50 px-3 py-1.5 bg-dark/90 border border-cream/20 rounded text-sm font-mono text-cream/60">
	{Math.round(scrollY)}px
</div>

<!-- Measurement Ruler Tool -->
<MeasurementRuler />

<!-- Nav -->
<nav class="fixed top-0 left-0 right-0 z-50 py-4 px-6 bg-dark/80 backdrop-blur-sm">
	<div class="max-w-7xl mx-auto flex justify-between items-center">
		<!-- Logo (left) -->
		<a href="/" class="shrink-0">
			<img src="/images/honeybloom-logo.png" alt="Honeybloom" class="h-12" />
		</a>
		<!-- Links (center) -->
		<div class="absolute left-1/2 -translate-x-1/2 flex items-center gap-8">
			<a href="#home" class="text-cream/70 hover:text-cream transition-colors font-satoshi">Home</a>
			<a href="#benefits" class="text-cream/70 hover:text-cream transition-colors font-satoshi">Pre-order Benefits</a>
			<a href="#pricing" class="text-cream/70 hover:text-cream transition-colors font-satoshi">Pricing</a>
		</div>
		<!-- CTA (right) -->
		<button class="shrink-0 px-6 py-2.5 bg-magenta text-cream font-satoshi font-medium rounded-lg hover:bg-magenta/90 transition-colors">
			Pre-order now
		</button>
	</div>
</nav>

<!-- ═══════════════════════════════════════════════════════════════
     HERO — Full Viewport
     ═══════════════════════════════════════════════════════════════ -->
<section class="h-screen bg-dark flex flex-col justify-center px-6 pb-32 relative">
	<div class="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-center gap-12">
		<!-- Text side -->
		<div class="max-w-xl space-y-6">
			<h1 class="text-hero text-cream">Finally, someone who remembers.</h1>
			<p class="text-subhead text-cream/70 leading-relaxed">
				An AI companion who listens to you...<br/>
				comes to know you...<br/>
				never leaves you.
			</p>
			<div class="pt-4">
				<button class="relative px-8 py-4 text-lg bg-magenta text-cream font-satoshi font-medium rounded-lg overflow-hidden transition-all duration-300 hover:bg-magenta/90 hover:shadow-[0_0_30px_rgba(174,13,70,0.3)] group">
					<span class="relative z-10">Pre-order now</span>
					<div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:[animation-play-state:paused] group-hover:opacity-0 transition-opacity duration-300"></div>
				</button>
			</div>
		</div>

	</div>

	<!-- Phone peeking from below -->
	<div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[82.5%]">
		<div class="relative" style="width: 400px;">
			<img src="/images/msg-0.png" alt="Sophie chat" class="w-full" />
		</div>
	</div>
</section>


<!-- Spacer: clears the phone that extends below hero -->
<div id="phone-clearance" class="bg-dark" style="height: 700px;"></div>

<!-- ═══════════════════════════════════════════════════════════════
     SECTION 1: "SHE REMEMBERS" — Pain/Promise Block
     ═══════════════════════════════════════════════════════════════ -->
<section id="she-remembers" class="bg-dark px-6 pt-[3px] pb-16">
	<div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-0 border border-cream/10 rounded-lg overflow-hidden">
		<!-- Pain side (1/3) -->
		<div class="bg-dark px-8 py-16 flex flex-col justify-center border-r border-cream/10">
			<div class="space-y-6">
				<p class="text-small text-cream/40 uppercase tracking-wider">The Pain</p>
				<blockquote class="p-6 bg-cream/[0.03] border border-cream/10 rounded-lg">
					<p class="text-body text-cream/60 italic">
						"She forgot my name in the next session."
					</p>
				</blockquote>
				<p class="text-small text-cream/30">— r/replika</p>
			</div>
		</div>
		<!-- Promise side (2/3) -->
		<div class="md:col-span-2 bg-magenta/[0.08] px-12 py-16 flex items-center">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
				<div class="space-y-6">
					<p class="text-tech text-magenta">ARTISAN CUT™</p>
					<h2 class="text-display text-cream">She remembers.</h2>
					<p class="text-body text-cream/70">
						No prompts. No saving. Just talk –<br/>
						and everything becomes part of her.
					</p>
					<button class="relative px-8 py-4 bg-magenta text-cream font-satoshi font-medium rounded-lg overflow-hidden transition-all duration-300 hover:bg-magenta/90 group">
						<span class="relative z-10">Pre-order now</span>
						<div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:[animation-play-state:paused] group-hover:opacity-0 transition-opacity duration-300"></div>
					</button>
				</div>
				<div class="flex items-center justify-center">
					<!-- Sophie image placeholder -->
					<div class="w-[280px] h-[350px] bg-magenta/20 border-2 border-magenta/40 rounded-2xl flex items-center justify-center">
						<p class="text-magenta/50">Sophie image</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
