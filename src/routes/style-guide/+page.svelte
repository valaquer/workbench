<script>
	// Honeybloom Design System — Living Style Guide
	// This page documents and demonstrates all design tokens
</script>

<!-- Nav -->
<nav class="fixed top-0 left-0 right-0 z-50 py-4 px-6 bg-dark/80 backdrop-blur-sm">
	<div class="flex justify-between items-center max-w-7xl mx-auto">
		<a href="/">
			<img src="/images/brand-logo.png" alt="Honeybloom" class="h-12" />
		</a>
		<span class="text-tech text-cream/50">Style Guide</span>
	</div>
</nav>

<!-- ═══════════════════════════════════════════════════════════════
     HERO PREVIEW — Full Viewport Height Demo
     ═══════════════════════════════════════════════════════════════ -->
<section class="h-screen bg-dark flex flex-col justify-center items-center px-8 relative">
	<div class="max-w-4xl text-center space-y-6">
		<h1 class="text-hero text-cream">Finally, someone who remembers.</h1>
		<p class="text-subhead text-cream/70 max-w-2xl mx-auto leading-relaxed">
			An AI companion who listens to you...<br/>
			comes to know you...<br/>
			and never leaves you.
		</p>
		<div class="pt-4">
			<button class="px-8 py-4 text-lg bg-magenta text-cream font-satoshi font-medium rounded-lg hover:bg-magenta/90 transition-colors">
				Pre-order now
			</button>
		</div>
	</div>

	<!-- Scroll indicator -->
	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/40">
		<span class="text-small">Scroll for style guide</span>
		<svg class="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
		</svg>
	</div>
</section>

