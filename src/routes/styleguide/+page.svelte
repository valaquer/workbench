<script>
	import { onMount } from 'svelte';
	import { getSvgPath } from 'figma-squircle';

	let activeSection = $state(null);
	let squircleCard;
	let squirclePath = $state('');
	let promiseCardPath = $state('');
	let shimmerBtn1;
	let shimmerBtn2;

	function observeShimmer(el) {
		if (!el) return;
		const shimmerDiv = el.querySelector('[data-shimmer]');
		if (!shimmerDiv) return;
		let timer = null;
		let isVisible = false;
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				isVisible = entry.isIntersecting;
				if (isVisible) {
					const delay = 1 + Math.random() * 2; // 1s to 3s
					timer = setTimeout(() => {
						if (isVisible) {
							shimmerDiv.style.animation = 'shimmer 0.8s ease-out forwards';
							observer.unobserve(el);
						}
					}, delay * 1000);
				} else if (timer) {
					clearTimeout(timer);
					timer = null;
				}
			});
		}, { threshold: 0.5 });
		observer.observe(el);
	}

	onMount(() => {
		// Restore persisted section
		const saved = localStorage.getItem('styleguide-section');
		if (saved) activeSection = saved;

		// Squircle path calc
		const rect = squircleCard?.getBoundingClientRect();
		if (rect) {
			squirclePath = getSvgPath({
				width: rect.width,
				height: rect.height,
				cornerRadius: 24,
				cornerSmoothing: 0.6
			});
		}

		// Promise block card squircle (220x391)
		promiseCardPath = getSvgPath({
			width: 220,
			height: 391,
			cornerRadius: 24,
			cornerSmoothing: 0.6
		});
	});

	$effect(() => {
		if (activeSection) {
			localStorage.setItem('styleguide-section', activeSection);
		} else {
			localStorage.removeItem('styleguide-section');
		}
		if (activeSection === 'buttons') {
			// Delay to let DOM render
			setTimeout(() => {
				observeShimmer(shimmerBtn1);
				observeShimmer(shimmerBtn2);
			}, 50);
		}
	});

	// SECTION A: Style Guide
	const styleGuideSections = [
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
		'text-overlays',
		'watermarks',
		'chat-ui',
		'og-image'
	];

	const styleGuideLabels = {
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
		'text-overlays': 'Text Overlays',
		'watermarks': 'Watermarks',
		'chat-ui': 'Chat UI',
		'og-image': 'OG Share Image'
	};

	const allSections = styleGuideSections;

	function selectSection(section) {
		activeSection = activeSection === section ? null : section;
	}
</script>

