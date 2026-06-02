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
		'photography',
		'text-overlays'
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
		'photography': 'Photography Aesthetics',
		'text-overlays': 'Text Overlays'
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
		<section class="space-y-8">
			<!-- Locked palette -->
			<div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 4px;">CORE PALETTE (locked)</p>
				<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.8rem; color: #E8E4DF; opacity: 0.5; margin-bottom: 16px;">Three colors. One canvas, one accent, one text. Girl photos provide all visual richness. Grows with Prague when needed.</p>
				<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
					<div>
						<div style="width: 100%; height: 80px; background-color: #0B0D10; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);"></div>
						<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #E8E4DF; margin-top: 8px;">#0B0D10</p>
						<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.8rem; color: #E8E4DF; opacity: 0.5;">Canvas (premium black, cool blue undertone)</p>
					</div>
					<div>
						<div style="width: 100%; height: 80px; background-color: #AE0D46; border-radius: 8px;"></div>
						<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #E8E4DF; margin-top: 8px;">#AE0D46</p>
						<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.8rem; color: #E8E4DF; opacity: 0.5;">Magenta accent (sole warm color)</p>
					</div>
					<div>
						<div style="width: 100%; height: 80px; background-color: #E8E4DF; border-radius: 8px;"></div>
						<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #E8E4DF; margin-top: 8px;">#E8E4DF</p>
						<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.8rem; color: #E8E4DF; opacity: 0.5;">Neutral cream (text, temperature-neutral)</p>
					</div>
				</div>
			</div>

			<!-- Text opacity tiers -->
			<div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 16px;">TEXT OPACITY TIERS (locked)</p>
				<div style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.9rem; line-height: 2;">
					<p style="color: #E8E4DF; opacity: 1;"><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; opacity: 0.4; margin-right: 12px;">100%</span> Headlines, hero text, primary content</p>
					<p style="color: #E8E4DF; opacity: 0.8;"><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; opacity: 0.5; margin-right: 12px;">80%</span> Body copy, secondary text</p>
					<p style="color: #E8E4DF; opacity: 0.4;"><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; opacity: 1; margin-right: 12px;">40%</span> Metadata, labels, captions</p>
				</div>
			</div>

			<!-- Magenta usage rules -->
			<div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 16px;">MAGENTA USAGE RULES (locked)</p>
				<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
					<div>
						<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #AE0D46; margin-bottom: 8px;">USE FOR</p>
						<ul style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.85rem; color: #E8E4DF; opacity: 0.8; line-height: 2; list-style: none; padding: 0;">
							<li>CTA buttons (Join the waitlist, Meet her)</li>
							<li>Shimmer glow behind girl photos</li>
							<li>Hover accents on links and interactive elements</li>
							<li>Active states (selected nav, active tabs)</li>
							<li>Input focus border (email field commitment reward)</li>
						</ul>
					</div>
					<div>
						<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 8px;">NEVER USE FOR</p>
						<ul style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.85rem; color: #E8E4DF; opacity: 0.5; line-height: 2; list-style: none; padding: 0;">
							<li>Body text color</li>
							<li>Full section backgrounds</li>
							<li>Borders (use white-opacity instead)</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Remaining -->
			<div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 12px;">REMAINING ITEMS (undecided)</p>
				<ol class="list-decimal list-inside space-y-2" style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.95rem; opacity: 0.5; line-height: 1.8;">
					<li>Semantic colors (success, error, warning — deferred to Prague)</li>
					<li>Gradient definitions (magenta shimmer formalized)</li>
				</ol>
			</div>
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
		<section class="space-y-8">
			<!-- Floating Card Spec -->
			<div>
				<h3 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.5rem; font-weight: 500; color: #E8E4DF; margin-bottom: 8px;">Floating Card (Primary Elevation)</h3>
				<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.9rem; color: #E8E4DF; opacity: 0.8; margin-bottom: 20px;">Directional light simulation — card feels like a physical surface catching light in a dark room. Extracted from Linear's live DOM.</p>

				<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
					<!-- Live example -->
					<div style="position: relative;">
						<div style="
							position: absolute;
							top: -100px;
							left: -60px;
							width: 400px;
							height: 400px;
							background: radial-gradient(50% 50%, rgba(255, 255, 255, 0.04) 0px, rgba(255, 255, 255, 0) 90%);
							pointer-events: none;
						"></div>
						<div style="
							position: relative;
							background-color: rgba(255, 255, 255, 0.01);
							border: 1px solid rgba(255, 255, 255, 0.08);
							box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 0px 1px, rgba(8, 9, 10, 0.4) 0px 0px 64px 0px;
							border-radius: 12px;
							padding: 24px;
						">
							<h4 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.3rem; font-weight: 500; color: #E8E4DF; margin-bottom: 8px;">Sophie</h4>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.85rem; line-height: 1.5; color: #E8E4DF; opacity: 0.8;">She remembers the way you like your coffee.</p>
							<button style="margin-top: 14px; padding: 10px 20px; background-color: #AE0D46; color: #E8E4DF; font-family: 'Inter', system-ui, sans-serif; font-size: 0.8rem; font-weight: 500; border: none; border-radius: 6px;">Meet her</button>
						</div>
					</div>

					<!-- Spec breakdown -->
					<div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; line-height: 2.2; color: #E8E4DF;">
						<p style="opacity: 0.4; margin-bottom: 12px;">5-LAYER SYSTEM</p>
						<p><span style="opacity: 0.4;">1.</span> <span style="color: #AE0D46;">bg</span> rgba(255,255,255, 0.01)</p>
						<p style="opacity: 0.6; font-size: 0.7rem; margin-bottom: 8px;">1% white tint — barely perceptible, creates micro-separation from canvas</p>
						<p><span style="opacity: 0.4;">2.</span> <span style="color: #AE0D46;">border</span> 1px solid rgba(255,255,255, 0.08)</p>
						<p style="opacity: 0.6; font-size: 0.7rem; margin-bottom: 8px;">8% white — defines the edge without drawing attention</p>
						<p><span style="opacity: 0.4;">3.</span> <span style="color: #AE0D46;">ring shadow</span> rgba(0,0,0, 0.2) 0 0 0 1px</p>
						<p style="opacity: 0.6; font-size: 0.7rem; margin-bottom: 8px;">Sharpens the card edge — sits just outside the border</p>
						<p><span style="opacity: 0.4;">4.</span> <span style="color: #AE0D46;">ambient shadow</span> rgba(8,9,10, 0.4) 0 0 64px</p>
						<p style="opacity: 0.6; font-size: 0.7rem; margin-bottom: 8px;">Large soft shadow — the depth. Makes it feel like it's hovering above the canvas</p>
						<p><span style="opacity: 0.4;">5.</span> <span style="color: #AE0D46;">glow div</span> radial-gradient(50% 50%, rgba(255,255,255, 0.04) 0px, transparent 90%)</p>
						<p style="opacity: 0.6; font-size: 0.7rem;">Separate element behind card, positioned top-left — simulates directional overhead light catching the card's upper edge</p>
					</div>
				</div>
			</div>

			<!-- Squircle Radius Scale -->
			<div>
				<h3 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.5rem; font-weight: 500; color: #E8E4DF; margin-bottom: 8px;">Corner Radius Scale (locked)</h3>
				<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.9rem; color: #E8E4DF; opacity: 0.8; margin-bottom: 20px;">Apple-style continuous corners via figma-squircle (cornerSmoothing: 0.6). Radius scales with element size.</p>

				<div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #E8E4DF; line-height: 2.2;">
					<p><span style="color: #AE0D46;">24px squircle</span> — girl cards, hero containers, modals</p>
					<p><span style="color: #AE0D46;">12px squircle</span> — buttons, CTA, inputs, small cards</p>
					<p><span style="color: #AE0D46;">8px standard</span> — tags, badges, tooltips (squircle invisible at this size)</p>
					<p><span style="color: #AE0D46;">50% round</span> — avatars, circular elements</p>
				</div>

				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: rgba(232,228,223,0.4); margin-top: 12px;">Implementation: npm figma-squircle v1.1.0 · getSvgPath() · clip-path: path()</p>
			</div>

			<!-- Remaining checklist items -->
			<div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 12px;">REMAINING ITEMS (undecided)</p>
				<ol class="list-decimal list-inside space-y-2" style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.95rem; opacity: 0.5; line-height: 1.8;">
					<li>Divider lines (horizontal, vertical)</li>
					<li>Image border treatment (rounded corners, no border vs subtle border)</li>
				</ol>
			</div>
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

		{#if activeSection === 'text-overlays'}
		<section class="space-y-4">
			<ol class="list-decimal list-inside space-y-2" style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.95rem; opacity: 0.85; line-height: 1.8;">
				<li>Gradient direction (bottom-up for photo cards)</li>
				<li>Gradient opacity range (transparent → black at what %)</li>
				<li>Gradient height (what % of the card does it cover)</li>
				<li>Text positioning within the gradient (padding from bottom/sides)</li>
				<li>Text color on gradient (always 100% cream or adjusted?)</li>
				<li>Font pairing on overlays (which type scale levels)</li>
				<li>Maximum text length before truncation</li>
				<li>Overlay on hover vs always visible</li>
			</ol>
		</section>
		{/if}

	</div>
</div>