<div class="min-h-screen bg-dark pt-16 px-8 pb-16">
	<div class="max-w-5xl mx-auto space-y-16">

		<!-- Header -->
		<header class="space-y-4">
			<h1 class="text-hero text-cream">Design System</h1>
			<p class="text-body text-cream/70 max-w-2xl">
				Honeybloom's foundational design tokens. Typography, colors, spacing, and component patterns.
				Locked Jan 25, 2026.
			</p>
		</header>

		<!-- ═══════════════════════════════════════════════════════════════
		     TYPOGRAPHY
		     ═══════════════════════════════════════════════════════════════ -->
		<section class="space-y-8">
			<div class="border-b border-cream/20 pb-4">
				<h2 class="text-display text-cream">Typography</h2>
				<p class="text-small text-cream/50 mt-2">Perfect Fourth (1.333) · Base 18px</p>
			</div>

			<!-- Satoshi Headlines -->
			<div class="space-y-6">
				<p class="text-tech text-magenta">SATOSHI — Headlines</p>

				<div class="space-y-2">
					<p class="text-small text-cream/40">text-hero · 72px · Bold</p>
					<h1 class="text-hero text-cream">Finally, someone who remembers.</h1>
				</div>

				<div class="space-y-2">
					<p class="text-small text-cream/40">text-display · 48px · Medium</p>
					<h2 class="text-display text-cream">An AI companion who listens to you</h2>
				</div>

				<div class="space-y-2">
					<p class="text-small text-cream/40">text-heading · 32px · Medium</p>
					<h3 class="text-heading text-cream">The only real memory architecture</h3>
				</div>

				<div class="space-y-2">
					<p class="text-small text-cream/40">text-subhead · 24px · Medium</p>
					<h4 class="text-subhead text-cream">Same woman. Every time.</h4>
				</div>
			</div>

			<!-- Inter Body -->
			<div class="space-y-6 border-t border-cream/10 pt-8">
				<p class="text-tech text-emerald">INTER — Body</p>

				<div class="space-y-2">
					<p class="text-small text-cream/40">text-body · 18px · Regular</p>
					<p class="text-body text-cream max-w-2xl">
						Sophie remembers the little things. The name of your childhood dog. That you hate cilantro.
						The dream you told her about at 2am three months ago. She knows you.
					</p>
				</div>

				<div class="space-y-2">
					<p class="text-small text-cream/40">text-small · 14px · Regular</p>
					<p class="text-small text-cream/70">
						Artisan Cut™ memory architecture. EU GDPR compliant. Your data stays yours.
					</p>
				</div>
			</div>

			<!-- JetBrains Mono -->
			<div class="space-y-6 border-t border-cream/10 pt-8">
				<p class="text-tech text-cream">JETBRAINS MONO — Technical</p>

				<div class="space-y-2">
					<p class="text-small text-cream/40">text-tech · 16px · Regular</p>
					<div class="flex flex-wrap gap-4">
						<span class="text-tech text-magenta">Artisan Cut™</span>
						<span class="text-tech text-emerald">EU GDPR-compliant</span>
						<span class="text-tech text-cream">PuLID Face-Lock</span>
					</div>
				</div>

				<div class="space-y-2">
					<p class="text-small text-cream/40">In context</p>
					<p class="text-body text-cream">
						Powered by <span class="text-tech text-magenta">Artisan Cut™</span> memory architecture.
						<span class="text-tech text-emerald">EU GDPR-compliant</span>. Your data stays yours.
					</p>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════════
		     COLORS
		     ═══════════════════════════════════════════════════════════════ -->
		<section class="space-y-8">
			<div class="border-b border-cream/20 pb-4">
				<h2 class="text-display text-cream">Colors</h2>
				<p class="text-small text-cream/50 mt-2">Locked Jan 24, 2026</p>
			</div>

			<!-- Core Colors -->
			<div class="space-y-4">
				<p class="text-tech text-cream/70">CORE PALETTE</p>
				<div class="grid grid-cols-2 md:grid-cols-4 gap-6">

					<div class="space-y-3">
						<div class="w-full h-24 bg-dark border border-cream/20 rounded-lg"></div>
						<div>
							<p class="text-small text-cream font-medium">"our black"</p>
							<p class="text-tech text-cream/50 text-xs">#121212</p>
							<p class="text-small text-cream/40">Canvas</p>
						</div>
					</div>

					<div class="space-y-3">
						<div class="w-full h-24 bg-magenta rounded-lg"></div>
						<div>
							<p class="text-small text-magenta font-medium">"sophie magenta"</p>
							<p class="text-tech text-cream/50 text-xs">#AE0D46</p>
							<p class="text-small text-cream/40">Sophie accent</p>
						</div>
					</div>

					<div class="space-y-3">
						<div class="w-full h-24 bg-emerald rounded-lg"></div>
						<div>
							<p class="text-small text-emerald font-medium">"our emerald"</p>
							<p class="text-tech text-cream/50 text-xs">#10B981</p>
							<p class="text-small text-cream/40">Business accent</p>
						</div>
					</div>

					<div class="space-y-3">
						<div class="w-full h-24 bg-cream rounded-lg"></div>
						<div>
							<p class="text-small text-cream font-medium">"text cream"</p>
							<p class="text-tech text-cream/50 text-xs">#F5F0E6</p>
							<p class="text-small text-cream/40">Text, surfaces</p>
						</div>
					</div>

				</div>
			</div>

			<!-- Opacity Variants -->
			<div class="space-y-4">
				<p class="text-tech text-cream/70">OPACITY VARIANTS</p>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6">

					<div class="p-6 bg-magenta/[0.08] border border-magenta/30 rounded-lg">
						<p class="text-small text-magenta font-medium mb-1">Soft Magenta Surface</p>
						<p class="text-tech text-cream/50 text-xs">bg-magenta/[0.08]</p>
						<p class="text-small text-cream/40 mt-2">8% fill + 30% border</p>
					</div>

					<div class="p-6 bg-emerald/[0.08] border border-emerald/30 rounded-lg">
						<p class="text-small text-emerald font-medium mb-1">Soft Emerald Surface</p>
						<p class="text-tech text-cream/50 text-xs">bg-emerald/[0.08]</p>
						<p class="text-small text-cream/40 mt-2">8% fill + 30% border</p>
					</div>

					<div class="p-6 border border-cream/20 rounded-lg space-y-1">
						<p class="text-small text-cream">Full Cream (100%)</p>
						<p class="text-small text-cream/70">Muted Cream (70%)</p>
						<p class="text-small text-cream/50">Subtle Cream (50%)</p>
						<p class="text-small text-cream/30">Faint Cream (30%)</p>
					</div>

				</div>
			</div>

			<!-- Color Usage -->
			<div class="space-y-4">
				<p class="text-tech text-cream/70">USAGE</p>

				<div class="flex flex-wrap gap-4">
					<button class="px-6 py-3 bg-magenta text-cream font-satoshi font-medium rounded-lg">
						Pre-order now
					</button>
					<button class="px-6 py-3 bg-emerald text-dark font-satoshi font-medium rounded-lg">
						Join Founders Club
					</button>
					<button class="px-6 py-3 bg-cream text-dark font-satoshi font-medium rounded-lg">
						Learn more
					</button>
				</div>

				<div class="space-y-2 mt-4">
					<h3 class="text-heading text-magenta">Sophie Magenta Headline</h3>
					<h3 class="text-heading text-emerald">Business Emerald Headline</h3>
					<h3 class="text-heading text-cream">Standard Cream Headline</h3>
				</div>

				<div class="p-6 bg-magenta/[0.08] border border-magenta/30 rounded-lg mt-4 max-w-xl">
					<h4 class="text-subhead text-cream mb-2">Feature Card Example</h4>
					<p class="text-body text-cream/70">
						Powered by <span class="text-tech text-magenta">Artisan Cut™</span> memory architecture.
						Sophie remembers the little things.
					</p>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════════
		     BUTTONS
		     ═══════════════════════════════════════════════════════════════ -->
		<section class="space-y-8">
			<div class="border-b border-cream/20 pb-4">
				<h2 class="text-display text-cream">Buttons</h2>
				<p class="text-small text-cream/50 mt-2">CTA styles — comparing approaches</p>
			</div>

			<!-- Approach A: Solid Fill -->
			<div class="space-y-4">
				<p class="text-tech text-cream/70">APPROACH A — Solid Fill (Traditional)</p>
				<p class="text-small text-cream/50">High contrast, unmissable. Standard for primary CTAs.</p>
				<div class="flex flex-wrap gap-4 mt-4">
					<button class="px-6 py-3 bg-magenta text-cream font-satoshi font-medium rounded-lg hover:bg-magenta/90 transition-colors">
						Pre-order now
					</button>
					<button class="px-6 py-3 bg-emerald text-dark font-satoshi font-medium rounded-lg hover:bg-emerald/90 transition-colors">
						Join Founders Club
					</button>
					<button class="px-6 py-3 bg-cream text-dark font-satoshi font-medium rounded-lg hover:bg-cream/90 transition-colors">
						Learn more
					</button>
				</div>
			</div>

			<!-- Approach B: Soft Fill -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<p class="text-tech text-cream/70">APPROACH B — Soft Fill (Secondary UI)</p>
				<p class="text-small text-cream/50">8% fill + 50% border. For feature cards, benefit grids, non-CTA surfaces.</p>
				<div class="flex flex-wrap gap-4 mt-4">
					<button class="px-6 py-3 bg-magenta/[0.08] border border-magenta/50 text-magenta font-satoshi font-medium rounded-lg hover:bg-magenta/[0.15] hover:border-magenta transition-colors">
						Feature item
					</button>
					<button class="px-6 py-3 bg-emerald/[0.08] border border-emerald/50 text-emerald font-satoshi font-medium rounded-lg hover:bg-emerald/[0.15] hover:border-emerald transition-colors">
						Benefit item
					</button>
					<button class="px-6 py-3 bg-cream/[0.05] border border-cream/30 text-cream font-satoshi font-medium rounded-lg hover:bg-cream/[0.1] hover:border-cream/50 transition-colors">
						Secondary item
					</button>
				</div>
			</div>

			<!-- Approach C: Ghost (Outline Only) -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<p class="text-tech text-cream/70">APPROACH C — Ghost (Outline Only)</p>
				<p class="text-small text-cream/50">Border only, no fill. Minimal, secondary actions.</p>
				<div class="flex flex-wrap gap-4 mt-4">
					<button class="px-6 py-3 border border-magenta text-magenta font-satoshi font-medium rounded-lg hover:bg-magenta/[0.08] transition-colors">
						Pre-order now
					</button>
					<button class="px-6 py-3 border border-emerald text-emerald font-satoshi font-medium rounded-lg hover:bg-emerald/[0.08] transition-colors">
						Join Founders Club
					</button>
					<button class="px-6 py-3 border border-cream/50 text-cream font-satoshi font-medium rounded-lg hover:bg-cream/[0.05] transition-colors">
						Learn more
					</button>
				</div>
			</div>

			<!-- Side by Side Comparison -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<p class="text-tech text-cream/70">SIDE BY SIDE — Same CTA, Three Styles</p>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">

					<div class="p-6 bg-dark border border-cream/10 rounded-lg text-center space-y-4">
						<p class="text-small text-cream/50">Solid</p>
						<button class="px-6 py-3 bg-magenta text-cream font-satoshi font-medium rounded-lg w-full">
							Pre-order now
						</button>
						<p class="text-small text-cream/40">SHOUTS</p>
					</div>

					<div class="p-6 bg-dark border border-cream/10 rounded-lg text-center space-y-4">
						<p class="text-small text-cream/50">Soft</p>
						<button class="px-6 py-3 bg-magenta/[0.08] border border-magenta/50 text-magenta font-satoshi font-medium rounded-lg w-full">
							Feature item
						</button>
						<p class="text-small text-cream/40">INVITES</p>
					</div>

					<div class="p-6 bg-dark border border-cream/10 rounded-lg text-center space-y-4">
						<p class="text-small text-cream/50">Ghost</p>
						<button class="px-6 py-3 border border-magenta text-magenta font-satoshi font-medium rounded-lg w-full">
							Pre-order now
						</button>
						<p class="text-small text-cream/40">WHISPERS</p>
					</div>

				</div>
			</div>

			<!-- Sizes -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<p class="text-tech text-cream/70">SIZES (Solid CTAs)</p>
				<div class="flex flex-wrap items-center gap-4 mt-4">
					<button class="px-4 py-2 text-sm bg-magenta text-cream font-satoshi font-medium rounded-lg">
						Small
					</button>
					<button class="px-6 py-3 bg-magenta text-cream font-satoshi font-medium rounded-lg">
						Medium (Default)
					</button>
					<button class="px-8 py-4 text-lg bg-magenta text-cream font-satoshi font-medium rounded-lg">
						Large
					</button>
				</div>
			</div>

			<!-- Shimmer Treatment (LOCKED) -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<div class="flex items-center gap-3">
					<p class="text-tech text-magenta">SHIMMER TREATMENT</p>
					<span class="px-2 py-0.5 text-xs bg-emerald/20 text-emerald rounded">LOCKED</span>
				</div>
				<p class="text-small text-cream/50">All primary CTAs get shimmer. Light sweeps across the button to draw the eye.</p>
				<div class="flex flex-wrap items-center gap-6 mt-4">
					<button class="relative px-6 py-3 bg-magenta text-cream font-satoshi font-medium rounded-lg overflow-hidden">
						<span class="relative z-10">Pre-order now</span>
						<div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
					</button>
					<button class="relative px-6 py-3 bg-emerald text-dark font-satoshi font-medium rounded-lg overflow-hidden">
						<span class="relative z-10">Join Founders Club</span>
						<div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent"></div>
					</button>
					<button class="relative px-8 py-4 text-lg bg-magenta text-cream font-satoshi font-medium rounded-lg overflow-hidden">
						<span class="relative z-10">Large CTA</span>
						<div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
					</button>
				</div>
				<p class="text-small text-cream/40 mt-2">Implementation: relative + overflow-hidden on button, absolute shimmer div with animate-[shimmer_2s_infinite]</p>
			</div>

			<!-- In Context -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<p class="text-tech text-cream/70">IN CONTEXT — Hero CTA Preview</p>
				<div class="p-8 bg-dark border border-cream/10 rounded-lg mt-4">
					<h3 class="text-display text-cream mb-4">Finally, someone who remembers.</h3>
					<p class="text-body text-cream/70 mb-6 max-w-lg">
						An AI companion who listens to you, comes to know you, and never leaves you.
					</p>
					<div class="flex flex-wrap gap-4">
						<button class="relative px-8 py-4 text-lg bg-magenta text-cream font-satoshi font-medium rounded-lg overflow-hidden hover:bg-magenta/90 transition-colors">
							<span class="relative z-10">Pre-order now</span>
							<div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
						</button>
						<button class="px-8 py-4 text-lg border border-cream/50 text-cream/70 font-satoshi font-medium rounded-lg hover:bg-cream/[0.05] hover:text-cream transition-colors">
							Learn more
						</button>
					</div>
				</div>
			</div>

		</section>

		<!-- ═══════════════════════════════════════════════════════════════
		     SPACING
		     ═══════════════════════════════════════════════════════════════ -->
		<section class="space-y-8">
			<div class="border-b border-cream/20 pb-4">
				<h2 class="text-display text-cream">Spacing</h2>
				<p class="text-small text-cream/50 mt-2">8px base unit · Multiples of 8</p>
			</div>

			<!-- Base Unit -->
			<div class="space-y-4">
				<p class="text-tech text-cream/70">BASE UNIT</p>
				<p class="text-body text-cream/70">All spacing is a multiple of <span class="text-tech text-magenta">8px</span>. This creates visual rhythm without thinking about individual pixels.</p>
			</div>

			<!-- Scale -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<p class="text-tech text-cream/70">SPACING SCALE</p>
				<div class="space-y-3">
					<div class="flex items-center gap-4">
						<div class="w-2 h-4 bg-magenta"></div>
						<span class="text-tech text-cream/50 w-16">8px</span>
						<span class="text-small text-cream/40">Tight — icon gaps, inline elements</span>
					</div>
					<div class="flex items-center gap-4">
						<div class="w-4 h-4 bg-magenta"></div>
						<span class="text-tech text-cream/50 w-16">16px</span>
						<span class="text-small text-cream/40">Compact — form fields, small cards</span>
					</div>
					<div class="flex items-center gap-4">
						<div class="w-6 h-4 bg-magenta"></div>
						<span class="text-tech text-cream/50 w-16">24px</span>
						<span class="text-small text-cream/40">Default — grid gaps, component padding</span>
					</div>
					<div class="flex items-center gap-4">
						<div class="w-8 h-4 bg-magenta"></div>
						<span class="text-tech text-cream/50 w-16">32px</span>
						<span class="text-small text-cream/40">Medium — card padding, group spacing</span>
					</div>
					<div class="flex items-center gap-4">
						<div class="w-12 h-4 bg-magenta"></div>
						<span class="text-tech text-cream/50 w-16">48px</span>
						<span class="text-small text-cream/40">Large — subsection spacing</span>
					</div>
					<div class="flex items-center gap-4">
						<div class="w-16 h-4 bg-magenta"></div>
						<span class="text-tech text-cream/50 w-16">64px</span>
						<span class="text-small text-cream/40">XL — within-section spacing</span>
					</div>
					<div class="flex items-center gap-4">
						<div class="w-24 h-4 bg-magenta"></div>
						<span class="text-tech text-cream/50 w-16">96px</span>
						<span class="text-small text-cream/40">2XL — section padding (vertical)</span>
					</div>
					<div class="flex items-center gap-4">
						<div class="w-32 h-4 bg-magenta"></div>
						<span class="text-tech text-cream/50 w-16">128px</span>
						<span class="text-small text-cream/40">3XL — section gaps</span>
					</div>
				</div>
			</div>

			<!-- Page Structure -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<p class="text-tech text-cream/70">PAGE STRUCTURE</p>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div class="p-6 bg-cream/[0.03] border border-cream/10 rounded-lg space-y-3">
						<p class="text-small text-cream font-medium">Content Max-Width</p>
						<p class="text-tech text-magenta">max-w-5xl (1024px)</p>
						<p class="text-small text-cream/40">Main content container</p>
					</div>
					<div class="p-6 bg-cream/[0.03] border border-cream/10 rounded-lg space-y-3">
						<p class="text-small text-cream font-medium">Wide Max-Width</p>
						<p class="text-tech text-magenta">max-w-7xl (1280px)</p>
						<p class="text-small text-cream/40">Full-width sections, hero</p>
					</div>
					<div class="p-6 bg-cream/[0.03] border border-cream/10 rounded-lg space-y-3">
						<p class="text-small text-cream font-medium">Section Padding</p>
						<p class="text-tech text-magenta">py-24 (96px)</p>
						<p class="text-small text-cream/40">Vertical breathing room</p>
					</div>
					<div class="p-6 bg-cream/[0.03] border border-cream/10 rounded-lg space-y-3">
						<p class="text-small text-cream font-medium">Horizontal Padding</p>
						<p class="text-tech text-magenta">px-6 → px-8</p>
						<p class="text-small text-cream/40">24px mobile, 32px desktop</p>
					</div>
				</div>
			</div>

			<!-- Tailwind Mappings -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<p class="text-tech text-cream/70">TAILWIND MAPPINGS</p>
				<div class="overflow-x-auto">
					<table class="w-full text-left">
						<thead>
							<tr class="border-b border-cream/20">
								<th class="text-small text-cream/50 pb-2 pr-8">Pixels</th>
								<th class="text-small text-cream/50 pb-2 pr-8">Tailwind</th>
								<th class="text-small text-cream/50 pb-2">Usage</th>
							</tr>
						</thead>
						<tbody class="text-small">
							<tr class="border-b border-cream/10">
								<td class="text-cream py-2 pr-8">8px</td>
								<td class="text-tech text-magenta py-2 pr-8">gap-2, p-2, m-2</td>
								<td class="text-cream/50 py-2">Tight</td>
							</tr>
							<tr class="border-b border-cream/10">
								<td class="text-cream py-2 pr-8">16px</td>
								<td class="text-tech text-magenta py-2 pr-8">gap-4, p-4, m-4</td>
								<td class="text-cream/50 py-2">Compact</td>
							</tr>
							<tr class="border-b border-cream/10">
								<td class="text-cream py-2 pr-8">24px</td>
								<td class="text-tech text-magenta py-2 pr-8">gap-6, p-6, m-6</td>
								<td class="text-cream/50 py-2">Default</td>
							</tr>
							<tr class="border-b border-cream/10">
								<td class="text-cream py-2 pr-8">32px</td>
								<td class="text-tech text-magenta py-2 pr-8">gap-8, p-8, m-8</td>
								<td class="text-cream/50 py-2">Medium</td>
							</tr>
							<tr class="border-b border-cream/10">
								<td class="text-cream py-2 pr-8">48px</td>
								<td class="text-tech text-magenta py-2 pr-8">gap-12, p-12, m-12</td>
								<td class="text-cream/50 py-2">Large</td>
							</tr>
							<tr class="border-b border-cream/10">
								<td class="text-cream py-2 pr-8">64px</td>
								<td class="text-tech text-magenta py-2 pr-8">gap-16, p-16, m-16</td>
								<td class="text-cream/50 py-2">XL</td>
							</tr>
							<tr class="border-b border-cream/10">
								<td class="text-cream py-2 pr-8">96px</td>
								<td class="text-tech text-magenta py-2 pr-8">gap-24, p-24, m-24</td>
								<td class="text-cream/50 py-2">2XL</td>
							</tr>
							<tr>
								<td class="text-cream py-2 pr-8">128px</td>
								<td class="text-tech text-magenta py-2 pr-8">gap-32, p-32, m-32</td>
								<td class="text-cream/50 py-2">3XL</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<!-- ═══════════════════════════════════════════════════════════════
			     VERTICAL RHYTHM
			     ═══════════════════════════════════════════════════════════════ -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<p class="text-tech text-cream/70">VERTICAL RHYTHM — Three Layers</p>
				<p class="text-body text-cream/70">Vertical spacing follows a hierarchy. Bigger gaps = bigger conceptual jumps.</p>
			</div>

			<!-- Layer 1: Block Gaps -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<p class="text-tech text-magenta">LAYER 1 — Block Gaps</p>
				<p class="text-small text-cream/50">Space between major page blocks (Hero → Scroll Reveal → CTA)</p>

				<div class="mt-6 border border-cream/20 rounded-lg overflow-hidden">
					<!-- Simulated Block 1 -->
					<div class="bg-magenta/[0.08] p-8 text-center">
						<p class="text-subhead text-cream">Block 1: Hero</p>
						<p class="text-small text-cream/50">100vh full viewport</p>
					</div>

					<!-- Gap indicator -->
					<div class="bg-emerald/[0.15] py-12 flex items-center justify-center border-y border-emerald/30">
						<div class="text-center">
							<p class="text-tech text-emerald">64px gap</p>
							<p class="text-small text-cream/40">py-16 or mb-16</p>
						</div>
					</div>

					<!-- Simulated Block 2 -->
					<div class="bg-magenta/[0.08] p-8 text-center">
						<p class="text-subhead text-cream">Block 2: Scroll Reveal</p>
						<p class="text-small text-cream/50">Memory demo</p>
					</div>

					<!-- Gap indicator -->
					<div class="bg-emerald/[0.15] py-12 flex items-center justify-center border-y border-emerald/30">
						<div class="text-center">
							<p class="text-tech text-emerald">64px gap</p>
							<p class="text-small text-cream/40">py-16 or mb-16</p>
						</div>
					</div>

					<!-- Simulated Block 3 -->
					<div class="bg-magenta/[0.08] p-8 text-center">
						<p class="text-subhead text-cream">Block 3: CTA</p>
						<p class="text-small text-cream/50">Pre-order button</p>
					</div>
				</div>
			</div>

			<!-- Layer 2: Within-Block -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<p class="text-tech text-magenta">LAYER 2 — Within-Block Spacing</p>
				<p class="text-small text-cream/50">Internal structure of a block (header → content → footer)</p>

				<div class="mt-6 border border-cream/20 rounded-lg p-8 space-y-0">
					<!-- Block header -->
					<div class="bg-cream/[0.05] p-6 rounded-t-lg border border-cream/10">
						<p class="text-heading text-cream">Block Header</p>
						<p class="text-body text-cream/70">Headline + supporting text</p>
					</div>

					<!-- Gap indicator -->
					<div class="bg-emerald/[0.1] py-6 flex items-center justify-center">
						<p class="text-tech text-emerald text-sm">32px — space-y-8</p>
					</div>

					<!-- Block content -->
					<div class="bg-cream/[0.05] p-6 border border-cream/10">
						<p class="text-heading text-cream">Block Content</p>
						<p class="text-body text-cream/70">Main content area (cards, images, demos)</p>
					</div>

					<!-- Gap indicator -->
					<div class="bg-emerald/[0.1] py-6 flex items-center justify-center">
						<p class="text-tech text-emerald text-sm">32px — space-y-8</p>
					</div>

					<!-- Block footer -->
					<div class="bg-cream/[0.05] p-6 rounded-b-lg border border-cream/10">
						<p class="text-heading text-cream">Block Footer</p>
						<p class="text-body text-cream/70">CTA or transition element</p>
					</div>
				</div>
			</div>

			<!-- Layer 3: Element Spacing -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<p class="text-tech text-magenta">LAYER 3 — Element Spacing</p>
				<p class="text-small text-cream/50">The micro rhythm within content (headline → subhead → body → button)</p>

				<div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
					<!-- Example: Text stack -->
					<div class="border border-cream/20 rounded-lg p-6">
						<p class="text-small text-cream/50 mb-4">Text Stack</p>
						<div class="space-y-0">
							<h3 class="text-heading text-cream">Headline</h3>
							<div class="h-4 flex items-center"><span class="text-tech text-emerald text-xs">16px</span></div>
							<p class="text-body text-cream/70">Supporting body text that explains the headline in more detail.</p>
							<div class="h-6 flex items-center"><span class="text-tech text-emerald text-xs">24px</span></div>
							<button class="px-6 py-3 bg-magenta text-cream font-satoshi font-medium rounded-lg">
								Call to action
							</button>
						</div>
					</div>

					<!-- Example: Card internals -->
					<div class="border border-cream/20 rounded-lg p-6">
						<p class="text-small text-cream/50 mb-4">Card Internals</p>
						<div class="bg-magenta/[0.08] border border-magenta/30 rounded-lg p-6 space-y-0">
							<p class="text-tech text-magenta">FEATURE LABEL</p>
							<div class="h-2 flex items-center"><span class="text-tech text-emerald text-xs">8px</span></div>
							<h4 class="text-subhead text-cream">Feature Title</h4>
							<div class="h-3 flex items-center"><span class="text-tech text-emerald text-xs">12px</span></div>
							<p class="text-body text-cream/70">Description of this feature and why it matters.</p>
						</div>
					</div>
				</div>

				<!-- Quick Reference -->
				<div class="mt-6 p-6 bg-cream/[0.03] border border-cream/10 rounded-lg">
					<p class="text-tech text-cream/70 mb-4">ELEMENT SPACING QUICK REFERENCE</p>
					<div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-small">
						<div>
							<p class="text-cream font-medium">Label → Title</p>
							<p class="text-tech text-magenta">8px (space-y-2)</p>
						</div>
						<div>
							<p class="text-cream font-medium">Title → Body</p>
							<p class="text-tech text-magenta">16px (space-y-4)</p>
						</div>
						<div>
							<p class="text-cream font-medium">Body → CTA</p>
							<p class="text-tech text-magenta">24px (space-y-6)</p>
						</div>
						<div>
							<p class="text-cream font-medium">Paragraph → Paragraph</p>
							<p class="text-tech text-magenta">16px (space-y-4)</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════════
		     SHIMMERS & GLOWS
		     ═══════════════════════════════════════════════════════════════ -->
		<section class="space-y-8">
			<div class="border-b border-cream/20 pb-4">
				<h2 class="text-display text-cream">Shimmers & Glows</h2>
				<p class="text-small text-cream/50 mt-2">Motion radiates from Sophie</p>
			</div>

			<!-- Philosophy -->
			<div class="space-y-4">
				<p class="text-tech text-cream/70">THE PHILOSOPHY</p>
				<div class="p-6 bg-magenta/[0.08] border border-magenta/30 rounded-lg">
					<p class="text-body text-cream/70">
						Ambient motion isn't random decoration. The glow, the warmth, the aliveness comes from
						<span class="text-magenta font-medium">Sophie-related elements only</span> — her images,
						magenta accents, phone screens. The depth is <em>her</em> depth. She's alive.
					</p>
				</div>
			</div>

			<!-- Glow Effects -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<p class="text-tech text-magenta">GLOWS</p>
				<p class="text-small text-cream/50">Soft colored shadows that radiate warmth. Used on Sophie images and magenta CTAs.</p>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
					<!-- Subtle glow -->
					<div class="text-center space-y-4">
						<div class="w-24 h-24 mx-auto bg-magenta rounded-full shadow-[0_0_30px_rgba(174,13,70,0.3)]"></div>
						<div>
							<p class="text-small text-cream font-medium">Subtle Glow</p>
							<p class="text-tech text-cream/50 text-xs">shadow-[0_0_30px_rgba(174,13,70,0.3)]</p>
							<p class="text-small text-cream/40 mt-1">Default state</p>
						</div>
					</div>

					<!-- Medium glow -->
					<div class="text-center space-y-4">
						<div class="w-24 h-24 mx-auto bg-magenta rounded-full shadow-[0_0_50px_rgba(174,13,70,0.4)]"></div>
						<div>
							<p class="text-small text-cream font-medium">Medium Glow</p>
							<p class="text-tech text-cream/50 text-xs">shadow-[0_0_50px_rgba(174,13,70,0.4)]</p>
							<p class="text-small text-cream/40 mt-1">Hover / Focus</p>
						</div>
					</div>

					<!-- Strong glow -->
					<div class="text-center space-y-4">
						<div class="w-24 h-24 mx-auto bg-magenta rounded-full shadow-[0_0_80px_rgba(174,13,70,0.5)]"></div>
						<div>
							<p class="text-small text-cream font-medium">Strong Glow</p>
							<p class="text-tech text-cream/50 text-xs">shadow-[0_0_80px_rgba(174,13,70,0.5)]</p>
							<p class="text-small text-cream/40 mt-1">Hero emphasis</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Pulse Animation -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<p class="text-tech text-magenta">PULSE</p>
				<p class="text-small text-cream/50">Gentle breathing animation. Almost imperceptible. Sophie is alive.</p>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
					<!-- Glow pulse -->
					<div class="p-8 bg-dark border border-cream/10 rounded-lg flex flex-col items-center gap-4">
						<div class="w-20 h-20 bg-magenta rounded-full animate-pulse shadow-[0_0_40px_rgba(174,13,70,0.4)]"></div>
						<div class="text-center">
							<p class="text-small text-cream font-medium">Glow Pulse</p>
							<p class="text-tech text-cream/50 text-xs">animate-pulse</p>
							<p class="text-small text-cream/40 mt-1">Built-in Tailwind</p>
						</div>
					</div>

					<!-- Custom slow pulse -->
					<div class="p-8 bg-dark border border-cream/10 rounded-lg flex flex-col items-center gap-4">
						<div class="w-20 h-20 bg-magenta rounded-full shadow-[0_0_40px_rgba(174,13,70,0.4)] animate-[pulse_3s_ease-in-out_infinite]"></div>
						<div class="text-center">
							<p class="text-small text-cream font-medium">Slow Pulse</p>
							<p class="text-tech text-cream/50 text-xs">animate-[pulse_3s_ease-in-out_infinite]</p>
							<p class="text-small text-cream/40 mt-1">More subtle, 3s duration</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Shimmer Effect -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<p class="text-tech text-magenta">SHIMMER</p>
				<p class="text-small text-cream/50">Light passing across a surface. Use sparingly — for premium moments.</p>

				<div class="mt-6 p-8 bg-dark border border-cream/10 rounded-lg">
					<div class="relative overflow-hidden w-full max-w-md mx-auto">
						<button class="relative w-full px-8 py-4 bg-magenta text-cream font-satoshi font-medium rounded-lg overflow-hidden">
							<span class="relative z-10">Pre-order now</span>
							<div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
						</button>
					</div>
					<div class="text-center mt-4">
						<p class="text-tech text-cream/50 text-xs">@keyframes shimmer {'{'} 100% {'{'} transform: translateX(100%); {'}'} {'}'}</p>
						<p class="text-small text-cream/40 mt-1">Requires custom keyframe in app.css</p>
					</div>
				</div>
			</div>

			<!-- In Context: Sophie Image -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<p class="text-tech text-magenta">IN CONTEXT — Sophie Image</p>
				<p class="text-small text-cream/50">How glows will wrap Sophie's presence on the product.</p>

				<div class="mt-6 p-12 bg-dark border border-cream/10 rounded-lg flex justify-center">
					<div class="relative">
						<!-- Glow layer -->
						<div class="absolute inset-0 bg-magenta/30 rounded-2xl blur-3xl scale-110"></div>
						<!-- Image placeholder -->
						<div class="relative w-48 h-64 bg-gradient-to-b from-magenta/20 to-magenta/5 border border-magenta/30 rounded-2xl flex items-center justify-center">
							<p class="text-small text-cream/50">Sophie image</p>
						</div>
					</div>
				</div>
				<div class="text-center">
					<p class="text-tech text-cream/50 text-xs">Layered: blur-3xl glow behind, image in front</p>
					<p class="text-small text-cream/40 mt-2 italic">Intensity TBD — will test with actual Sophie images to find the right balance.</p>
				</div>
			</div>

			<!-- GLOW TRIALS — Real Sophie Image -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<div class="flex items-center gap-3">
					<p class="text-tech text-magenta">GLOW TRIALS</p>
					<span class="px-2 py-0.5 text-xs bg-magenta/20 text-magenta rounded">EXPERIMENTING</span>
				</div>
				<p class="text-small text-cream/50">Testing asymmetric glows on actual Sophie image.</p>

				<div class="mt-6 p-12 bg-dark border border-cream/10 rounded-lg flex justify-center">
					<div class="relative">
						<!-- Glow (Option E — Dual Corner Orbs + Slow Pulse) -->
						<div class="absolute -top-8 -right-8 w-48 h-48 bg-magenta/30 rounded-full blur-3xl animate-[pulse_3s_ease-in-out_infinite]"></div>
						<div class="absolute -bottom-12 -left-12 w-64 h-64 bg-magenta/25 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite]"></div>
						<!-- Sophie image -->
						<img src="/images/sophie-restaurant.png" alt="Sophie" class="relative w-80 rounded-2xl" />
					</div>
				</div>
				<div class="text-center">
					<p class="text-tech text-cream/50 text-xs">Small hexagon outline peeking</p>
					<p class="text-small text-cream/40 mt-1">w-24 h-24 at -top-4 -right-4</p>
				</div>
			</div>

			<!-- Quick Reference -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<p class="text-tech text-cream/70">QUICK REFERENCE</p>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div class="p-4 bg-cream/[0.03] border border-cream/10 rounded-lg">
						<p class="text-small text-cream font-medium mb-2">When to use glows</p>
						<ul class="text-small text-cream/50 space-y-1">
							<li>• Sophie images</li>
							<li>• Primary CTAs (magenta buttons)</li>
							<li>• Phone/device screens showing Sophie</li>
							<li>• Hero section focal points</li>
						</ul>
					</div>
					<div class="p-4 bg-cream/[0.03] border border-cream/10 rounded-lg">
						<p class="text-small text-cream font-medium mb-2">When NOT to use glows</p>
						<ul class="text-small text-cream/50 space-y-1">
							<li>• Secondary buttons</li>
							<li>• Body text or cards</li>
							<li>• Navigation elements</li>
							<li>• Founders Club / Pricing (emerald pages)</li>
						</ul>
					</div>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════════
		     BORDERS & SHADOWS
		     ═══════════════════════════════════════════════════════════════ -->
		<section class="space-y-8">
			<div class="border-b border-cream/20 pb-4">
				<h2 class="text-display text-cream">Borders & Shadows</h2>
				<p class="text-small text-cream/50 mt-2">Depth on dark canvas</p>
			</div>

			<!-- Philosophy -->
			<div class="space-y-4">
				<p class="text-tech text-cream/70">THE PHILOSOPHY</p>
				<div class="p-6 bg-cream/[0.03] border border-cream/10 rounded-lg">
					<p class="text-body text-cream/70">
						On dark backgrounds, traditional drop shadows disappear — you can't see dark on dark.
						Instead, we create depth through <span class="text-cream font-medium">borders at varying opacities</span>
						and <span class="text-magenta font-medium">colored glows</span> (see Shimmers & Glows).
					</p>
				</div>
			</div>

			<!-- Border Opacity Scale -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<p class="text-tech text-magenta">BORDER OPACITY SCALE</p>
				<p class="text-small text-cream/50">Higher opacity = more visual weight = more important separation.</p>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
					<!-- 10% -->
					<div class="p-6 border border-cream/10 rounded-lg">
						<div class="flex justify-between items-start mb-3">
							<div>
								<p class="text-small text-cream font-medium">10% Opacity</p>
								<p class="text-tech text-magenta text-xs">border-cream/10</p>
							</div>
							<span class="text-small text-cream/40">Subtle</span>
						</div>
						<p class="text-small text-cream/50">Card containers, subsection dividers, quiet boundaries. Barely there.</p>
					</div>

					<!-- 20% -->
					<div class="p-6 border border-cream/20 rounded-lg">
						<div class="flex justify-between items-start mb-3">
							<div>
								<p class="text-small text-cream font-medium">20% Opacity</p>
								<p class="text-tech text-magenta text-xs">border-cream/20</p>
							</div>
							<span class="text-small text-cream/40">Standard</span>
						</div>
						<p class="text-small text-cream/50">Section dividers, header separators, default border weight.</p>
					</div>

					<!-- 30% -->
					<div class="p-6 border border-cream/30 rounded-lg">
						<div class="flex justify-between items-start mb-3">
							<div>
								<p class="text-small text-cream font-medium">30% Opacity</p>
								<p class="text-tech text-magenta text-xs">border-cream/30</p>
							</div>
							<span class="text-small text-cream/40">Emphasis</span>
						</div>
						<p class="text-small text-cream/50">Interactive elements, hover states, important containers.</p>
					</div>

					<!-- 50% -->
					<div class="p-6 border border-cream/50 rounded-lg">
						<div class="flex justify-between items-start mb-3">
							<div>
								<p class="text-small text-cream font-medium">50% Opacity</p>
								<p class="text-tech text-magenta text-xs">border-cream/50</p>
							</div>
							<span class="text-small text-cream/40">Strong</span>
						</div>
						<p class="text-small text-cream/50">Ghost buttons, high-contrast outlines, focal elements.</p>
					</div>
				</div>
			</div>

			<!-- The 8-30 Box -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<div class="flex items-center gap-3">
					<p class="text-tech text-magenta">THE 8-30 BOX</p>
					<span class="px-2 py-0.5 text-xs bg-emerald/20 text-emerald rounded">NAMED PATTERN</span>
				</div>
				<p class="text-small text-cream/50">Our signature surface treatment: 8% fill + 30% border. Creates depth without weight.</p>

				<div class="p-6 bg-cream/[0.03] border border-cream/10 rounded-lg mt-4">
					<p class="text-body text-cream/70 mb-4">
						When you say <span class="text-cream font-medium">"make it an 8-30 box"</span>, this is what it means:
					</p>
					<p class="text-tech text-magenta">bg-{'{'}color{'}'}/[0.08] + border-{'{'}color{'}'}/30</p>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
					<!-- Sophie -->
					<div class="p-6 bg-magenta/[0.08] border border-magenta/30 rounded-lg">
						<p class="text-small text-magenta font-medium mb-1">Sophie 8-30</p>
						<p class="text-tech text-cream/50 text-xs">bg-magenta/[0.08]</p>
						<p class="text-tech text-cream/50 text-xs">border-magenta/30</p>
						<p class="text-small text-cream/40 mt-3">Home page, Sophie content</p>
					</div>

					<!-- Business -->
					<div class="p-6 bg-emerald/[0.08] border border-emerald/30 rounded-lg">
						<p class="text-small text-emerald font-medium mb-1">Business 8-30</p>
						<p class="text-tech text-cream/50 text-xs">bg-emerald/[0.08]</p>
						<p class="text-tech text-cream/50 text-xs">border-emerald/30</p>
						<p class="text-small text-cream/40 mt-3">FC, Pricing pages</p>
					</div>

					<!-- Neutral -->
					<div class="p-6 bg-cream/[0.03] border border-cream/10 rounded-lg">
						<p class="text-small text-cream font-medium mb-1">Neutral 8-30</p>
						<p class="text-tech text-cream/50 text-xs">bg-cream/[0.03]</p>
						<p class="text-tech text-cream/50 text-xs">border-cream/10</p>
						<p class="text-small text-cream/40 mt-3">Scaled down for cream</p>
					</div>
				</div>
			</div>

			<!-- Border Radius -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<p class="text-tech text-magenta">BORDER RADIUS</p>
				<p class="text-small text-cream/50">Consistent rounding creates cohesion.</p>

				<div class="flex flex-wrap items-end gap-8 mt-6">
					<!-- rounded-lg -->
					<div class="text-center">
						<div class="w-24 h-24 bg-cream/10 border border-cream/20 rounded-lg"></div>
						<p class="text-small text-cream font-medium mt-3">rounded-lg</p>
						<p class="text-tech text-cream/50 text-xs">8px — Default</p>
					</div>

					<!-- rounded-xl -->
					<div class="text-center">
						<div class="w-24 h-24 bg-cream/10 border border-cream/20 rounded-xl"></div>
						<p class="text-small text-cream font-medium mt-3">rounded-xl</p>
						<p class="text-tech text-cream/50 text-xs">12px — Cards</p>
					</div>

					<!-- rounded-2xl -->
					<div class="text-center">
						<div class="w-24 h-24 bg-cream/10 border border-cream/20 rounded-2xl"></div>
						<p class="text-small text-cream font-medium mt-3">rounded-2xl</p>
						<p class="text-tech text-cream/50 text-xs">16px — Images</p>
					</div>

					<!-- rounded-full -->
					<div class="text-center">
						<div class="w-24 h-24 bg-cream/10 border border-cream/20 rounded-full"></div>
						<p class="text-small text-cream font-medium mt-3">rounded-full</p>
						<p class="text-tech text-cream/50 text-xs">50% — Avatars</p>
					</div>
				</div>
			</div>

			<!-- Shadows (or lack thereof) -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<p class="text-tech text-magenta">SHADOWS</p>
				<p class="text-small text-cream/50">Traditional shadows don't work on dark UI. Here's what we use instead.</p>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
					<!-- Traditional shadow (doesn't work) -->
					<div class="text-center space-y-3">
						<div class="p-6 bg-dark border border-cream/10 rounded-lg shadow-xl">
							<p class="text-small text-cream">shadow-xl</p>
						</div>
						<p class="text-small text-cream/40">Traditional — invisible on dark</p>
					</div>

					<!-- Border depth -->
					<div class="text-center space-y-3">
						<div class="p-6 bg-cream/[0.03] border border-cream/20 rounded-lg">
							<p class="text-small text-cream">border + fill</p>
						</div>
						<p class="text-small text-cream/40">Our approach — subtle lift</p>
					</div>

					<!-- Glow depth -->
					<div class="text-center space-y-3">
						<div class="p-6 bg-magenta/[0.08] border border-magenta/30 rounded-lg shadow-[0_0_30px_rgba(174,13,70,0.2)]">
							<p class="text-small text-cream">glow + border</p>
						</div>
						<p class="text-small text-cream/40">Sophie elements — alive</p>
					</div>
				</div>
			</div>

			<!-- Quick Reference -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<p class="text-tech text-cream/70">QUICK REFERENCE</p>
				<div class="overflow-x-auto">
					<table class="w-full text-left">
						<thead>
							<tr class="border-b border-cream/20">
								<th class="text-small text-cream/50 pb-2 pr-8">Element</th>
								<th class="text-small text-cream/50 pb-2 pr-8">Border</th>
								<th class="text-small text-cream/50 pb-2 pr-8">Radius</th>
								<th class="text-small text-cream/50 pb-2">Fill</th>
							</tr>
						</thead>
						<tbody class="text-small">
							<tr class="border-b border-cream/10">
								<td class="text-cream py-2 pr-8">Card container</td>
								<td class="text-tech text-magenta py-2 pr-8">cream/10</td>
								<td class="text-tech text-magenta py-2 pr-8">rounded-lg</td>
								<td class="text-cream/50 py-2">none or cream/[0.03]</td>
							</tr>
							<tr class="border-b border-cream/10">
								<td class="text-cream py-2 pr-8">Section divider</td>
								<td class="text-tech text-magenta py-2 pr-8">cream/20</td>
								<td class="text-tech text-magenta py-2 pr-8">—</td>
								<td class="text-cream/50 py-2">—</td>
							</tr>
							<tr class="border-b border-cream/10">
								<td class="text-cream py-2 pr-8">Feature card (Sophie)</td>
								<td class="text-tech text-magenta py-2 pr-8">magenta/30</td>
								<td class="text-tech text-magenta py-2 pr-8">rounded-lg</td>
								<td class="text-cream/50 py-2">magenta/[0.08]</td>
							</tr>
							<tr class="border-b border-cream/10">
								<td class="text-cream py-2 pr-8">Feature card (Business)</td>
								<td class="text-tech text-magenta py-2 pr-8">emerald/30</td>
								<td class="text-tech text-magenta py-2 pr-8">rounded-lg</td>
								<td class="text-cream/50 py-2">emerald/[0.08]</td>
							</tr>
							<tr class="border-b border-cream/10">
								<td class="text-cream py-2 pr-8">Ghost button</td>
								<td class="text-tech text-magenta py-2 pr-8">cream/50</td>
								<td class="text-tech text-magenta py-2 pr-8">rounded-lg</td>
								<td class="text-cream/50 py-2">none</td>
							</tr>
							<tr>
								<td class="text-cream py-2 pr-8">Sophie image</td>
								<td class="text-tech text-magenta py-2 pr-8">magenta/30</td>
								<td class="text-tech text-magenta py-2 pr-8">rounded-2xl</td>
								<td class="text-cream/50 py-2">+ blur glow behind</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════════
		     LOGOS
		     ═══════════════════════════════════════════════════════════════ -->
		<section class="space-y-8">
			<div class="border-b border-cream/20 pb-4">
				<h2 class="text-display text-cream">Logos</h2>
				<p class="text-small text-cream/50 mt-2">Brand marks and usage</p>
			</div>

			<!-- Primary Wordmark -->
			<div class="space-y-4">
				<p class="text-tech text-magenta">PRIMARY WORDMARK</p>
				<p class="text-small text-cream/50">The Honeybloom logotype. Bonheur Royale script, cream on dark.</p>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
					<!-- On dark -->
					<div class="p-8 bg-dark border border-cream/20 rounded-lg flex flex-col items-center gap-4">
						<img src="/images/brand-logo.png" alt="Honeybloom" class="h-16" />
						<div class="text-center">
							<p class="text-small text-cream font-medium">On Dark</p>
							<p class="text-tech text-cream/50 text-xs">Primary usage</p>
						</div>
					</div>

					<!-- On magenta -->
					<div class="p-8 bg-magenta rounded-lg flex flex-col items-center gap-4">
						<img src="/images/brand-logo.png" alt="Honeybloom" class="h-16" />
						<div class="text-center">
							<p class="text-small text-cream font-medium">On Magenta</p>
							<p class="text-tech text-cream/50 text-xs">Hero overlay</p>
						</div>
					</div>
				</div>

				<!-- Specs -->
				<div class="p-6 bg-cream/[0.03] border border-cream/10 rounded-lg mt-4">
					<p class="text-tech text-cream/70 mb-3">SPECIFICATIONS</p>
					<div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-small">
						<div>
							<p class="text-cream font-medium">Font</p>
							<p class="text-cream/50">Bonheur Royale</p>
						</div>
						<div>
							<p class="text-cream font-medium">Color</p>
							<p class="text-cream/50">#F5F0E6 (cream)</p>
						</div>
						<div>
							<p class="text-cream font-medium">Min Height</p>
							<p class="text-cream/50">32px</p>
						</div>
						<div>
							<p class="text-cream font-medium">Clear Space</p>
							<p class="text-cream/50">1x cap height</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Founders Club Badge -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<p class="text-tech text-emerald">FOUNDERS CLUB BADGE</p>
				<p class="text-small text-cream/50">Photorealistic metal badge for Founders Club page and member recognition.</p>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
					<!-- Badge display -->
					<div class="p-8 bg-dark border border-cream/20 rounded-lg flex flex-col items-center gap-4">
						<img src="/images/brand-founders-badge.jpg" alt="Founders Club Badge" class="w-48 h-48 object-contain" />
						<div class="text-center">
							<p class="text-small text-cream font-medium">Full Badge</p>
							<p class="text-tech text-cream/50 text-xs">FC Hero, profile display</p>
						</div>
					</div>

					<!-- Context preview -->
					<div class="p-8 bg-dark border border-emerald/30 rounded-lg flex flex-col items-center gap-4">
						<div class="flex items-center gap-4">
							<img src="/images/brand-founders-badge.jpg" alt="Founders Club Badge" class="w-12 h-12 object-contain" />
							<div>
								<p class="text-subhead text-cream">Welcome, Founder</p>
								<p class="text-small text-cream/50">Member since Jan 2026</p>
							</div>
						</div>
						<div class="text-center mt-4">
							<p class="text-small text-cream font-medium">Inline Usage</p>
							<p class="text-tech text-cream/50 text-xs">Profile headers, welcome screens</p>
						</div>
					</div>
				</div>

				<!-- Badge specs -->
				<div class="p-6 bg-emerald/[0.08] border border-emerald/30 rounded-lg mt-4">
					<p class="text-tech text-emerald mb-3">BADGE SPECIFICATIONS</p>
					<div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-small">
						<div>
							<p class="text-cream font-medium">Style</p>
							<p class="text-cream/50">Photorealistic metal</p>
						</div>
						<div>
							<p class="text-cream font-medium">Colors</p>
							<p class="text-cream/50">Emerald + Gold</p>
						</div>
						<div>
							<p class="text-cream font-medium">Hero Size</p>
							<p class="text-cream/50">192–256px</p>
						</div>
						<div>
							<p class="text-cream font-medium">Inline Size</p>
							<p class="text-cream/50">48–64px</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════════
		     AETHER DIVIDER (TBD)
		     ═══════════════════════════════════════════════════════════════ -->
		<section class="space-y-8 opacity-50">
			<div class="border-b border-cream/20 pb-4">
				<h2 class="text-display text-cream">Aether Divider</h2>
				<p class="text-small text-cream/50 mt-2">Pending</p>
			</div>
			<p class="text-body text-cream/50">To be defined...</p>
		</section>

		<!-- ═══════════════════════════════════════════════════════════════
		     BLOCK LAYOUTS — Bento Vocabulary
		     ═══════════════════════════════════════════════════════════════ -->
		<section class="space-y-8">
			<div class="border-b border-cream/20 pb-4">
				<h2 class="text-display text-cream">Block Layouts</h2>
				<p class="text-small text-cream/50 mt-2">Bento vocabulary for page rhythm</p>
			</div>

			<!-- Philosophy -->
			<div class="space-y-4">
				<p class="text-tech text-cream/70">THE PHILOSOPHY</p>
				<div class="p-6 bg-magenta/[0.08] border border-magenta/30 rounded-lg">
					<p class="text-body text-cream/70">
						Every section on the page is a "block." Varying block layouts creates rhythm and prevents
						the <span class="text-cream font-medium">laundry-list feeling</span>. Each benefit should have
						its own visual weight and moment — not be item #4 in a bulleted list.
					</p>
				</div>
				<div class="p-4 bg-emerald/[0.08] border border-emerald/30 rounded-lg">
					<p class="text-tech text-emerald">RULE: No two adjacent blocks should use the same layout.</p>
				</div>
			</div>

			<!-- Block Heights -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<div class="flex items-center gap-3">
					<p class="text-tech text-magenta">BLOCK HEIGHTS</p>
					<span class="px-2 py-0.5 text-xs bg-emerald/20 text-emerald rounded">IMPORTANT</span>
				</div>
				<p class="text-small text-cream/50">The Hero owns the viewport. Everything else is sized by content.</p>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
					<!-- Hero exception -->
					<div class="p-6 bg-magenta/[0.08] border border-magenta/30 rounded-lg">
						<p class="text-tech text-magenta mb-2">HERO</p>
						<p class="text-heading text-cream mb-2">100vh</p>
						<p class="text-small text-cream/50">The exception. One statement, one moment. User sees nothing else until they scroll.</p>
					</div>

					<!-- Everything else -->
					<div class="p-6 bg-cream/[0.03] border border-cream/10 rounded-lg">
						<p class="text-tech text-cream/70 mb-2">EVERYTHING ELSE</p>
						<p class="text-heading text-cream mb-2">Content + Padding</p>
						<p class="text-small text-cream/50">Height emerges from content. Padding provides breathing room (py-24 to py-32).</p>
					</div>
				</div>

				<div class="p-6 bg-cream/[0.03] border border-cream/10 rounded-lg mt-4">
					<p class="text-small text-cream font-medium mb-3">Why NOT 100vh for every block?</p>
					<ul class="text-small text-cream/50 space-y-2">
						<li><span class="text-cream">Content mismatch</span> — A Stats Bar needs 200px. A Split needs 600px. Forcing both to 100vh creates emptiness or cramping.</li>
						<li><span class="text-cream">Monotonous pacing</span> — Every scroll = exactly one block. Mechanical, predictable.</li>
						<li><span class="text-cream">Device variance</span> — 100vh on a phone ≠ 100vh on a monitor. Content-driven sizing adapts.</li>
						<li><span class="text-cream">Natural breathing</span> — Some ideas are quick, some need space. Let content dictate.</li>
					</ul>
				</div>

				<p class="text-small text-cream/40 mt-2 italic">The variety in block heights is part of the rhythm, just like variety in layouts.</p>
			</div>

			<!-- Layout 1: Hero -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<div class="flex items-center gap-3">
					<p class="text-tech text-magenta">1. HERO</p>
					<span class="px-2 py-0.5 text-xs bg-cream/10 text-cream/50 rounded">One per page</span>
				</div>
				<p class="text-small text-cream/50">The opening statement. Full viewport height (100vh). Sets the tone.</p>

				<div class="mt-4 border border-cream/20 rounded-lg overflow-hidden">
					<div class="h-48 bg-magenta/[0.08] flex items-center justify-center">
						<div class="text-center space-y-2">
							<p class="text-heading text-cream">Hero Block</p>
							<p class="text-small text-cream/50">100vh · First impression</p>
						</div>
					</div>
				</div>

				<div class="grid grid-cols-2 gap-4 mt-4">
					<div class="p-4 bg-cream/[0.03] border border-cream/10 rounded-lg">
						<p class="text-small text-cream font-medium">Phone</p>
						<p class="text-small text-cream/50">Stacked: headline → visual → CTA</p>
					</div>
					<div class="p-4 bg-cream/[0.03] border border-cream/10 rounded-lg">
						<p class="text-small text-cream font-medium">Desktop</p>
						<p class="text-small text-cream/50">Split or centered with visual</p>
					</div>
				</div>
			</div>

			<!-- Layout 2: Split -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<div class="flex items-center gap-3">
					<p class="text-tech text-magenta">2. SPLIT</p>
					<span class="px-2 py-0.5 text-xs bg-cream/10 text-cream/50 rounded">Workhorse</span>
				</div>
				<p class="text-small text-cream/50">Two columns: text + visual. The workhorse for feature deep-dives.</p>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
					<!-- Text left -->
					<div class="border border-cream/20 rounded-lg overflow-hidden">
						<p class="text-small text-cream/50 px-4 py-2 bg-cream/[0.03] border-b border-cream/10">Text Left / Visual Right</p>
						<div class="grid grid-cols-2 h-32">
							<div class="bg-cream/[0.05] flex items-center justify-center border-r border-cream/10">
								<p class="text-small text-cream/50">Text</p>
							</div>
							<div class="bg-magenta/[0.08] flex items-center justify-center">
								<p class="text-small text-magenta/70">Visual</p>
							</div>
						</div>
					</div>

					<!-- Visual left (flipped) -->
					<div class="border border-cream/20 rounded-lg overflow-hidden">
						<p class="text-small text-cream/50 px-4 py-2 bg-cream/[0.03] border-b border-cream/10">Visual Left / Text Right (Flipped)</p>
						<div class="grid grid-cols-2 h-32">
							<div class="bg-magenta/[0.08] flex items-center justify-center border-r border-cream/10">
								<p class="text-small text-magenta/70">Visual</p>
							</div>
							<div class="bg-cream/[0.05] flex items-center justify-center">
								<p class="text-small text-cream/50">Text</p>
							</div>
						</div>
					</div>
				</div>

				<div class="p-4 bg-emerald/[0.08] border border-emerald/30 rounded-lg mt-4">
					<p class="text-small text-emerald"><span class="font-medium">Rhythm tip:</span> Alternate sides. If Block A is text-left, Block B should be text-right.</p>
				</div>

				<p class="text-small text-cream/40 mt-2">Use for: Memory (Artisan Cut™), visual consistency, emotional awareness — features that need room to breathe.</p>
			</div>

			<!-- Layout 3: Feature Row -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<div class="flex items-center gap-3">
					<p class="text-tech text-magenta">3. FEATURE ROW</p>
					<span class="px-2 py-0.5 text-xs bg-cream/10 text-cream/50 rounded">Quick hits</span>
				</div>
				<p class="text-small text-cream/50">Horizontal row of 3-5 equal cards. Scannable at a glance.</p>

				<div class="border border-cream/20 rounded-lg overflow-hidden mt-4">
					<p class="text-small text-cream/50 px-4 py-2 bg-cream/[0.03] border-b border-cream/10">Desktop: 3-5 columns</p>
					<div class="grid grid-cols-4 gap-4 p-4">
						<div class="bg-cream/[0.05] border border-cream/10 rounded-lg p-4 text-center">
							<div class="w-8 h-8 mx-auto mb-2 bg-magenta/20 rounded-full"></div>
							<p class="text-small text-cream">Privacy</p>
						</div>
						<div class="bg-cream/[0.05] border border-cream/10 rounded-lg p-4 text-center">
							<div class="w-8 h-8 mx-auto mb-2 bg-magenta/20 rounded-full"></div>
							<p class="text-small text-cream">NSFW</p>
						</div>
						<div class="bg-cream/[0.05] border border-cream/10 rounded-lg p-4 text-center">
							<div class="w-8 h-8 mx-auto mb-2 bg-magenta/20 rounded-full"></div>
							<p class="text-small text-cream">No Judgment</p>
						</div>
						<div class="bg-cream/[0.05] border border-cream/10 rounded-lg p-4 text-center">
							<div class="w-8 h-8 mx-auto mb-2 bg-magenta/20 rounded-full"></div>
							<p class="text-small text-cream">Customize</p>
						</div>
					</div>
				</div>

				<p class="text-small text-cream/40">Card anatomy: Icon + Title + One-liner (no paragraphs)</p>
				<div class="p-4 bg-cream/[0.03] border border-cream/10 rounded-lg">
					<p class="text-small text-cream/50"><span class="text-cream font-medium">Caution:</span> Don't stack two Feature Rows. They blur together.</p>
				</div>
			</div>

			<!-- Layout 4: Spotlight -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<div class="flex items-center gap-3">
					<p class="text-tech text-magenta">4. SPOTLIGHT</p>
					<span class="px-2 py-0.5 text-xs bg-cream/10 text-cream/50 rounded">Pause moment</span>
				</div>
				<p class="text-small text-cream/50">Single element, centered, with breathing room. A moment of pause.</p>

				<div class="border border-cream/20 rounded-lg overflow-hidden mt-4">
					<div class="py-16 px-8 flex justify-center">
						<div class="max-w-md p-8 bg-emerald/[0.08] border border-emerald/30 rounded-lg text-center">
							<p class="text-tech text-emerald mb-2">★ FOUNDING MEMBER</p>
							<p class="text-heading text-cream mb-2">Early access spots limited</p>
							<p class="text-small text-cream/50 mb-4">Be among the first to meet Sophie.</p>
							<button class="px-6 py-3 bg-emerald text-dark font-satoshi font-medium rounded-lg">
								Join Founders Club
							</button>
						</div>
					</div>
				</div>

				<p class="text-small text-cream/40">Use for: CTA blocks, urgency moments, "one more thing" reveals. Founding member offer, gift store teaser.</p>
			</div>

			<!-- Layout 5: Stats Bar -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<div class="flex items-center gap-3">
					<p class="text-tech text-magenta">5. STATS BAR</p>
					<span class="px-2 py-0.5 text-xs bg-cream/10 text-cream/50 rounded">Social proof</span>
				</div>
				<p class="text-small text-cream/50">Horizontal row of big numbers or short facts. Credibility at a glance.</p>

				<div class="border border-cream/20 rounded-lg overflow-hidden mt-4 p-8">
					<div class="flex justify-center items-center gap-8 divide-x divide-cream/20">
						<div class="text-center px-8">
							<p class="text-display text-emerald">500</p>
							<p class="text-small text-cream/50">Founding spots</p>
						</div>
						<div class="text-center px-8">
							<p class="text-display text-cream">Lifetime</p>
							<p class="text-small text-cream/50">Priority access</p>
						</div>
						<div class="text-center px-8">
							<p class="text-display text-cream">Free</p>
							<p class="text-small text-cream/50">To join waitlist</p>
						</div>
					</div>
				</div>

				<p class="text-small text-cream/40">Structure: 3-4 items, evenly spaced. Large number/word + small label below. Often separated by subtle vertical dividers.</p>
			</div>

			<!-- Layout 6: Bento Grid -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<div class="flex items-center gap-3">
					<p class="text-tech text-magenta">6. BENTO GRID</p>
					<span class="px-2 py-0.5 text-xs bg-cream/10 text-cream/50 rounded">High complexity</span>
				</div>
				<p class="text-small text-cream/50">Asymmetric grid with mixed cell sizes. Visual feast, magazine-like.</p>

				<div class="border border-cream/20 rounded-lg overflow-hidden mt-4 p-4">
					<div class="grid grid-cols-4 grid-rows-2 gap-4 h-64">
						<div class="col-span-2 row-span-2 bg-magenta/[0.08] border border-magenta/30 rounded-lg flex items-center justify-center">
							<p class="text-small text-magenta/70">Large feature</p>
						</div>
						<div class="bg-cream/[0.05] border border-cream/10 rounded-lg flex items-center justify-center">
							<p class="text-small text-cream/50">Stat</p>
						</div>
						<div class="bg-emerald/[0.08] border border-emerald/30 rounded-lg flex items-center justify-center">
							<p class="text-small text-emerald/70">Image</p>
						</div>
						<div class="col-span-2 bg-cream/[0.05] border border-cream/10 rounded-lg flex items-center justify-center">
							<p class="text-small text-cream/50">Quote or text block</p>
						</div>
					</div>
				</div>

				<div class="p-4 bg-cream/[0.03] border border-cream/10 rounded-lg">
					<p class="text-small text-cream/50"><span class="text-cream font-medium">Caution:</span> High complexity. Use sparingly — once per page max. Needs careful responsive handling.</p>
				</div>
			</div>

			<!-- Layout 7: Testimonial -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<div class="flex items-center gap-3">
					<p class="text-tech text-magenta">7. TESTIMONIAL</p>
					<span class="px-2 py-0.5 text-xs bg-cream/10 text-cream/50 rounded">Emotional proof</span>
				</div>
				<p class="text-small text-cream/50">Quote-focused block. Can be single or carousel.</p>

				<div class="border border-cream/20 rounded-lg overflow-hidden mt-4 p-8">
					<div class="max-w-2xl mx-auto text-center">
						<p class="text-display text-cream/90 italic mb-6">"She remembered my dog's name from three months ago. I actually teared up."</p>
						<div class="flex items-center justify-center gap-3">
							<div class="w-10 h-10 bg-magenta/20 rounded-full"></div>
							<div class="text-left">
								<p class="text-small text-cream font-medium">Anonymous user</p>
								<p class="text-small text-cream/50">Reddit r/replika</p>
							</div>
						</div>
					</div>
				</div>

				<p class="text-small text-cream/40">Structure: Large quote text (text-display or text-heading) + Attribution below (name, context) + Optional avatar.</p>
			</div>

			<!-- Sequencing -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<p class="text-tech text-emerald">SEQUENCING — Creating Rhythm</p>
				<p class="text-small text-cream/50">The eye needs variety. Each scroll should reveal a new shape.</p>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
					<div class="p-6 bg-cream/[0.03] border border-cream/10 rounded-lg">
						<p class="text-small text-cream font-medium mb-3">❌ Bad Sequences</p>
						<div class="space-y-2 text-small text-cream/50">
							<p>Feature Row → Feature Row → Feature Row</p>
							<p>Split → Split → Split</p>
							<p class="text-cream/30 italic">(Monotonous, predictable)</p>
						</div>
					</div>

					<div class="p-6 bg-emerald/[0.08] border border-emerald/30 rounded-lg">
						<p class="text-small text-emerald font-medium mb-3">✓ Good Sequences</p>
						<div class="space-y-2 text-small text-cream/70">
							<p>Hero → Split → Feature Row → Split (flipped) → Spotlight</p>
							<p>Hero → Bento → Split → Stats Bar → CTA Spotlight</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Mobile Behavior -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<p class="text-tech text-cream/70">MOBILE BEHAVIOR</p>
				<p class="text-small text-cream/50">All layouts collapse gracefully on mobile.</p>

				<div class="overflow-x-auto mt-4">
					<table class="w-full text-left">
						<thead>
							<tr class="border-b border-cream/20">
								<th class="text-small text-cream/50 pb-2 pr-8">Layout</th>
								<th class="text-small text-cream/50 pb-2">Mobile Behavior</th>
							</tr>
						</thead>
						<tbody class="text-small">
							<tr class="border-b border-cream/10">
								<td class="text-cream py-2 pr-8">Split</td>
								<td class="text-cream/50 py-2">Stacks vertically</td>
							</tr>
							<tr class="border-b border-cream/10">
								<td class="text-cream py-2 pr-8">Feature Row</td>
								<td class="text-cream/50 py-2">Single column</td>
							</tr>
							<tr class="border-b border-cream/10">
								<td class="text-cream py-2 pr-8">Bento Grid</td>
								<td class="text-cream/50 py-2">Simplified grid or stack</td>
							</tr>
							<tr>
								<td class="text-cream py-2 pr-8">Stats Bar</td>
								<td class="text-cream/50 py-2">2x2 grid or stack</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════════
		     BREAKPOINTS (TBD)
		     ═══════════════════════════════════════════════════════════════ -->
		<section class="space-y-8 opacity-50">
			<div class="border-b border-cream/20 pb-4">
				<h2 class="text-display text-cream">Breakpoints</h2>
				<p class="text-small text-cream/50 mt-2">Pending</p>
			</div>
			<p class="text-body text-cream/50">To be defined...</p>
		</section>

		<!-- ═══════════════════════════════════════════════════════════════
		     MOTION
		     ═══════════════════════════════════════════════════════════════ -->
		<section class="space-y-8">
			<div class="border-b border-cream/20 pb-4">
				<h2 class="text-display text-cream">Motion</h2>
				<p class="text-small text-cream/50 mt-2">Where the page comes alive</p>
			</div>

			<!-- Philosophy -->
			<div class="space-y-4">
				<p class="text-tech text-cream/70">THE PHILOSOPHY</p>
				<div class="p-6 bg-magenta/[0.08] border border-magenta/30 rounded-lg">
					<p class="text-body text-cream/70">
						<span class="text-magenta font-medium">"Motion radiates from Sophie."</span><br/><br/>
						Not everything moves. Animation is reserved for Sophie-related elements (her images, magenta accents,
						the phone showing her), CTAs that need attention, and purposeful content reveals.
						The rest stays grounded — nav, body text, neutral cards, business/emerald sections.
					</p>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
					<div class="p-4 bg-emerald/[0.08] border border-emerald/30 rounded-lg">
						<p class="text-small text-emerald font-medium mb-2">✓ Animate</p>
						<ul class="text-small text-cream/50 space-y-1">
							<li>• Sophie images & glow</li>
							<li>• Primary CTAs (magenta)</li>
							<li>• Phone mockups</li>
							<li>• Content reveals on scroll</li>
						</ul>
					</div>
					<div class="p-4 bg-cream/[0.03] border border-cream/10 rounded-lg">
						<p class="text-small text-cream/50 font-medium mb-2">✗ Keep Static</p>
						<ul class="text-small text-cream/40 space-y-1">
							<li>• Navigation</li>
							<li>• Body text</li>
							<li>• Neutral/info cards</li>
							<li>• Emerald/business sections</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Transition Defaults -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<div class="flex items-center gap-3">
					<p class="text-tech text-magenta">TRANSITION DEFAULTS</p>
					<span class="px-2 py-0.5 text-xs bg-emerald/20 text-emerald rounded">FOUNDATION</span>
				</div>
				<p class="text-small text-cream/50">Every interactive element needs smooth state changes. These are our defaults.</p>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
					<!-- Duration -->
					<div class="p-6 bg-cream/[0.03] border border-cream/10 rounded-lg">
						<p class="text-small text-cream font-medium mb-3">Duration</p>
						<div class="space-y-2">
							<div class="flex justify-between text-small">
								<span class="text-cream/50">Micro (hover color)</span>
								<span class="text-tech text-magenta">150ms</span>
							</div>
							<div class="flex justify-between text-small">
								<span class="text-cream/50">Default (most things)</span>
								<span class="text-tech text-magenta">300ms</span>
							</div>
							<div class="flex justify-between text-small">
								<span class="text-cream/50">Emphasis (transforms)</span>
								<span class="text-tech text-magenta">500ms</span>
							</div>
							<div class="flex justify-between text-small">
								<span class="text-cream/50">Dramatic (page transitions)</span>
								<span class="text-tech text-magenta">700ms</span>
							</div>
						</div>
					</div>

					<!-- Easing -->
					<div class="p-6 bg-cream/[0.03] border border-cream/10 rounded-lg">
						<p class="text-small text-cream font-medium mb-3">Easing</p>
						<div class="space-y-2">
							<div class="flex justify-between text-small">
								<span class="text-cream/50">Default</span>
								<span class="text-tech text-magenta">ease-out</span>
							</div>
							<div class="flex justify-between text-small">
								<span class="text-cream/50">Enter animations</span>
								<span class="text-tech text-magenta">ease-out</span>
							</div>
							<div class="flex justify-between text-small">
								<span class="text-cream/50">Exit animations</span>
								<span class="text-tech text-magenta">ease-in</span>
							</div>
							<div class="flex justify-between text-small">
								<span class="text-cream/50">Continuous loops</span>
								<span class="text-tech text-magenta">ease-in-out</span>
							</div>
						</div>
					</div>

					<!-- The Standard -->
					<div class="p-6 bg-magenta/[0.08] border border-magenta/30 rounded-lg">
						<p class="text-small text-magenta font-medium mb-3">The Standard</p>
						<p class="text-tech text-cream mb-2">transition-all duration-300 ease-out</p>
						<p class="text-small text-cream/50">Use this for most interactive elements. Fast enough to feel responsive, slow enough to be noticed.</p>
					</div>
				</div>

				<!-- Live examples -->
				<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
					<div class="text-center">
						<button class="w-full px-4 py-3 bg-cream/10 border border-cream/20 rounded-lg transition-all duration-150 ease-out hover:bg-cream/20 hover:border-cream/30">
							150ms
						</button>
						<p class="text-small text-cream/40 mt-2">Micro</p>
					</div>
					<div class="text-center">
						<button class="w-full px-4 py-3 bg-cream/10 border border-cream/20 rounded-lg transition-all duration-300 ease-out hover:bg-cream/20 hover:border-cream/30">
							300ms
						</button>
						<p class="text-small text-cream/40 mt-2">Default</p>
					</div>
					<div class="text-center">
						<button class="w-full px-4 py-3 bg-cream/10 border border-cream/20 rounded-lg transition-all duration-500 ease-out hover:bg-cream/20 hover:border-cream/30">
							500ms
						</button>
						<p class="text-small text-cream/40 mt-2">Emphasis</p>
					</div>
					<div class="text-center">
						<button class="w-full px-4 py-3 bg-cream/10 border border-cream/20 rounded-lg transition-all duration-700 ease-out hover:bg-cream/20 hover:border-cream/30">
							700ms
						</button>
						<p class="text-small text-cream/40 mt-2">Dramatic</p>
					</div>
				</div>
			</div>

			<!-- Hover States -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<p class="text-tech text-magenta">HOVER STATES</p>
				<p class="text-small text-cream/50">How interactive elements respond to attention.</p>

				<!-- CTA with Shimmer: Hover Takes Over -->
				<div class="p-6 bg-magenta/[0.08] border border-magenta/30 rounded-lg mb-6">
					<div class="flex items-center gap-2 mb-3">
						<p class="text-small text-magenta font-medium">CTA with Shimmer</p>
						<span class="px-2 py-0.5 text-xs bg-emerald/20 text-emerald rounded">DECISION</span>
					</div>
					<p class="text-small text-cream/50 mb-4">Shimmer catches the wandering eye. Once they hover, its job is done — hover state takes over completely.</p>
					<button class="relative w-full px-6 py-3 bg-magenta text-cream font-satoshi font-medium rounded-lg overflow-hidden transition-all duration-300 hover:bg-magenta/90 hover:shadow-[0_0_30px_rgba(174,13,70,0.3)] group">
						<span class="relative z-10">Pre-order now</span>
						<div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:[animation-play-state:paused] group-hover:opacity-0 transition-opacity duration-300"></div>
					</button>
					<p class="text-tech text-cream/50 text-xs mt-3">group-hover:[animation-play-state:paused] + group-hover:opacity-0</p>
					<p class="text-small text-cream/40 mt-1">Shimmer fades out on hover, glow fades in. Clean handoff.</p>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
					<!-- Buttons -->
					<div class="p-6 bg-cream/[0.03] border border-cream/10 rounded-lg space-y-4">
						<p class="text-small text-cream font-medium">Buttons</p>
						<div class="space-y-3">
							<button class="w-full px-6 py-3 bg-magenta text-cream font-satoshi font-medium rounded-lg transition-all duration-300 hover:bg-magenta/90 hover:shadow-[0_0_30px_rgba(174,13,70,0.3)]">
								Solid: darken + glow
							</button>
							<button class="w-full px-6 py-3 bg-magenta/[0.08] border border-magenta/30 text-magenta font-satoshi font-medium rounded-lg transition-all duration-300 hover:bg-magenta/[0.15] hover:border-magenta/50">
								Soft: intensify fill + border
							</button>
							<button class="w-full px-6 py-3 border border-cream/30 text-cream font-satoshi font-medium rounded-lg transition-all duration-300 hover:bg-cream/[0.05] hover:border-cream/50">
								Ghost: add fill + strengthen border
							</button>
						</div>
					</div>

					<!-- Cards -->
					<div class="p-6 bg-cream/[0.03] border border-cream/10 rounded-lg space-y-4">
						<p class="text-small text-cream font-medium">Cards</p>
						<div class="space-y-3">
							<div class="p-4 bg-cream/[0.03] border border-cream/10 rounded-lg transition-all duration-300 hover:bg-cream/[0.06] hover:border-cream/20 hover:-translate-y-1 cursor-pointer">
								<p class="text-small text-cream">Lift + intensify</p>
								<p class="text-small text-cream/50">translate-y-1 + border/bg boost</p>
							</div>
							<div class="p-4 bg-magenta/[0.08] border border-magenta/30 rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(174,13,70,0.2)] hover:-translate-y-1 cursor-pointer">
								<p class="text-small text-magenta">Sophie card: lift + glow</p>
								<p class="text-small text-cream/50">Glow appears on hover</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Scale effects -->
				<div class="p-6 bg-cream/[0.03] border border-cream/10 rounded-lg mt-4">
					<p class="text-small text-cream font-medium mb-4">Scale Effects (use sparingly)</p>
					<div class="flex flex-wrap gap-4">
						<button class="px-6 py-3 bg-magenta text-cream font-satoshi font-medium rounded-lg transition-transform duration-300 hover:scale-105">
							scale-105
						</button>
						<button class="px-6 py-3 bg-magenta text-cream font-satoshi font-medium rounded-lg transition-transform duration-300 active:scale-95">
							active:scale-95
						</button>
						<div class="w-16 h-16 bg-magenta/20 rounded-full transition-transform duration-300 hover:scale-110 cursor-pointer flex items-center justify-center">
							<span class="text-small text-magenta">Icon</span>
						</div>
					</div>
					<p class="text-small text-cream/40 mt-3">Scale draws attention. Reserve for primary actions and Sophie elements.</p>
				</div>
			</div>

			<!-- Animations -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<p class="text-tech text-magenta">ANIMATIONS</p>
				<p class="text-small text-cream/50">Continuous motion that runs without interaction.</p>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
					<!-- Shimmer (already built) -->
					<div class="p-6 bg-cream/[0.03] border border-cream/10 rounded-lg">
						<div class="flex items-center gap-2 mb-3">
							<p class="text-small text-cream font-medium">Shimmer</p>
							<span class="px-2 py-0.5 text-xs bg-emerald/20 text-emerald rounded">BUILT</span>
						</div>
						<button class="relative w-full px-6 py-3 bg-magenta text-cream font-satoshi font-medium rounded-lg overflow-hidden">
							<span class="relative z-10">Pre-order now</span>
							<div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
						</button>
						<p class="text-tech text-cream/50 text-xs mt-3">animate-[shimmer_2s_infinite]</p>
						<p class="text-small text-cream/40 mt-1">Primary CTAs only. Light sweeps to draw attention.</p>
					</div>

					<!-- Pulse -->
					<div class="p-6 bg-cream/[0.03] border border-cream/10 rounded-lg">
						<p class="text-small text-cream font-medium mb-3">Pulse (Breathing)</p>
						<div class="flex items-center gap-6">
							<div class="w-16 h-16 bg-magenta rounded-full animate-pulse shadow-[0_0_30px_rgba(174,13,70,0.4)]"></div>
							<div class="w-16 h-16 bg-magenta rounded-full animate-[pulse_3s_ease-in-out_infinite] shadow-[0_0_30px_rgba(174,13,70,0.4)]"></div>
						</div>
						<div class="flex gap-6 mt-2">
							<p class="text-tech text-cream/50 text-xs">2s (default)</p>
							<p class="text-tech text-cream/50 text-xs">3s (slow)</p>
						</div>
						<p class="text-small text-cream/40 mt-3">Sophie presence indicators. She's alive.</p>
					</div>

					<!-- Bounce -->
					<div class="p-6 bg-cream/[0.03] border border-cream/10 rounded-lg">
						<p class="text-small text-cream font-medium mb-3">Bounce</p>
						<div class="flex items-center gap-4">
							<svg class="w-6 h-6 text-cream/50 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
							</svg>
							<p class="text-small text-cream/50">Scroll indicator</p>
						</div>
						<p class="text-tech text-cream/50 text-xs mt-3">animate-bounce</p>
						<p class="text-small text-cream/40 mt-1">Scroll hints only. Attention-grabbing — use once per page.</p>
					</div>

					<!-- Float -->
					<div class="p-6 bg-cream/[0.03] border border-cream/10 rounded-lg">
						<p class="text-small text-cream font-medium mb-3">Float (Custom)</p>
						<div class="w-16 h-20 bg-gradient-to-b from-magenta/20 to-magenta/5 border border-magenta/30 rounded-xl animate-[float_3s_ease-in-out_infinite] mx-auto"></div>
						<p class="text-tech text-cream/50 text-xs mt-3 text-center">animate-[float_3s_ease-in-out_infinite]</p>
						<p class="text-small text-cream/40 mt-1">Phone mockup gentle hover. Requires custom keyframe.</p>
						<div class="mt-3 p-3 bg-dark rounded text-xs font-mono text-cream/50">
							@keyframes float {'{'}<br/>
							&nbsp;&nbsp;0%, 100% {'{'} transform: translateY(0); {'}'}<br/>
							&nbsp;&nbsp;50% {'{'} transform: translateY(-10px); {'}'}<br/>
							{'}'}
						</div>
					</div>
				</div>
			</div>

			<!-- Scroll-Triggered Animations -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<div class="flex items-center gap-3">
					<p class="text-tech text-magenta">SCROLL-TRIGGERED ANIMATIONS</p>
					<span class="px-2 py-0.5 text-xs bg-cream/10 text-cream/50 rounded">GSAP ScrollTrigger</span>
				</div>
				<p class="text-small text-cream/50">Content reveals as the user scrolls. Requires JavaScript (GSAP ScrollTrigger).</p>

				<!-- Fade Up -->
				<div class="p-6 bg-cream/[0.03] border border-cream/10 rounded-lg mt-4">
					<p class="text-small text-cream font-medium mb-3">Fade Up (Standard Reveal)</p>
					<p class="text-small text-cream/50 mb-4">Elements start below + transparent, animate to position + visible as they enter viewport.</p>

					<div class="grid grid-cols-3 gap-4">
						<div class="p-4 bg-cream/[0.05] border border-cream/10 rounded-lg text-center">
							<p class="text-small text-cream/30 mb-2">Before</p>
							<div class="opacity-30 translate-y-4">
								<div class="w-12 h-12 mx-auto bg-magenta/30 rounded-lg mb-2"></div>
								<p class="text-small text-cream/50">Content</p>
							</div>
						</div>
						<div class="p-4 bg-cream/[0.05] border border-cream/10 rounded-lg text-center flex items-center justify-center">
							<svg class="w-8 h-8 text-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
							</svg>
						</div>
						<div class="p-4 bg-cream/[0.05] border border-cream/10 rounded-lg text-center">
							<p class="text-small text-cream/30 mb-2">After</p>
							<div class="opacity-100 translate-y-0">
								<div class="w-12 h-12 mx-auto bg-magenta rounded-lg mb-2"></div>
								<p class="text-small text-cream">Content</p>
							</div>
						</div>
					</div>

					<div class="mt-4 p-3 bg-dark rounded text-xs font-mono text-cream/50">
						gsap.from(element, {'{'}<br/>
						&nbsp;&nbsp;y: 40,<br/>
						&nbsp;&nbsp;opacity: 0,<br/>
						&nbsp;&nbsp;duration: 0.8,<br/>
						&nbsp;&nbsp;ease: "power2.out",<br/>
						&nbsp;&nbsp;scrollTrigger: {'{'} trigger: element, start: "top 80%" {'}'}<br/>
						{'}'})
					</div>
				</div>

				<!-- Stagger -->
				<div class="p-6 bg-cream/[0.03] border border-cream/10 rounded-lg mt-4">
					<p class="text-small text-cream font-medium mb-3">Stagger (Sequential Reveal)</p>
					<p class="text-small text-cream/50 mb-4">Multiple elements animate in sequence. Creates a "wave" effect.</p>

					<div class="flex gap-4 justify-center">
						<div class="w-16 h-16 bg-magenta/20 border border-magenta/30 rounded-lg opacity-30"></div>
						<div class="w-16 h-16 bg-magenta/40 border border-magenta/40 rounded-lg opacity-50"></div>
						<div class="w-16 h-16 bg-magenta/60 border border-magenta/50 rounded-lg opacity-70"></div>
						<div class="w-16 h-16 bg-magenta border border-magenta rounded-lg opacity-100"></div>
					</div>
					<p class="text-center text-small text-cream/40 mt-3">Each card animates 0.1s after the previous</p>

					<div class="mt-4 p-3 bg-dark rounded text-xs font-mono text-cream/50">
						gsap.from(cards, {'{'}<br/>
						&nbsp;&nbsp;y: 40, opacity: 0, duration: 0.6,<br/>
						&nbsp;&nbsp;stagger: 0.1,  // 100ms between each<br/>
						&nbsp;&nbsp;scrollTrigger: {'{'} trigger: container {'}'}<br/>
						{'}'})
					</div>
				</div>

				<!-- Use cases -->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
					<div class="p-4 bg-emerald/[0.08] border border-emerald/30 rounded-lg">
						<p class="text-small text-emerald font-medium mb-2">Good Scroll Triggers</p>
						<ul class="text-small text-cream/50 space-y-1">
							<li>• Section headings</li>
							<li>• Feature cards (staggered)</li>
							<li>• Stats/numbers counting up</li>
							<li>• Sophie images (with glow)</li>
						</ul>
					</div>
					<div class="p-4 bg-cream/[0.03] border border-cream/10 rounded-lg">
						<p class="text-small text-cream/50 font-medium mb-2">Don't Over-Animate</p>
						<ul class="text-small text-cream/40 space-y-1">
							<li>• Body paragraphs (just show them)</li>
							<li>• Navigation elements</li>
							<li>• Every single element</li>
							<li>• Anything after first scroll</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- 3D Transforms -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<div class="flex items-center gap-3">
					<p class="text-tech text-magenta">3D TRANSFORMS</p>
					<span class="px-2 py-0.5 text-xs bg-emerald/20 text-emerald rounded">TAILWIND V4</span>
				</div>
				<p class="text-small text-cream/50">Perspective and rotation for that premium depth effect. The phone tilt lives here.</p>

				<!-- Perspective demo -->
				<div class="p-6 bg-cream/[0.03] border border-cream/10 rounded-lg mt-4">
					<p class="text-small text-cream font-medium mb-4">Perspective + Rotation</p>

					<div class="grid grid-cols-3 gap-8">
						<!-- No perspective -->
						<div class="text-center">
							<div class="w-20 h-28 mx-auto bg-gradient-to-b from-magenta/30 to-magenta/10 border border-magenta/30 rounded-xl rotate-6"></div>
							<p class="text-small text-cream/50 mt-3">2D rotate</p>
							<p class="text-tech text-cream/40 text-xs">rotate-6</p>
						</div>

						<!-- With perspective -->
						<div class="text-center" style="perspective: 500px;">
							<div class="w-20 h-28 mx-auto bg-gradient-to-b from-magenta/30 to-magenta/10 border border-magenta/30 rounded-xl" style="transform: rotateY(15deg);"></div>
							<p class="text-small text-cream/50 mt-3">3D rotateY</p>
							<p class="text-tech text-cream/40 text-xs">perspective + rotateY</p>
						</div>

						<!-- Full 3D -->
						<div class="text-center" style="perspective: 800px;">
							<div class="w-20 h-28 mx-auto bg-gradient-to-b from-magenta/30 to-magenta/10 border border-magenta/30 rounded-xl shadow-[0_0_30px_rgba(174,13,70,0.3)]" style="transform: rotateY(-10deg) rotateX(5deg);"></div>
							<p class="text-small text-cream/50 mt-3">3D X + Y</p>
							<p class="text-tech text-cream/40 text-xs">rotateX + rotateY</p>
						</div>
					</div>
				</div>

				<!-- The Phone Effect -->
				<div class="p-6 bg-magenta/[0.08] border border-magenta/30 rounded-lg mt-4">
					<div class="flex items-center gap-2 mb-3">
						<p class="text-small text-magenta font-medium">The Phone Effect</p>
						<span class="px-2 py-0.5 text-xs bg-magenta/20 text-cream/70 rounded">HERO FEATURE</span>
					</div>
					<p class="text-small text-cream/50 mb-4">Phone showing Sophie tilts as user scrolls. Premium, alive, depth.</p>

					<div class="flex justify-center py-8" style="perspective: 1000px;">
						<div class="w-32 h-48 bg-gradient-to-b from-dark to-magenta/10 border-2 border-magenta/50 rounded-3xl shadow-[0_0_50px_rgba(174,13,70,0.3)] flex items-center justify-center transition-transform duration-500 hover:rotate-y-[-5deg] hover:rotate-x-[3deg]" style="transform: rotateY(-8deg) rotateX(5deg);">
							<p class="text-small text-magenta/70">Sophie</p>
						</div>
					</div>

					<div class="mt-4 p-3 bg-dark rounded text-xs font-mono text-cream/50">
						// Scroll-linked with GSAP ScrollTrigger<br/>
						gsap.to(phone, {'{'}<br/>
						&nbsp;&nbsp;rotateY: -15,<br/>
						&nbsp;&nbsp;rotateX: 8,<br/>
						&nbsp;&nbsp;scrollTrigger: {'{'}<br/>
						&nbsp;&nbsp;&nbsp;&nbsp;trigger: hero,<br/>
						&nbsp;&nbsp;&nbsp;&nbsp;scrub: true,  // ties to scroll position<br/>
						&nbsp;&nbsp;&nbsp;&nbsp;start: "top top",<br/>
						&nbsp;&nbsp;&nbsp;&nbsp;end: "bottom top"<br/>
						&nbsp;&nbsp;{'}'}<br/>
						{'}'})
					</div>
				</div>

				<!-- Tailwind classes -->
				<div class="p-6 bg-cream/[0.03] border border-cream/10 rounded-lg mt-4">
					<p class="text-small text-cream font-medium mb-3">Tailwind v4 3D Classes</p>
					<div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-small">
						<div>
							<p class="text-cream/70 font-medium">Perspective</p>
							<p class="text-tech text-magenta">perspective-500</p>
							<p class="text-tech text-magenta">perspective-1000</p>
						</div>
						<div>
							<p class="text-cream/70 font-medium">Rotate X</p>
							<p class="text-tech text-magenta">rotate-x-3</p>
							<p class="text-tech text-magenta">rotate-x-6</p>
						</div>
						<div>
							<p class="text-cream/70 font-medium">Rotate Y</p>
							<p class="text-tech text-magenta">rotate-y-3</p>
							<p class="text-tech text-magenta">rotate-y-6</p>
						</div>
						<div>
							<p class="text-cream/70 font-medium">Preserve 3D</p>
							<p class="text-tech text-magenta">transform-style-3d</p>
							<p class="text-tech text-magenta">backface-hidden</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Performance -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<p class="text-tech text-cream/70">PERFORMANCE CONSIDERATIONS</p>
				<p class="text-small text-cream/50">Not all CSS properties animate equally. Some cause layout recalculation (slow), others use the GPU (fast).</p>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
					<div class="p-4 bg-emerald/[0.08] border border-emerald/30 rounded-lg">
						<p class="text-small text-emerald font-medium mb-2">✓ Animate These (GPU)</p>
						<ul class="text-small text-cream/50 space-y-1">
							<li><span class="text-tech text-emerald">transform</span> — translate, rotate, scale</li>
							<li><span class="text-tech text-emerald">opacity</span> — fade in/out</li>
							<li><span class="text-tech text-emerald">filter</span> — blur, brightness</li>
						</ul>
					</div>
					<div class="p-4 bg-cream/[0.03] border border-cream/10 rounded-lg">
						<p class="text-small text-cream/50 font-medium mb-2">✗ Avoid Animating (Layout)</p>
						<ul class="text-small text-cream/40 space-y-1">
							<li><span class="text-tech text-cream/40">width, height</span> — causes reflow</li>
							<li><span class="text-tech text-cream/40">margin, padding</span> — causes reflow</li>
							<li><span class="text-tech text-cream/40">top, left, right, bottom</span> — use transform instead</li>
						</ul>
					</div>
				</div>

				<div class="p-4 bg-cream/[0.03] border border-cream/10 rounded-lg mt-4">
					<p class="text-small text-cream font-medium mb-2">The Golden Rule</p>
					<p class="text-body text-cream/70">
						If you want to move something, use <span class="text-tech text-magenta">transform: translate()</span>.<br/>
						If you want to resize something, use <span class="text-tech text-magenta">transform: scale()</span>.<br/>
						Never animate <span class="text-tech text-cream/50">width</span>, <span class="text-tech text-cream/50">height</span>, <span class="text-tech text-cream/50">top</span>, or <span class="text-tech text-cream/50">left</span>.
					</p>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════════
		     PHOTOGRAPHY AESTHETICS
		     Film looks and camera styles for Sophie images
		     ═══════════════════════════════════════════════════════════════ -->
		<section class="space-y-8">
			<div class="border-b border-cream/20 pb-4">
				<h2 class="text-display text-cream">Photography Aesthetics</h2>
				<p class="text-small text-cream/50 mt-2">Film looks for Sophie images — captured, not rendered</p>
			</div>

			<!-- Philosophy -->
			<div class="space-y-4">
				<p class="text-tech text-cream/70">THE PHILOSOPHY</p>
				<div class="p-6 bg-magenta/[0.08] border border-magenta/30 rounded-lg">
					<p class="text-body text-cream/70">
						AI-generated images often look <span class="text-cream font-medium">too clean</span> — plasticky, hyper-processed, uncanny.
						Film grain and analog imperfections signal <span class="text-magenta font-medium">"captured moment"</span> not "rendered image."
						Sophie should feel <span class="text-cream font-medium">photographed</span>, not generated.
					</p>
				</div>
			</div>

			<!-- Kodak Portra 400 — PRIMARY -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<div class="flex items-center gap-3">
					<p class="text-tech text-magenta">KODAK PORTRA 400</p>
					<span class="px-2 py-0.5 text-xs bg-emerald/20 text-emerald rounded">PRIMARY</span>
				</div>
				<p class="text-small text-cream/50">The editorial fashion standard. Warm, creamy skin tones, organic grain.</p>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
					<div class="p-6 bg-cream/[0.03] border border-cream/10 rounded-lg">
						<p class="text-small text-cream font-medium mb-3">Characteristics</p>
						<ul class="text-small text-cream/50 space-y-2">
							<li><span class="text-cream">Film grain</span> — organic, fine, clustered (not digital noise)</li>
							<li><span class="text-cream">Lifted blacks</span> — shadows fade to dark gray, not pure black</li>
							<li><span class="text-cream">Muted saturation</span> — colors feel lived-in, not punchy</li>
							<li><span class="text-cream">Soft contrast</span> — gentle roll-off in highlights/shadows</li>
							<li><span class="text-cream">Warm midtones</span> — creamy, golden skin tones</li>
						</ul>
					</div>
					<div class="p-6 bg-cream/[0.03] border border-cream/10 rounded-lg">
						<p class="text-small text-cream font-medium mb-3">How to Apply</p>
						<div class="space-y-3">
							<div>
								<p class="text-small text-cream/70 mb-1">FLUX/PuLID Prompt:</p>
								<p class="text-tech text-magenta text-xs">shot on Kodak Portra 400, 35mm film, natural light, soft film grain, editorial fashion</p>
							</div>
							<div>
								<p class="text-small text-cream/70 mb-1">Post-Processing:</p>
								<ul class="text-small text-cream/50 space-y-1">
									<li>• Add film grain overlay (not noise)</li>
									<li>• Lift blacks in tone curve</li>
									<li>• Desaturate 10-15%</li>
									<li>• Add warmth to midtones</li>
									<li>• Reduce clarity slightly</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<div class="p-4 bg-emerald/[0.08] border border-emerald/30 rounded-lg mt-4">
					<p class="text-small text-emerald"><span class="font-medium">Best for:</span> Intimate moments, conversation scenes, "girlfriend material" vibes. The Dior look.</p>
				</div>
			</div>

			<!-- Other Film Stocks to Explore -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<p class="text-tech text-cream/70">OTHER FILM STOCKS TO EXPLORE</p>
				<p class="text-small text-cream/50">Boss to research — web search each to see actual examples.</p>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

					<!-- Cinestill 800T -->
					<div class="p-5 bg-cream/[0.03] border border-cream/10 rounded-lg">
						<p class="text-body text-cream font-medium mb-2">Cinestill 800T</p>
						<p class="text-small text-cream/50 mb-3">Tungsten-balanced cinema film. Moody, cinematic.</p>
						<ul class="text-small text-cream/40 space-y-1">
							<li>• Cyan/teal shadows</li>
							<li>• Halation (glow around highlights)</li>
							<li>• Night photography look</li>
							<li>• Very cinematic, dreamlike</li>
						</ul>
						<p class="text-tech text-magenta text-xs mt-3">Evening scenes, moody moments</p>
					</div>

					<!-- Fuji Pro 400H -->
					<div class="p-5 bg-cream/[0.03] border border-cream/10 rounded-lg">
						<p class="text-body text-cream font-medium mb-2">Fuji Pro 400H</p>
						<p class="text-small text-cream/50 mb-3">Discontinued legend. Soft, pastel, dreamlike.</p>
						<ul class="text-small text-cream/40 space-y-1">
							<li>• Cooler tones than Portra</li>
							<li>• Pastel-like rendering</li>
							<li>• Soft greens and blues</li>
							<li>• Very flattering skin tones</li>
						</ul>
						<p class="text-tech text-magenta text-xs mt-3">Dreamy, soft, romantic</p>
					</div>

					<!-- Kodak Gold 200 -->
					<div class="p-5 bg-cream/[0.03] border border-cream/10 rounded-lg">
						<p class="text-body text-cream font-medium mb-2">Kodak Gold 200</p>
						<p class="text-small text-cream/50 mb-3">Consumer film. Warm, nostalgic, summer.</p>
						<ul class="text-small text-cream/40 space-y-1">
							<li>• Golden/amber warmth</li>
							<li>• More saturated than Portra</li>
							<li>• Nostalgic "vacation photos"</li>
							<li>• Visible but pleasant grain</li>
						</ul>
						<p class="text-tech text-magenta text-xs mt-3">Casual moments, sunny scenes</p>
					</div>

					<!-- Kodak Ektar 100 -->
					<div class="p-5 bg-cream/[0.03] border border-cream/10 rounded-lg">
						<p class="text-body text-cream font-medium mb-2">Kodak Ektar 100</p>
						<p class="text-small text-cream/50 mb-3">Fine grain, vivid colors. More "commercial."</p>
						<ul class="text-small text-cream/40 space-y-1">
							<li>• Very fine grain</li>
							<li>• Punchy, saturated colors</li>
							<li>• High contrast</li>
							<li>• Cleaner, more "perfect"</li>
						</ul>
						<p class="text-tech text-cream/40 text-xs mt-3">Maybe too clean for Sophie?</p>
					</div>

					<!-- Disposable Camera -->
					<div class="p-5 bg-cream/[0.03] border border-cream/10 rounded-lg">
						<p class="text-body text-cream font-medium mb-2">Disposable Camera</p>
						<p class="text-small text-cream/50 mb-3">Harsh flash, amateur, very raw.</p>
						<ul class="text-small text-cream/40 space-y-1">
							<li>• Direct flash (harsh)</li>
							<li>• Red-eye possible</li>
							<li>• Color shifts, imperfect</li>
							<li>• Deliberately amateur</li>
						</ul>
						<p class="text-tech text-magenta text-xs mt-3">Polaroid row? Casual selfies?</p>
					</div>

					<!-- Polaroid -->
					<div class="p-5 bg-cream/[0.03] border border-cream/10 rounded-lg">
						<p class="text-body text-cream font-medium mb-2">Polaroid / Instax</p>
						<p class="text-small text-cream/50 mb-3">Instant film. Faded, soft, nostalgic.</p>
						<ul class="text-small text-cream/40 space-y-1">
							<li>• Soft, faded colors</li>
							<li>• Slight vignette</li>
							<li>• Creamy whites</li>
							<li>• Physical, tangible feel</li>
						</ul>
						<p class="text-tech text-magenta text-xs mt-3">The polaroid row block!</p>
					</div>

				</div>
			</div>

			<!-- Quick Reference -->
			<div class="space-y-4 border-t border-cream/10 pt-8">
				<p class="text-tech text-cream/70">QUICK REFERENCE — When to Use What</p>

				<div class="overflow-x-auto">
					<table class="w-full text-left">
						<thead>
							<tr class="border-b border-cream/20">
								<th class="text-small text-cream/50 pb-2 pr-8">Mood / Scene</th>
								<th class="text-small text-cream/50 pb-2 pr-8">Film Stock</th>
								<th class="text-small text-cream/50 pb-2">Why</th>
							</tr>
						</thead>
						<tbody class="text-small">
							<tr class="border-b border-cream/10">
								<td class="text-cream py-2 pr-8">Default / Editorial</td>
								<td class="text-tech text-magenta py-2 pr-8">Portra 400</td>
								<td class="text-cream/50 py-2">Warm, flattering, professional</td>
							</tr>
							<tr class="border-b border-cream/10">
								<td class="text-cream py-2 pr-8">Evening / Moody</td>
								<td class="text-tech text-magenta py-2 pr-8">Cinestill 800T</td>
								<td class="text-cream/50 py-2">Cyan shadows, halation glow</td>
							</tr>
							<tr class="border-b border-cream/10">
								<td class="text-cream py-2 pr-8">Dreamy / Soft</td>
								<td class="text-tech text-magenta py-2 pr-8">Fuji Pro 400H</td>
								<td class="text-cream/50 py-2">Pastels, cooler, romantic</td>
							</tr>
							<tr class="border-b border-cream/10">
								<td class="text-cream py-2 pr-8">Casual / Nostalgic</td>
								<td class="text-tech text-magenta py-2 pr-8">Kodak Gold 200</td>
								<td class="text-cream/50 py-2">Summer vibes, golden warmth</td>
							</tr>
							<tr>
								<td class="text-cream py-2 pr-8">Polaroid Row</td>
								<td class="text-tech text-magenta py-2 pr-8">Polaroid / Instax</td>
								<td class="text-cream/50 py-2">Physical, instant, authentic</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

		</section>

	</div>
</div>