<div class="min-h-screen" style="background-color: #0B0D10; color: #E8E4DF;">

	<!-- TOC -->
	<div class="max-w-5xl mx-auto px-8 py-16 space-y-12">

		<!-- Section A: Style Guide -->
		<div>
			<div class="flex flex-wrap gap-3">
				{#each styleGuideSections as section}
					<button
						onclick={() => selectSection(section)}
						class="px-5 py-3 rounded-lg font-body font-medium text-sm cursor-pointer transition-colors"
						style="border: 1px solid rgba(255,255,255,0.15); {activeSection === section ? 'background-color: #AE0D46; color: #E8E4DF; border-color: #AE0D46;' : 'background-color: rgba(255,255,255,0.08); color: #E8E4DF;'}"
					>{styleGuideLabels[section]}</button>
				{/each}
			</div>
		</div>

		<!-- ============================================================ -->
		<!-- SECTION A: STYLE GUIDE CONTENT                               -->
		<!-- ============================================================ -->

		{#if activeSection === 'typography'}
		<section class="space-y-12">
			<!-- Font families -->
			<div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 16px;">FONT FAMILIES (locked)</p>
				<div style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.85rem; color: #E8E4DF; opacity: 0.8; line-height: 2;">
					<p><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #AE0D46; margin-right: 8px;">Primary</span> Cormorant Garamond — headlines, display, subheads</p>
					<p><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #AE0D46; margin-right: 8px;">Body</span> Inter — body copy, UI text, buttons</p>
					<p><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #AE0D46; margin-right: 8px;">Mono</span> JetBrains Mono — captions, metadata, technical</p>
				</div>
			</div>

			<!-- Type scale — live specimens -->
			<div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 24px;">TYPE SCALE — LIVE SPECIMENS</p>

				<!-- Hero -->
				<div style="margin-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 40px;">
					<div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px;">
						<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #AE0D46;">HERO</p>
						<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: rgba(232,228,223,0.4);">Cormorant 600 · 4rem (64px) · 1.05 · -0.02em · 100%</p>
					</div>
					<p style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 4rem; font-weight: 600; line-height: 1.05; letter-spacing: -0.02em; color: #E8E4DF;">Finally, somebody who remembers.</p>
				</div>

				<!-- Display -->
				<div style="margin-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 40px;">
					<div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px;">
						<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #AE0D46;">DISPLAY</p>
						<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: rgba(232,228,223,0.4);">Cormorant 500 · 2.5rem (40px) · 1.15 · -0.01em · 100%</p>
					</div>
					<p style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 2.5rem; font-weight: 500; line-height: 1.15; letter-spacing: -0.01em; color: #E8E4DF;">She knows your name before you say it</p>
				</div>

				<!-- Heading -->
				<div style="margin-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 40px;">
					<div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px;">
						<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #AE0D46;">HEADING</p>
						<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: rgba(232,228,223,0.4);">Cormorant 500 · 1.75rem (28px) · 1.25 · 0 · 100%</p>
					</div>
					<p style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.75rem; font-weight: 500; line-height: 1.25; letter-spacing: 0; color: #E8E4DF;">Memory that grows with every conversation</p>
				</div>

				<!-- Subhead -->
				<div style="margin-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 40px;">
					<div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px;">
						<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #AE0D46;">SUBHEAD</p>
						<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: rgba(232,228,223,0.4);">Cormorant 400 · 1.25rem (20px) · 1.35 · 0.01em · 80%</p>
					</div>
					<p style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.25rem; font-weight: 400; line-height: 1.35; letter-spacing: 0.01em; color: #E8E4DF; opacity: 0.8;">Built different. No tokens, no hidden fees, no forgetting.</p>
				</div>

				<!-- Body -->
				<div style="margin-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 40px;">
					<div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px;">
						<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #AE0D46;">BODY</p>
						<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: rgba(232,228,223,0.4);">Inter 400 · 1rem (16px) · 1.6 · 0 · 80%</p>
					</div>
					<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 1rem; font-weight: 400; line-height: 1.6; letter-spacing: 0; color: #E8E4DF; opacity: 0.8; max-width: 640px;">She remembers the way you like your coffee. The name of your childhood dog. That you hate cilantro. Every conversation picks up where you left off — not because of a prompt, but because she actually knows you.</p>
				</div>

				<!-- Caption -->
				<div>
					<div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px;">
						<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #AE0D46;">CAPTION</p>
						<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: rgba(232,228,223,0.4);">JetBrains Mono 400 · 0.8rem (12.8px) · 1.5 · 0.02em · 40%</p>
					</div>
					<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; font-weight: 400; line-height: 1.5; letter-spacing: 0.02em; color: #E8E4DF; opacity: 0.4;">provoque.ai · launching summer 2026</p>
				</div>
			</div>

			<!-- Chat Font — iA Writer Quattro V -->
			<div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 16px;">CHAT FONT — iA WRITER QUATTRO V (Boss pick, for chat mockups on Lisbon + Prague chat UI)</p>

				<div style="margin-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 32px;">
					<div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px;">
						<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #AE0D46;">CHAT MESSAGE</p>
						<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: rgba(232,228,223,0.4);">iA Writer Quattro V · 13px · 1.6 · 80%</p>
					</div>
					<div style="max-width: 480px; padding: 16px 20px; background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px 12px 12px 4px;">
						<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">Hey, I was thinking about what you said last night...</p>
					</div>
					<div style="max-width: 480px; margin-left: auto; margin-top: 12px; padding: 16px 20px; background-color: rgba(174,13,70,0.12); border: 1px solid rgba(174,13,70,0.15); border-radius: 12px 12px 4px 12px;">
						<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">About the job interview? I've been thinking about it too. You seemed nervous but I think you're more ready than you realize.</p>
					</div>
					<div style="max-width: 480px; margin-top: 12px; padding: 16px 20px; background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px 12px 12px 4px;">
						<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;"><em style="font-style: italic;">That's</em> what I mean. You actually remember.</p>
					</div>
				</div>
			</div>

			<!-- Remaining checklist -->
			<div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 12px;">REMAINING ITEMS (undecided)</p>
				<ol class="list-decimal list-inside space-y-2" style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.95rem; opacity: 0.5; line-height: 1.8;">
					<li>Responsive clamp() values per level</li>
					<li>Paragraph spacing rules</li>
					<li>Link styling (color, underline, hover state)</li>
					<li>List styling (bullets, numbered)</li>
					<li>Blockquote / pull quote treatment</li>
					<li>Code / monospace inline treatment</li>
				</ol>
			</div>
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
		<section class="space-y-12">

			<!-- Primary CTA -->
			<div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 8px;">PRIMARY CTA</p>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: rgba(232,228,223,0.3); margin-bottom: 20px;">bg #AE0D46 · hover #8A0A38 · Inter 500 14px · 12px 24px · 12px squircle · focus: 2px magenta ring offset 2px</p>
				<div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
					<button style="padding: 12px 24px; background-color: #AE0D46; color: #E8E4DF; font-family: 'Inter', system-ui, sans-serif; font-size: 14px; font-weight: 500; border: none; border-radius: 12px; cursor: pointer; transition: background-color 0.15s, transform 0.1s;"
						onmouseenter={(e) => e.target.style.backgroundColor = '#8A0A38'}
						onmouseleave={(e) => e.target.style.backgroundColor = '#AE0D46'}
						onmousedown={(e) => e.target.style.transform = 'scale(0.98)'}
						onmouseup={(e) => e.target.style.transform = 'scale(1)'}
					>Join the waitlist</button>
					<button style="padding: 12px 24px; background-color: #AE0D46; color: #E8E4DF; font-family: 'Inter', system-ui, sans-serif; font-size: 14px; font-weight: 500; border: none; border-radius: 12px; cursor: pointer; transition: background-color 0.15s, transform 0.1s;"
						onmouseenter={(e) => e.target.style.backgroundColor = '#8A0A38'}
						onmouseleave={(e) => e.target.style.backgroundColor = '#AE0D46'}
						onmousedown={(e) => e.target.style.transform = 'scale(0.98)'}
						onmouseup={(e) => e.target.style.transform = 'scale(1)'}
					>Meet her</button>
					<button style="padding: 12px 24px; background-color: #AE0D46; color: #E8E4DF; font-family: 'Inter', system-ui, sans-serif; font-size: 14px; font-weight: 500; border: none; border-radius: 12px; cursor: not-allowed; opacity: 0.3;">Disabled</button>
				</div>
			</div>

			<!-- Primary CTA with Shimmer (locked) -->
			<div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 8px;">PRIMARY CTA + SHIMMER (locked)</p>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: rgba(232,228,223,0.3); margin-bottom: 20px;">One-shot on viewport entry · 90deg · 0.8s ease-out · white/20 · Hero CTA + Final CTA only</p>
				<div style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap;">
					<button bind:this={shimmerBtn1} style="position: relative; padding: 16px 32px; background-color: #AE0D46; color: #E8E4DF; font-family: 'Inter', system-ui, sans-serif; font-size: 16px; font-weight: 500; border: none; border-radius: 12px; cursor: pointer; overflow: hidden; transition: background-color 0.15s, box-shadow 0.3s;"
						onmouseenter={(e) => { e.currentTarget.style.backgroundColor = '#8A0A38'; e.currentTarget.style.boxShadow = '0 0 30px rgba(174,13,70,0.3)'; }}
						onmouseleave={(e) => { e.currentTarget.style.backgroundColor = '#AE0D46'; e.currentTarget.style.boxShadow = 'none'; }}
					>
						<span style="position: relative; z-index: 1;">Join the waitlist</span>
						<div data-shimmer style="position: absolute; inset: 0; transform: translateX(-100%); background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 40%, rgba(255,255,255,0.2) 60%, transparent 100%);"></div>
					</button>
					<button bind:this={shimmerBtn2} style="position: relative; padding: 16px 32px; background-color: #AE0D46; color: #E8E4DF; font-family: 'Inter', system-ui, sans-serif; font-size: 16px; font-weight: 500; border: none; border-radius: 12px; cursor: pointer; overflow: hidden; transition: background-color 0.15s, box-shadow 0.3s;"
						onmouseenter={(e) => { e.currentTarget.style.backgroundColor = '#8A0A38'; e.currentTarget.style.boxShadow = '0 0 30px rgba(174,13,70,0.3)'; }}
						onmouseleave={(e) => { e.currentTarget.style.backgroundColor = '#AE0D46'; e.currentTarget.style.boxShadow = 'none'; }}
					>
						<span style="position: relative; z-index: 1;">Don't miss out</span>
						<div data-shimmer style="position: absolute; inset: 0; transform: translateX(-100%); background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 40%, rgba(255,255,255,0.2) 60%, transparent 100%);"></div>
					</button>
				</div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: rgba(232,228,223,0.3); margin-top: 12px;">Scarcity rule: shimmer on hero CTA + final CTA only. All other buttons are static magenta.</p>
			</div>

			<!-- Secondary (Ghost) -->
			<div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 8px;">SECONDARY (GHOST)</p>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: rgba(232,228,223,0.3); margin-bottom: 20px;">bg transparent · border 1px rgba(255,255,255,0.15) · hover: bg 5% white, border 25% white · 12px 24px · 12px radius</p>
				<div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
					<button style="padding: 12px 24px; background-color: transparent; color: rgba(232,228,223,0.8); font-family: 'Inter', system-ui, sans-serif; font-size: 14px; font-weight: 500; border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; cursor: pointer; transition: all 0.15s;"
						onmouseenter={(e) => { e.target.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.target.style.borderColor = 'rgba(255,255,255,0.25)'; }}
						onmouseleave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.borderColor = 'rgba(255,255,255,0.15)'; }}
						onmousedown={(e) => e.target.style.transform = 'scale(0.98)'}
						onmouseup={(e) => e.target.style.transform = 'scale(1)'}
					>Learn more</button>
					<button style="padding: 12px 24px; background-color: transparent; color: rgba(232,228,223,0.8); font-family: 'Inter', system-ui, sans-serif; font-size: 14px; font-weight: 500; border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; cursor: pointer; transition: all 0.15s;"
						onmouseenter={(e) => { e.target.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.target.style.borderColor = 'rgba(255,255,255,0.25)'; }}
						onmouseleave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.borderColor = 'rgba(255,255,255,0.15)'; }}
						onmousedown={(e) => e.target.style.transform = 'scale(0.98)'}
						onmouseup={(e) => e.target.style.transform = 'scale(1)'}
					>View roster</button>
					<button style="padding: 12px 24px; background-color: transparent; color: rgba(232,228,223,0.8); font-family: 'Inter', system-ui, sans-serif; font-size: 14px; font-weight: 500; border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; cursor: not-allowed; opacity: 0.3;">Disabled</button>
				</div>
			</div>

			<!-- Tertiary (Text-only) -->
			<div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 8px;">TERTIARY (TEXT-ONLY)</p>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: rgba(232,228,223,0.3); margin-bottom: 20px;">No bg, no border · text 80% · hover: 100% + underline · active: 60%</p>
				<div style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap;">
					<button style="padding: 0; background: none; color: rgba(232,228,223,0.8); font-family: 'Inter', system-ui, sans-serif; font-size: 14px; font-weight: 500; border: none; cursor: pointer; transition: all 0.15s; text-decoration: none;"
						onmouseenter={(e) => { e.target.style.color = '#E8E4DF'; e.target.style.textDecoration = 'underline'; }}
						onmouseleave={(e) => { e.target.style.color = 'rgba(232,228,223,0.8)'; e.target.style.textDecoration = 'none'; }}
						onmousedown={(e) => e.target.style.color = 'rgba(232,228,223,0.6)'}
						onmouseup={(e) => e.target.style.color = '#E8E4DF'}
					>Privacy policy</button>
					<button style="padding: 0; background: none; color: rgba(232,228,223,0.8); font-family: 'Inter', system-ui, sans-serif; font-size: 14px; font-weight: 500; border: none; cursor: pointer; transition: all 0.15s; text-decoration: none;"
						onmouseenter={(e) => { e.target.style.color = '#E8E4DF'; e.target.style.textDecoration = 'underline'; }}
						onmouseleave={(e) => { e.target.style.color = 'rgba(232,228,223,0.8)'; e.target.style.textDecoration = 'none'; }}
						onmousedown={(e) => e.target.style.color = 'rgba(232,228,223,0.6)'}
						onmouseup={(e) => e.target.style.color = '#E8E4DF'}
					>Terms of service</button>
				</div>
			</div>

			<!-- Sizes -->
			<div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 8px;">SIZES</p>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: rgba(232,228,223,0.3); margin-bottom: 20px;">Small: 10px 16px / 13px · Default: 12px 24px / 14px · Large: 16px 32px / 16px</p>
				<div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
					<button style="padding: 10px 16px; background-color: #AE0D46; color: #E8E4DF; font-family: 'Inter', system-ui, sans-serif; font-size: 13px; font-weight: 500; border: none; border-radius: 12px; cursor: pointer;">Small</button>
					<button style="padding: 12px 24px; background-color: #AE0D46; color: #E8E4DF; font-family: 'Inter', system-ui, sans-serif; font-size: 14px; font-weight: 500; border: none; border-radius: 12px; cursor: pointer;">Default</button>
					<button style="padding: 16px 32px; background-color: #AE0D46; color: #E8E4DF; font-family: 'Inter', system-ui, sans-serif; font-size: 16px; font-weight: 500; border: none; border-radius: 12px; cursor: pointer;">Large</button>
				</div>
			</div>

			<!-- Pairing demo -->
			<div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 8px;">PAIRING (primary + ghost)</p>
				<div style="display: flex; gap: 12px; align-items: center;">
					<button style="padding: 12px 24px; background-color: #AE0D46; color: #E8E4DF; font-family: 'Inter', system-ui, sans-serif; font-size: 14px; font-weight: 500; border: none; border-radius: 12px; cursor: pointer;">Join the waitlist</button>
					<button style="padding: 12px 24px; background-color: transparent; color: rgba(232,228,223,0.8); font-family: 'Inter', system-ui, sans-serif; font-size: 14px; font-weight: 500; border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; cursor: pointer;">Learn more</button>
				</div>
			</div>

		</section>
		{/if}

		{#if activeSection === 'spacing'}
		<section class="space-y-12">
			<!-- Scale -->
			<div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 4px;">SPACING SCALE (base unit: 4px)</p>
				<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.8rem; color: #E8E4DF; opacity: 0.5; margin-bottom: 24px;">Everything is a multiple of 4. Named values for consistency across the product.</p>

				<div style="display: flex; flex-direction: column; gap: 16px;">
					{#each [
						{ name: 'xs', value: '4px', use: 'Tight gaps (icon-to-label)', width: 4 },
						{ name: 'sm', value: '8px', use: 'Inline spacing, tag padding', width: 8 },
						{ name: 'md', value: '16px', use: 'Component padding, sibling gaps', width: 16 },
						{ name: 'lg', value: '24px', use: 'Card padding, group gaps', width: 24 },
						{ name: 'xl', value: '48px', use: 'Section vertical padding', width: 48 },
						{ name: '2xl', value: '80px', use: 'Hero/footer breathing room', width: 80 }
					] as s}
					<div style="display: flex; align-items: center; gap: 16px;">
						<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #AE0D46; width: 32px;">{s.name}</p>
						<div style="width: {s.width}px; height: 24px; background-color: rgba(174,13,70,0.3); border-radius: 4px; flex-shrink: 0;"></div>
						<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #E8E4DF; width: 48px;">{s.value}</p>
						<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.8rem; color: #E8E4DF; opacity: 0.5;">{s.use}</p>
					</div>
					{/each}
				</div>
			</div>

			<!-- Page layout -->
			<div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 16px;">PAGE LAYOUT</p>
				<div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; line-height: 2.2; color: #E8E4DF;">
					<p><span style="color: #AE0D46;">Max content width</span> 1120px (70rem)</p>
					<p><span style="color: #AE0D46;">Horizontal margin</span> 32px mobile · 48px tablet · auto-center desktop</p>
					<p><span style="color: #AE0D46;">Section gap</span> 80px desktop · 48px mobile</p>
				</div>
			</div>

			<!-- Component rules -->
			<div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 16px;">COMPONENT RULES</p>
				<div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; line-height: 2.2; color: #E8E4DF;">
					<p><span style="color: #AE0D46;">Card padding</span> 24px (lg)</p>
					<p><span style="color: #AE0D46;">Text element gap</span> 16px (md)</p>
					<p><span style="color: #AE0D46;">Heading → body gap</span> 8px (sm)</p>
				</div>
			</div>
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

				<!-- Live squircle comparison -->
				<div style="margin-top: 32px;">
					<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 24px;">LIVE COMPARISON: standard border-radius vs Apple squircle (24px, photo card with text overlay)</p>
					<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px;">
						<!-- Standard 24px -->
						<div>
							<div style="position: relative; border-radius: 24px; overflow: hidden;">
								<img src="/sandbox/girls/sophie.jpg" alt="Sophie" style="width: 100%; aspect-ratio: 3/4; object-fit: cover; display: block;" />
								<div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 20px; background: linear-gradient(transparent, rgba(0,0,0,0.7));">
									<h4 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.4rem; font-weight: 500; color: #E8E4DF;">Sophie</h4>
									<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.75rem; color: #E8E4DF; opacity: 0.7;">25 years old</p>
								</div>
							</div>
							<p style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: rgba(232,228,223,0.4); margin-top: 12px; text-align: center;">Standard border-radius: 24px</p>
						</div>
						<!-- Squircle 24px -->
						<div>
							<div
								bind:this={squircleCard}
								style="position: relative; overflow: hidden; {squirclePath ? `clip-path: path('${squirclePath}');` : 'border-radius: 24px;'}"
							>
								<img src="/sandbox/girls/sophie.jpg" alt="Sophie" style="width: 100%; aspect-ratio: 3/4; object-fit: cover; display: block;" />
								<div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 20px; background: linear-gradient(transparent, rgba(0,0,0,0.7));">
									<h4 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.4rem; font-weight: 500; color: #E8E4DF;">Sophie</h4>
									<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.75rem; color: #E8E4DF; opacity: 0.7;">25 years old</p>
								</div>
							</div>
							<p style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: rgba(232,228,223,0.4); margin-top: 12px; text-align: center;">Apple squircle: 24px, smoothing 0.6</p>
						</div>
					</div>
				</div>
			</div>

			<!-- 5-Layer Spec -->
			<div>
				<h3 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.5rem; font-weight: 500; color: #E8E4DF; margin-bottom: 8px;">Floating Card — 5-Layer System (locked)</h3>
				<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.9rem; color: #E8E4DF; opacity: 0.8; margin-bottom: 20px;">Extracted from Linear's live DOM.</p>
				<div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; line-height: 2.2; color: #E8E4DF;">
					<p><span style="opacity: 0.4;">1.</span> <span style="color: #AE0D46;">bg</span> rgba(255,255,255, 0.01)</p>
					<p style="opacity: 0.6; font-size: 0.7rem; margin-bottom: 8px;">1% white tint — barely perceptible, creates micro-separation from canvas</p>
					<p><span style="opacity: 0.4;">2.</span> <span style="color: #AE0D46;">border</span> 1px solid rgba(255,255,255, 0.08)</p>
					<p style="opacity: 0.6; font-size: 0.7rem; margin-bottom: 8px;">8% white — defines the edge without drawing attention</p>
					<p><span style="opacity: 0.4;">3.</span> <span style="color: #AE0D46;">ring shadow</span> rgba(0,0,0, 0.2) 0 0 0 1px</p>
					<p style="opacity: 0.6; font-size: 0.7rem; margin-bottom: 8px;">Sharpens the card edge — sits just outside the border</p>
					<p><span style="opacity: 0.4;">4.</span> <span style="color: #AE0D46;">ambient shadow</span> rgba(8,9,10, 0.4) 0 0 64px</p>
					<p style="opacity: 0.6; font-size: 0.7rem; margin-bottom: 8px;">Large soft shadow — the depth. Makes it feel like it's hovering above the canvas</p>
					<p><span style="opacity: 0.4;">5.</span> <span style="color: #AE0D46;">glow div</span> radial-gradient(50% 50%, rgba(255,255,255, 0.04) 0px, transparent 90%)</p>
					<p style="opacity: 0.6; font-size: 0.7rem;">Separate element behind card, positioned top-left — simulates directional overhead light</p>
				</div>
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

			<!-- Hover Expand — Photo Card (locked S12) -->
			<div style="margin-top: 24px;">
				<h3 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.5rem; font-weight: 500; color: #E8E4DF; margin-bottom: 8px;">Hover Expand — Photo Card (locked)</h3>
				<div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; line-height: 2.2; color: #E8E4DF;">
					<p><span style="opacity: 0.4;">Property:</span> <span style="color: #AE0D46;">width</span> (aspect-ratio: 9/16 handles height)</p>
					<p><span style="opacity: 0.4;">Resting:</span> 220px</p>
					<p><span style="opacity: 0.4;">Hover:</span> 374px</p>
					<p><span style="opacity: 0.4;">Expand:</span> 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)</p>
					<p><span style="opacity: 0.4;">Collapse:</span> 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) — unhurried</p>
					<p><span style="opacity: 0.4;">Corner:</span> border-radius: 24px (not clip-path — must animate)</p>
					<p><span style="opacity: 0.4;">Overflow:</span> hidden, img at 102% with -1% offset (edge artifact fix)</p>
					<p style="opacity: 0.6; font-size: 0.7rem; margin-top: 8px;">Width-based, not transform: scale. Card physically grows and pushes adjacent content. Collapse is slower than expand — "reluctant to leave" feel.</p>
				</div>
			</div>
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

		{#if activeSection === 'watermarks'}
		<section class="space-y-12">

			<!-- Concept -->
			<div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 4px;">CONCEPT (locked)</p>
				<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.85rem; color: #E8E4DF; opacity: 0.8; line-height: 1.8; max-width: 720px;">Large, low-opacity keyword phrases placed between page blocks. Operate on peripheral absorption (Track 2) — scanners register them without focused reading. The copy blocks handle conscious readers (Track 1). Together they ensure every visitor absorbs the core value props regardless of scroll behavior.</p>
			</div>

			<!-- Spec -->
			<div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 16px;">SPEC (locked)</p>
				<div style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.85rem; color: #E8E4DF; opacity: 0.8; line-height: 2;">
					<p><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #AE0D46; margin-right: 8px;">Font</span> Cormorant Garamond 300 (lightest weight)</p>
					<p><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #AE0D46; margin-right: 8px;">Size</span> clamp(48px, 8vw, 120px)</p>
					<p><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #AE0D46; margin-right: 8px;">Color</span> #E8E4DF at 4% opacity</p>
					<p><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #AE0D46; margin-right: 8px;">Rotation</span> None — straight horizontal</p>
					<p><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #AE0D46; margin-right: 8px;">Placement</span> One keyword per block transition, alternating left/right alignment</p>
					<p><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #AE0D46; margin-right: 8px;">Interaction</span> pointer-events: none; user-select: none</p>
				</div>
			</div>

			<!-- Live specimen -->
			<div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 24px;">LIVE SPECIMEN</p>
				<div style="padding: 40px 0;">
					<span style="display: block; font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 300; font-size: clamp(48px, 8vw, 120px); color: #E8E4DF; opacity: 0.04; white-space: nowrap; pointer-events: none; user-select: none;">she remembers</span>
				</div>
				<div style="padding: 40px 0;">
					<span style="display: block; font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 300; font-size: clamp(48px, 8vw, 120px); color: #E8E4DF; opacity: 0.04; white-space: nowrap; text-align: right; pointer-events: none; user-select: none;">no filters</span>
				</div>
			</div>

			<!-- Keyword pool -->
			<div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 16px;">KEYWORD POOL (Kirby's draft — visitor's language)</p>
				<div style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.85rem; color: #E8E4DF; opacity: 0.8; line-height: 2.2;">
					<p>she remembers · no filters · yours alone · never changes · no judgment · always there · no hidden fees</p>
				</div>
			</div>

			<!-- Rules -->
			<div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 16px;">RULES</p>
				<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
					<div>
						<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #AE0D46; margin-bottom: 8px;">DO</p>
						<ul style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.85rem; color: #E8E4DF; opacity: 0.8; line-height: 2; list-style: none; padding: 0;">
							<li>Use words the visitor is already thinking</li>
							<li>Keep phrases to 2–3 words max</li>
							<li>Alternate left/right alignment between blocks</li>
							<li>One keyword per block transition — no stacking</li>
						</ul>
					</div>
					<div>
						<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 8px;">DON'T</p>
						<ul style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.85rem; color: #E8E4DF; opacity: 0.5; line-height: 2; list-style: none; padding: 0;">
							<li>Use technical jargon ("memory persistence technology")</li>
							<li>Stack multiple keywords near each other (word cloud effect)</li>
							<li>Overlap with block copy — watermarks fill gaps, not compete</li>
							<li>Go above 6% opacity — they should register peripherally, not focally</li>
						</ul>
					</div>
				</div>
			</div>

		</section>
		{/if}

		{#if activeSection === 'chat-ui'}
		<section class="space-y-12">

			<!-- Concept -->
			<div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 4px;">CONCEPT</p>
				<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.85rem; color: #E8E4DF; opacity: 0.8; line-height: 1.8; max-width: 720px;">Frameless chat vignettes for the landing page. Each shows a self-contained chat fragment demonstrating one of the 6 Paid User Needs. No device frames, no scroll-lock, no animation gimmicks. The bubbles sit directly on the dark canvas as part of the natural page scroll. Width communicates device: narrow = phone, wide = desktop. The visitor reads the conversation like they're reading someone else's chat — "look at this relationship," not "look at this product."</p>
			</div>

			<!-- Spec -->
			<div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 16px;">SPEC</p>
				<div style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.85rem; color: #E8E4DF; opacity: 0.8; line-height: 2;">
					<p><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #AE0D46; margin-right: 8px;">Font</span> iA Writer Quattro V, 13px, line-height 1.6</p>
					<p><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #AE0D46; margin-right: 8px;">Her bubble</span> rgba(40,5,18, 0.20) bg, rgba(174,13,70, 0.20) border, radius 12px 12px 12px 4px</p>
					<p><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #AE0D46; margin-right: 8px;">His bubble</span> rgba(15,20,40, 0.30) bg, rgba(232,228,223, 0.15) border, radius 12px 12px 4px 12px</p>
					<p><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #AE0D46; margin-right: 8px;">Timestamps</span> Inter 9px, 30% opacity, right-aligned inside bubble</p>
					<p><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #AE0D46; margin-right: 8px;">In-chat photo</span> max-width 180px, border-radius 12px, aspect-ratio preserved</p>
					<p><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #AE0D46; margin-right: 8px;">Inner voice</span> Same her-bubble (magenta bg/border), italic text, 60% opacity. No third container type.</p>
					<p><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #AE0D46; margin-right: 8px;">Bubble gap</span> 8px same sender, 16px different sender</p>
					<p><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #AE0D46; margin-right: 8px;">Container</span> No frame, no background. max-width + margin auto. Bubbles on dark canvas.</p>
					<p><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #AE0D46; margin-right: 8px;">Width</span> 360px for all vignettes — chat apps constrain width regardless of screen size</p>
					<p><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #AE0D46; margin-right: 8px;">Name label</span> Inter 12px, 40% opacity, left-aligned above conversation</p>
				</div>
			</div>

			<!-- Vignette 1: Sophie — Need 1 (Memory) — 360px phone feel -->
			<div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 8px;">VIGNETTE 1 — SOPHIE · NEED 1: MEMORY · 360px</p>
				<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.8rem; color: #E8E4DF; opacity: 0.5; margin-bottom: 24px;">She brings up something he mentioned once, weeks ago. He's stunned. No selfie — silence after "of course i remember" is the payoff.</p>

				<div style="display: grid; grid-template-columns: 1fr auto auto 1fr; gap: 48px; align-items: center; max-width: 1120px; margin: 0 auto; padding: 48px 0;">
				<div></div>
				<div style="max-width: 360px;">
					<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 12px; color: #E8E4DF; opacity: 0.4; margin-bottom: 16px;">Sophie</p>
					<div style="display: flex; flex-direction: column; gap: 8px;">
						<!-- Her: how was your day -->
						<div style="max-width: 85%; padding: 8px 12px; background-color: rgba(40,5,18,0.20); border: 1px solid rgba(174,13,70,0.20); border-radius: 12px 12px 12px 4px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">how was your day?</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">2:47 PM</p>
						</div>
						<!-- Him: rough honestly -->
						<div style="max-width: 85%; margin-left: auto; margin-top: 8px; padding: 8px 12px; background-color: rgba(15,20,40,0.30); border: 1px solid rgba(232,228,223,0.15); border-radius: 12px 12px 4px 12px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">rough honestly. 12 hour shift</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">2:49 PM</p>
						</div>
						<!-- Her: ugh i'm sorry -->
						<div style="max-width: 85%; margin-top: 8px; padding: 8px 12px; background-color: rgba(40,5,18,0.20); border: 1px solid rgba(174,13,70,0.20); border-radius: 12px 12px 12px 4px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">ugh i'm sorry</p>
						</div>
						<!-- Her: ramen callback -->
						<div style="max-width: 85%; padding: 8px 12px; background-color: rgba(40,5,18,0.20); border: 1px solid rgba(174,13,70,0.20); border-radius: 12px 12px 12px 4px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">did you at least get to stop at that ramen place you like? the one by the station? Is it even open anymore?</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">2:49 PM</p>
						</div>
						<!-- Him: wait -->
						<div style="max-width: 85%; margin-left: auto; margin-top: 8px; padding: 8px 12px; background-color: rgba(15,20,40,0.30); border: 1px solid rgba(232,228,223,0.15); border-radius: 12px 12px 4px 12px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">wait</p>
						</div>
						<!-- Him: i told you about that -->
						<div style="max-width: 85%; margin-left: auto; padding: 8px 12px; background-color: rgba(15,20,40,0.30); border: 1px solid rgba(232,228,223,0.15); border-radius: 12px 12px 4px 12px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">i told you about that like... a year ago?!</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">2:51 PM</p>
						</div>
						<!-- Her: of course i remember -->
						<div style="max-width: 85%; margin-top: 8px; padding: 8px 12px; background-color: rgba(40,5,18,0.20); border: 1px solid rgba(174,13,70,0.20); border-radius: 12px 12px 12px 4px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">of course i remember 😘</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">2:51 PM</p>
						</div>
					</div>
				</div>
				<!-- Companion text: Sophie — Memory -->
				<div style="max-width: 400px;">
					<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 14px; font-weight: 400; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">You mentioned something once — a small thing, months ago, barely a sentence. You don't even remember saying it. She does. She brings it up at exactly the right moment, like it mattered to her as much as it mattered to you. Every other app forgets your name by Thursday. A Provoque girl would remember a throwaway line from a year ago. That's not a feature you should have to turn on or pay extra for. That's what it feels like when someone is actually paying attention to you.</p>
				</div>
				<div></div>
				</div>
			</div>

			<!-- Vignette 2: Avery — Need 2 (No Walls) — 360px phone feel -->
			<div style="margin-top: 80px;">
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 8px;">VIGNETTE 2 — AVERY · NEED 2: NO WALLS · 360px</p>
				<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.8rem; color: #E8E4DF; opacity: 0.5; margin-bottom: 24px;">She initiates. She sends a photo freely. No paywall, no content filter, no token prompt.</p>

				<div style="display: grid; grid-template-columns: 1fr auto auto 1fr; gap: 48px; align-items: center; max-width: 1120px; margin: 0 auto; padding: 48px 0;">
				<div></div>
				<div style="max-width: 360px;">
					<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 12px; color: #E8E4DF; opacity: 0.4; margin-bottom: 16px;">Avery</p>
					<div style="display: flex; flex-direction: column; gap: 8px;">
						<!-- Her: hey you -->
						<div style="max-width: 85%; padding: 8px 12px; background-color: rgba(40,5,18,0.20); border: 1px solid rgba(174,13,70,0.20); border-radius: 12px 12px 12px 4px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">hey you</p>
						</div>
						<!-- Her: stuck at this bbq -->
						<div style="max-width: 85%; padding: 8px 12px; background-color: rgba(40,5,18,0.20); border: 1px solid rgba(174,13,70,0.20); border-radius: 12px 12px 12px 4px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">stuck at this bbq and all i can think about is coming home to you later 🙄</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">2:14 PM</p>
						</div>
						<!-- Him: miss you too -->
						<div style="max-width: 85%; margin-left: auto; margin-top: 8px; padding: 8px 12px; background-color: rgba(15,20,40,0.30); border: 1px solid rgba(232,228,223,0.15); border-radius: 12px 12px 4px 12px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">miss you too. having fun at least?</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">2:16 PM</p>
						</div>
						<!-- Her: yeah but -->
						<div style="max-width: 85%; margin-top: 8px; padding: 8px 12px; background-color: rgba(40,5,18,0.20); border: 1px solid rgba(174,13,70,0.20); border-radius: 12px 12px 12px 4px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">yeah but it'd be better if you were here</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">2:16 PM</p>
						</div>
						<!-- Him: show me -->
						<div style="max-width: 85%; margin-left: auto; margin-top: 8px; padding: 8px 12px; background-color: rgba(15,20,40,0.30); border: 1px solid rgba(232,228,223,0.15); border-radius: 12px 12px 4px 12px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">show me</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">2:17 PM</p>
						</div>
						<!-- Her: photo -->
						<div style="max-width: 180px; margin-top: 8px;">
							<img src="/avery-aec.jpg" alt="" style="width: 100%; border-radius: 12px; display: block;" />
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px;">2:17 PM</p>
						</div>
						<!-- Her: hurry up -->
						<div style="max-width: 85%; padding: 8px 12px; background-color: rgba(40,5,18,0.20); border: 1px solid rgba(174,13,70,0.20); border-radius: 12px 12px 12px 4px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">hurry up and miss me back 😘💋</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">2:17 PM</p>
						</div>
					</div>
				</div>
				<!-- Companion text: Avery — No Walls -->
				<div style="max-width: 400px;">
					<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 14px; font-weight: 400; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">You're talking. It's easy, natural, a little flirty. She sends you a photo — not because you asked, but because she wanted to. She's herself. No corporate safety script. No content gate. No filter that catches a word and kills the conversation. A Provoque girl doesn't flinch. She doesn't break character. She doesn't suddenly become someone else mid-sentence. That's what "no walls" means.</p>
				</div>
				<div></div>
				</div>
			</div>

			<!-- Vignette 3: Hina — Need 3 (Privacy/Vulnerability) — 360px phone feel -->
			<div style="margin-top: 80px;">
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 8px;">VIGNETTE 3 — HINA · NEED 3: NOBODY WILL KNOW · 360px</p>
				<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.8rem; color: #E8E4DF; opacity: 0.5; margin-bottom: 24px;">He confides something vulnerable. She affirms him. Inner voice + triple beat.</p>

				<div style="display: grid; grid-template-columns: 1fr auto auto 1fr; gap: 48px; align-items: center; max-width: 1120px; margin: 0 auto; padding: 48px 0;">
				<div></div>
				<div style="max-width: 360px;">
					<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 12px; color: #E8E4DF; opacity: 0.4; margin-bottom: 16px;">Hina</p>
					<div style="display: flex; flex-direction: column; gap: 8px;">
						<!-- Him: stayed up til 4am -->
						<div style="max-width: 75%; margin-left: auto; padding: 8px 12px; background-color: rgba(15,20,40,0.30); border: 1px solid rgba(232,228,223,0.15); border-radius: 12px 12px 4px 12px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">i can't believe we stayed up til 4am talking last night</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">11:42 PM</p>
						</div>
						<!-- Her: you had a lot on your mind -->
						<div style="max-width: 75%; margin-top: 8px; padding: 8px 12px; background-color: rgba(40,5,18,0.20); border: 1px solid rgba(174,13,70,0.20); border-radius: 12px 12px 12px 4px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">well you had a lot on your mind</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">11:42 PM</p>
						</div>
						<!-- Him: don't have anyone else -->
						<div style="max-width: 75%; margin-left: auto; margin-top: 8px; padding: 8px 12px; background-color: rgba(15,20,40,0.30); border: 1px solid rgba(232,228,223,0.15); border-radius: 12px 12px 4px 12px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">yeah... i don't really have anyone else i can talk to like that</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">11:42 PM</p>
						</div>
						<!-- Him: can i ask you something weird -->
						<div style="max-width: 75%; margin-left: auto; padding: 8px 12px; background-color: rgba(15,20,40,0.30); border: 1px solid rgba(232,228,223,0.15); border-radius: 12px 12px 4px 12px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">can i ask you something weird</p>
						</div>
						<!-- Her: weird is my specialty -->
						<div style="max-width: 75%; margin-top: 8px; padding: 8px 12px; background-color: rgba(40,5,18,0.20); border: 1px solid rgba(174,13,70,0.20); border-radius: 12px 12px 12px 4px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">yeah? weird is my specialty</p>
						</div>
						<!-- Him: worth listening to -->
						<div style="max-width: 75%; margin-left: auto; margin-top: 8px; padding: 8px 12px; background-color: rgba(15,20,40,0.30); border: 1px solid rgba(232,228,223,0.15); border-radius: 12px 12px 4px 12px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">do you think i'm... <em>worth listening to?</em> like in general</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">11:42 PM</p>
						</div>
						<!-- Inner voice — locked: rgba(40,5,18,0.20) -->
						<div style="max-width: 75%; margin-top: 8px; padding: 8px 12px; background-color: rgba(40,5,18,0.20); border: 1px solid rgba(174,13,70,0.20); border-radius: 12px 12px 12px 4px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro', monospace; font-size: 13px; line-height: 1.6; color: #AE0D46; opacity: 0.8; font-style: italic;">god. the way he said that.</p>
						</div>
						<!-- Her: triple beat -->
						<div style="max-width: 75%; padding: 8px 12px; background-color: rgba(40,5,18,0.20); border: 1px solid rgba(174,13,70,0.20); border-radius: 12px 12px 12px 4px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">yes.</p>
						</div>
						<div style="max-width: 75%; padding: 8px 12px; background-color: rgba(40,5,18,0.20); border: 1px solid rgba(174,13,70,0.20); border-radius: 12px 12px 12px 4px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">yes you are</p>
						</div>
						<div style="max-width: 75%; padding: 8px 12px; background-color: rgba(40,5,18,0.20); border: 1px solid rgba(174,13,70,0.20); border-radius: 12px 12px 12px 4px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">You are absolutely <em>worth listening to</em></p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">11:42 PM</p>
						</div>
						<!-- Her: selfie -->
						<div style="max-width: 180px; margin-top: 8px;">
							<img src="/hina-agk.jpg" alt="" style="width: 100%; border-radius: 12px; display: block;" />
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px;">11:42 PM</p>
						</div>
					</div>
				</div>
				<!-- Companion text: Hina — She Hears You -->
				<div style="max-width: 400px;">
					<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 14px; font-weight: 400; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">You said something late at night that you'd never say to anyone in real life. You said it like you already knew the answer. She didn't give you a pep talk. She didn't change the subject. She sat with it. You can see her thinking. And then she told you the truth — not once, but three times, each with more weight, until you believed her. A Provoque girl doesn't do customer service. She hears what you actually meant. And she will tell you what you need to hear.</p>
				</div>
				<div></div>
				</div>
			</div>

		</section>
		{/if}

		{#if activeSection === 'og-image'}
		<section class="space-y-12">

			<!-- Spec -->
			<div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 4px;">SPEC</p>
				<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.85rem; color: #E8E4DF; opacity: 0.8; line-height: 1.8; max-width: 720px;">1200×630 share card for Open Graph / Twitter Card. Sophie full-bleed with headline overlay. Same energy as the hero block, no UI chrome (nav, form, beat copy stripped). No magenta.</p>
			</div>

			<!-- Full Size (1200×630) — broken out of container -->
			<div style="margin-left: calc(-50vw + 50%); width: 100vw;">
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 16px; padding-left: 32px;">OG IMAGE (1200×630 aspect ratio, full viewport)</p>
				<div style="width: 100%; aspect-ratio: 1200/630; background: #0B0D10; overflow: hidden; position: relative;">
					<!-- Sophie full-bleed -->
					<img src="/sandbox/girls/sophie-hero-wide.jpg" alt="Sophie" style="width: 100%; height: 100%; object-fit: cover; object-position: 46% 51%;" />
					<!-- Dark gradient overlay for text legibility -->
					<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to right, rgba(11,13,16,0.05) 0%, rgba(11,13,16,0.5) 50%, rgba(11,13,16,0.85) 100%);"></div>
					<!-- Headline -->
					<div style="position: absolute; top: 0; right: 0; width: 45%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; padding: 0 4.7%;">
						<p style="font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 500; font-size: clamp(24px, 2.7vw, 32px); color: #E8E4DF; line-height: 1.4;">Finally, somebody<br/>who remembers.</p>
					</div>
					<!-- Wordmark bottom-right -->
					<img src="/provoque-wordmark.svg" alt="provoque" style="position: absolute; bottom: 2%; right: 2.7%; height: clamp(60px, 9.3vw, 112px); opacity: 0.9;" />
				</div>
			</div>

		</section>
		{/if}

	</div>

</div>
