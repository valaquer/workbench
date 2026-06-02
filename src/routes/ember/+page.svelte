<script>
	let activeSection = $state(null);

	const sections = [
		'typography',
		'colors',
		'buttons',
		'spacing',
		'shimmers-glows',
		'borders-shadows',
		'logos',
		'aether-divider',
		'block-layouts',
		'breakpoints',
		'motion',
		'photography'
	];

	const labels = {
		'typography': 'Typography',
		'colors': 'Colors',
		'buttons': 'Buttons',
		'spacing': 'Spacing',
		'shimmers-glows': 'Shimmers & Glows',
		'borders-shadows': 'Borders & Shadows',
		'logos': 'Logos',
		'aether-divider': 'Aether Divider',
		'block-layouts': 'Block Layouts',
		'breakpoints': 'Breakpoints',
		'motion': 'Motion',
		'photography': 'Photography Aesthetics'
	};
</script>

<div class="min-h-screen" style="background-color: #0B0D10; color: #E8E4DF;">
	<div class="max-w-5xl mx-auto px-8 py-16 space-y-12">

		<div class="flex flex-wrap gap-3">
			{#each sections as section}
				<button
					onclick={() => activeSection = activeSection === section ? null : section}
					class="px-5 py-3 rounded-lg font-body font-medium text-sm cursor-pointer transition-colors"
					style="border: 1px solid rgba(255,255,255,0.15); {activeSection === section ? 'background-color: #AE0D46; color: #E8E4DF; border-color: #AE0D46;' : 'background-color: rgba(255,255,255,0.08); color: #E8E4DF;'}"
				>{labels[section]}</button>
			{/each}
		</div>

		{#if activeSection === 'typography'}
		<section class="space-y-4">
			<ol class="list-decimal list-inside space-y-2" style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.95rem; opacity: 0.85; line-height: 1.8;">
				<li>Font families (primary, secondary, monospace)</li>
				<li>Type scale (hierarchy of sizes — hero, display, heading, subhead, body, caption)</li>
				<li>Font weights per level</li>
				<li>Line heights per level</li>
				<li>Letter spacing per level</li>
				<li>Paragraph spacing</li>
				<li>Text color / opacity tiers</li>
				<li>Font loading strategy (Google Fonts, self-hosted, fallback stack)</li>
				<li>Responsive behavior (clamp values, breakpoint adjustments)</li>
				<li>Text alignment rules (left, center — when to use which)</li>
				<li>Link styling (color, underline, hover state)</li>
				<li>List styling (bullets, numbered)</li>
				<li>Blockquote / pull quote treatment</li>
				<li>Code / monospace inline treatment</li>
			</ol>
		</section>
		{/if}

		{#if activeSection === 'colors'}
		<section class="space-y-4">
			<ol class="list-decimal list-inside space-y-2" style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.95rem; opacity: 0.85; line-height: 1.8;">
				<li>Core palette (canvas, accent, text, semantic)</li>
				<li>Color naming convention</li>
				<li>Opacity variants (fill percentages, border percentages)</li>
				<li>Text color on dark canvas</li>
				<li>Text color on light canvas</li>
				<li>Accent usage rules (when magenta, when emerald, when neutral)</li>
				<li>Semantic colors (success, error, warning, info)</li>
				<li>Gradient definitions (if any)</li>
				<li>Dark mode / light mode mapping</li>
			</ol>
		</section>
		{/if}

		{#if activeSection === 'buttons'}
		<section class="space-y-4">
			<ol class="list-decimal list-inside space-y-2" style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.95rem; opacity: 0.85; line-height: 1.8;">
				<li>Primary CTA (solid fill — color, size, radius, padding)</li>
				<li>Secondary CTA (soft fill or ghost)</li>
				<li>Tertiary / text-only button</li>
				<li>Button sizes (small, default, large)</li>
				<li>Hover states (color shift, scale, shadow)</li>
				<li>Active / pressed states</li>
				<li>Disabled states (opacity, cursor)</li>
				<li>Focus ring (accessibility)</li>
				<li>Icon + text button layout</li>
				<li>Button spacing in groups</li>
			</ol>
		</section>
		{/if}

		{#if activeSection === 'spacing'}
		<section class="space-y-4">
			<ol class="list-decimal list-inside space-y-2" style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.95rem; opacity: 0.85; line-height: 1.8;">
				<li>Base unit (4px, 8px — the grid)</li>
				<li>Component internal padding</li>
				<li>Section vertical padding</li>
				<li>Gap between elements within a block</li>
				<li>Gap between blocks/sections</li>
				<li>Horizontal page margins (responsive)</li>
				<li>Max content width</li>
				<li>Spacing scale (named values — xs, sm, md, lg, xl, 2xl)</li>
			</ol>
		</section>
		{/if}

		{#if activeSection === 'shimmers-glows'}
		<section class="space-y-4">
			<ol class="list-decimal list-inside space-y-2" style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.95rem; opacity: 0.85; line-height: 1.8;">
				<li>Magenta shimmer (color, opacity, blur radius, position)</li>
				<li>Shimmer placement rules (which corner, asymmetric)</li>
				<li>Containment (overflow hidden on parent)</li>
				<li>Glow behind photos vs behind cards</li>
				<li>Ambient glow for hero/featured elements</li>
				<li>Hover-triggered glow (if any)</li>
				<li>Performance considerations (GPU compositing)</li>
			</ol>
		</section>
		{/if}

		{#if activeSection === 'borders-shadows'}
		<section class="space-y-4">
			<ol class="list-decimal list-inside space-y-2" style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.95rem; opacity: 0.85; line-height: 1.8;">
				<li>Border color and opacity</li>
				<li>Border width (1px standard)</li>
				<li>Border radius scale (cards, buttons, inputs, avatars)</li>
				<li>Card shadow (resting, hover, elevated)</li>
				<li>Drop shadow for modals / overlays</li>
				<li>Divider lines (horizontal, vertical)</li>
				<li>Image border treatment (rounded corners, no border vs subtle border)</li>
			</ol>
		</section>
		{/if}

		{#if activeSection === 'logos'}
		<section class="space-y-4">
			<ol class="list-decimal list-inside space-y-2" style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.95rem; opacity: 0.85; line-height: 1.8;">
				<li>Provoque wordmark (font, weight, size, spacing)</li>
				<li>Watermark treatment (opacity, size, positioning)</li>
				<li>Logo clear space</li>
				<li>Minimum size</li>
				<li>Logo on dark vs light background</li>
				<li>Logo lockups (wordmark + tagline)</li>
				<li>Favicon / app icon</li>
			</ol>
		</section>
		{/if}

		{#if activeSection === 'aether-divider'}
		<section class="space-y-4">
			<ol class="list-decimal list-inside space-y-2" style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.95rem; opacity: 0.85; line-height: 1.8;">
				<li>Divider style (gradient, solid, animated)</li>
				<li>Placement rules (between which sections)</li>
				<li>Width (full-bleed vs contained)</li>
				<li>Height / thickness</li>
				<li>Color (palette-derived or accent)</li>
				<li>Animation behavior (if any)</li>
			</ol>
		</section>
		{/if}

		{#if activeSection === 'block-layouts'}
		<section class="space-y-4">
			<ol class="list-decimal list-inside space-y-2" style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.95rem; opacity: 0.85; line-height: 1.8;">
				<li>Hero block (full-bleed, content positioning)</li>
				<li>Split block (text left / media right, or reversed)</li>
				<li>Feature row (icon + heading + body, horizontal)</li>
				<li>Spotlight block (single focal element, centered)</li>
				<li>Stats bar (numbers + labels, horizontal)</li>
				<li>Bento grid (asymmetric card grid)</li>
				<li>Testimonial block</li>
				<li>Girl grid (roster — columns, gap, aspect ratio)</li>
				<li>Sequencing rule (no two adjacent blocks same layout)</li>
				<li>Full-bleed vs contained rules</li>
			</ol>
		</section>
		{/if}

		{#if activeSection === 'breakpoints'}
		<section class="space-y-4">
			<ol class="list-decimal list-inside space-y-2" style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.95rem; opacity: 0.85; line-height: 1.8;">
				<li>Breakpoint values (mobile, tablet, desktop, wide)</li>
				<li>Grid columns per breakpoint</li>
				<li>Typography scale adjustments per breakpoint</li>
				<li>Navigation behavior (hamburger, sticky, hidden)</li>
				<li>Image sizing per breakpoint</li>
				<li>Touch target minimums (mobile)</li>
				<li>Container max-widths per breakpoint</li>
			</ol>
		</section>
		{/if}

		{#if activeSection === 'motion'}
		<section class="space-y-4">
			<ol class="list-decimal list-inside space-y-2" style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.95rem; opacity: 0.85; line-height: 1.8;">
				<li>Animation stack (GSAP + ScrollTrigger + Lenis)</li>
				<li>GPU-safe property list (transform, opacity, filter, clip-path)</li>
				<li>Hero auto-play timeline spec</li>
				<li>Card stack scroll-driven swipe spec</li>
				<li>Parallax depth (2.5D) spec</li>
				<li>Staggered entry spec</li>
				<li>Lenis smooth scroll integration</li>
				<li>Easing library (power2, power3 — when to use which)</li>
				<li>Duration guidelines (fast 0.2s, medium 0.6s, slow 1s+)</li>
				<li>Reduced motion / prefers-reduced-motion fallback</li>
			</ol>
		</section>
		{/if}

		{#if activeSection === 'photography'}
		<section class="space-y-4">
			<ol class="list-decimal list-inside space-y-2" style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.95rem; opacity: 0.85; line-height: 1.8;">
				<li>Aspect ratios (3:4 portrait, 4:3 landscape, 1:1 square)</li>
				<li>Crop guidelines (face positioning, rule of thirds)</li>
				<li>Color grading / filter consistency</li>
				<li>Image resolution requirements</li>
				<li>Placeholder / skeleton treatment during load</li>
				<li>Alt text conventions</li>
				<li>Girl photo categories (hero, everyday, NSFW — when to use which)</li>
				<li>Background separation (cutout quality for parallax)</li>
			</ol>
		</section>
		{/if}

	</div>
</div>
