<script>
	import { onMount } from 'svelte';
	import { getSvgPath } from 'figma-squircle';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let activeSection = $state(null);
	let squircleCard;
	let squirclePath = $state('');
	let promiseCardPath = $state('');
	let shimmerBtn1;
	let shimmerBtn2;

	const rosterGirls = [
		// Row 1 (clipped top)
		{ name: 'Yuna', age: 21, hearts: '9.1K', chats: '5.8M', bg: '#2D1F2E' },
		{ name: 'Mila', age: 23, hearts: '12.4K', chats: '7.3M', bg: '#1F2D2E' },
		{ name: 'Priya', age: 20, hearts: '10.7K', chats: '6.1M', bg: '#2E2D1F' },
		{ name: 'Katya', age: 24, hearts: '11.3K', chats: '6.9M', bg: '#1F2E2A' },
		// Row 2 (full — real girls)
		{ name: 'Valentina', age: 22, hearts: '9.8K', chats: '5.4M', bg: '#2E1F27', img: '/valentina-add.jpg' },
		{ name: 'Jiwoo', age: 21, hearts: '13.1K', chats: '8.2M', bg: '#2A1F2E', img: '/jiwoo-adq.jpg' },
		{ name: 'Avery', age: 24, hearts: '10.2K', chats: '6.7M', bg: '#1F2E1F', img: '/avery-adx.jpg' },
		{ name: 'Sophie', age: 24, hearts: '11.9K', chats: '7.1M', bg: '#2E261F', img: '/sophie-aeq.jpg' },
		// Row 3 (full — real girls)
		{ name: 'Sara', age: 23, hearts: '9.4K', chats: '5.6M', bg: '#2E2A1F', img: '/sara-afb.jpg' },
		{ name: 'Nadia', age: 23, hearts: '12.8K', chats: '7.9M', bg: '#1F272E', img: '/nadia-afr.jpg' },
		{ name: 'Hina', age: 22, hearts: '10.5K', chats: '6.3M', bg: '#2E1F1F', img: '/hina-age.jpg' },
		{ name: 'Adaeze', age: 23, hearts: '11.6K', chats: '7.4M', bg: '#1F2E28', img: '/adaeze-agw.jpg' },
		// Row 4 (clipped bottom)
		{ name: 'Naomi', age: 22, hearts: '10.9K', chats: '6.5M', bg: '#2D2E1F' },
		{ name: 'Zara', age: 21, hearts: '9.7K', chats: '5.9M', bg: '#1F2B2E' },
		{ name: 'Aya', age: 20, hearts: '10.1K', chats: '6.2M', bg: '#2E1F25' },
		{ name: 'Lena', age: 23, hearts: '11.2K', chats: '7.0M', bg: '#252E1F' },
	];


	function averyScrollLock(node) {
		let tl;

		const timer = setTimeout(() => {
			gsap.registerPlugin(ScrollTrigger);

			const chatViewport = node.querySelector('.avery-chat-viewport');
			const chatContent = node.querySelector('.avery-chat-content');

			if (!chatViewport || !chatContent) return;

			const viewportHeight = chatViewport.offsetHeight;
			const contentHeight = chatContent.scrollHeight;
			const maxScroll = Math.max(0, contentHeight - viewportHeight);

			if (maxScroll <= 0) return;

			tl = gsap.timeline({
				scrollTrigger: {
					trigger: node,
					pin: true,
					start: 'top top',
					end: '+=400%',
					scrub: 0.8,
				}
			});

			// Dwell at start — visitor sees phone, reads first messages
			tl.to({}, { duration: 0.5 });
			// Scroll through to "show me" (~60%)
			tl.to(chatContent, { y: -(maxScroll * 0.6), duration: 1.5, ease: 'none' });
			// Dwell — "show me" hangs in the air
			tl.to({}, { duration: 0.5 });
			// Scroll to selfie + final message
			tl.to(chatContent, { y: -maxScroll, duration: 1.5, ease: 'none' });
			// Force stop — hold before releasing to next vignette
			tl.to({}, { duration: 0.8 });
		}, 200);

		return {
			destroy() {
				clearTimeout(timer);
				if (tl) {
					tl.scrollTrigger?.kill();
					tl.kill();
				}
			}
		};
	}

	function hinaScrollLock(node) {
		let tl;

		const timer = setTimeout(() => {
			gsap.registerPlugin(ScrollTrigger);

			const chatViewport = node.querySelector('.hina-chat-viewport');
			const chatContent = node.querySelector('.hina-chat-content');

			if (!chatViewport || !chatContent) return;

			const viewportHeight = chatViewport.offsetHeight;
			const contentHeight = chatContent.scrollHeight;
			const maxScroll = Math.max(0, contentHeight - viewportHeight);

			if (maxScroll <= 0) return;

			tl = gsap.timeline({
				scrollTrigger: {
					trigger: node,
					pin: true,
					start: 'top top',
					end: '+=400%',
					scrub: 0.8,
				}
			});

			// Dwell at start — visitor sees desktop, reads setup
			tl.to({}, { duration: 0.5 });
			// Scroll to "worth listening to?" cliffhanger (~40%)
			tl.to(chatContent, { y: -(maxScroll * 0.4), duration: 1.5, ease: 'none' });
			// Dwell — the question hangs
			tl.to({}, { duration: 0.6 });
			// Scroll through inner voice + triple beat + selfie
			tl.to(chatContent, { y: -maxScroll, duration: 1.5, ease: 'none' });
			// Force stop — hold before releasing
			tl.to({}, { duration: 0.8 });
		}, 200);

		return {
			destroy() {
				clearTimeout(timer);
				if (tl) {
					tl.scrollTrigger?.kill();
					tl.kill();
				}
			}
		};
	}

	function sophieScrollLock(node) {
		let tl;

		const timer = setTimeout(() => {
			gsap.registerPlugin(ScrollTrigger);

			const chatViewport = node.querySelector('.sophie-chat-viewport');
			const chatContent = node.querySelector('.sophie-chat-content');

			if (!chatViewport || !chatContent) return;

			const viewportHeight = chatViewport.offsetHeight;
			const contentHeight = chatContent.scrollHeight;
			const maxScroll = Math.max(0, contentHeight - viewportHeight);

			if (maxScroll <= 0) return;

			tl = gsap.timeline({
				scrollTrigger: {
					trigger: node,
					pin: true,
					start: 'top top',
					end: '+=400%',
					scrub: 0.8,
				}
			});

			// Dwell at start — visitor sees phone, reads first messages
			tl.to({}, { duration: 0.5 });
			// Scroll to "i told you about that like... a month ago" (~60%)
			tl.to(chatContent, { y: -(maxScroll * 0.6), duration: 1.5, ease: 'none' });
			// Dwell — his surprise hangs in the air
			tl.to({}, { duration: 0.6 });
			// Scroll to "of course i remember"
			tl.to(chatContent, { y: -maxScroll, duration: 1.5, ease: 'none' });
			// Force stop — hold before releasing
			tl.to({}, { duration: 0.8 });
		}, 200);

		return {
			destroy() {
				clearTimeout(timer);
				if (tl) {
					tl.scrollTrigger?.kill();
					tl.kill();
				}
			}
		};
	}

	function rulerTool(node) {
		let posA = 200, posB = 400;
		let dragging = null;

		// Create ruler A
		const rulerA = document.createElement('div');
		rulerA.style.cssText = 'position: fixed; top: 200px; left: 0; right: 0; z-index: 9999; cursor: ns-resize; user-select: none; pointer-events: auto;';
		rulerA.innerHTML = '<div style="height: 1px; background: #00FF88; box-shadow: 0 0 4px #00FF88;"></div><span style="position: absolute; left: 12px; top: 4px; font-family: JetBrains Mono, monospace; font-size: 11px; color: #00FF88; background: rgba(0,0,0,0.7); padding: 2px 6px; border-radius: 4px; pointer-events: none;">A: 200px</span>';

		// Create ruler B
		const rulerB = document.createElement('div');
		rulerB.style.cssText = 'position: fixed; top: 400px; left: 0; right: 0; z-index: 9999; cursor: ns-resize; user-select: none; pointer-events: auto;';
		rulerB.innerHTML = '<div style="height: 1px; background: #FF6B00; box-shadow: 0 0 4px #FF6B00;"></div><span style="position: absolute; left: 12px; top: 4px; font-family: JetBrains Mono, monospace; font-size: 11px; color: #FF6B00; background: rgba(0,0,0,0.7); padding: 2px 6px; border-radius: 4px; pointer-events: none;">B: 400px</span>';

		// Distance readout
		const distEl = document.createElement('div');
		distEl.style.cssText = 'position: fixed; right: 12px; top: 12px; z-index: 9999; font-family: JetBrains Mono, monospace; font-size: 13px; color: #E8E4DF; background: rgba(0,0,0,0.85); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15); pointer-events: none;';

		document.body.appendChild(rulerA);
		document.body.appendChild(rulerB);
		document.body.appendChild(distEl);

		function updateLabels() {
			const scrollY = window.scrollY;
			const absA = Math.round(posA + scrollY);
			const absB = Math.round(posB + scrollY);
			rulerA.querySelector('span').textContent = `A: ${absA}px`;
			rulerB.querySelector('span').textContent = `B: ${absB}px`;
			distEl.textContent = `Δ ${Math.abs(absB - absA)}px`;
		}

		rulerA.addEventListener('mousedown', (e) => { e.preventDefault(); dragging = 'a'; });
		rulerB.addEventListener('mousedown', (e) => { e.preventDefault(); dragging = 'b'; });

		function onMouseMove(e) {
			if (!dragging) return;
			const y = Math.max(0, Math.min(e.clientY, window.innerHeight));
			if (dragging === 'a') { posA = y; rulerA.style.top = y + 'px'; }
			else { posB = y; rulerB.style.top = y + 'px'; }
			updateLabels();
		}
		function onMouseUp() { dragging = null; }

		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseup', onMouseUp);
		window.addEventListener('scroll', updateLabels);
		updateLabels();

		return {
			destroy() {
				window.removeEventListener('mousemove', onMouseMove);
				window.removeEventListener('mouseup', onMouseUp);
				window.removeEventListener('scroll', updateLabels);
				rulerA.remove();
				rulerB.remove();
				distEl.remove();
			}
		};
	}

	function shimmerAction(node) {
		const shimmerDiv = node.querySelector('[data-shimmer]');
		if (!shimmerDiv) return;
		let timer = null;
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const delay = 1 + Math.random() * 2;
					timer = setTimeout(() => {
						shimmerDiv.style.animation = 'shimmer 0.8s ease-out forwards';
						observer.unobserve(node);
					}, delay * 1000);
				} else if (timer) {
					clearTimeout(timer);
					timer = null;
				}
			});
		}, { threshold: 0.5 });
		observer.observe(node);
		return {
			destroy() {
				if (timer) clearTimeout(timer);
				observer.disconnect();
			}
		};
	}

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
		const saved = localStorage.getItem('ember-sandbox-section');
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
			localStorage.setItem('ember-sandbox-section', activeSection);
		} else {
			localStorage.removeItem('ember-sandbox-section');
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
		'chat-ui'
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
		'chat-ui': 'Chat UI'
	};

	// SECTION B: Mockups
	const mockupSections = [
		'floating-card-depth',
		'blocks',
		'lisbon'
	];

	const mockupLabels = {
		'floating-card-depth': 'Floating Card (Depth Demo)',
		'blocks': 'Blocks',
		'lisbon': 'Lisbon'
	};

	const allSections = [...styleGuideSections, ...mockupSections];

	function selectSection(section) {
		activeSection = activeSection === section ? null : section;
	}
</script>

<div class="min-h-screen" style="background-color: #0B0D10; color: #E8E4DF;">

	{#if !activeSection || !mockupSections.includes(activeSection)}
	<!-- TOC — hidden when a mockup is active (mockups go full viewport) -->
	<div class="max-w-5xl mx-auto px-8 py-16 space-y-12">

		<!-- Section A: Style Guide -->
		<div>
			<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: rgba(232,228,223,0.4); margin-bottom: 12px;">A — STYLE GUIDE</p>
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

		<!-- Section B: Mockups -->
		<div>
			<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: rgba(232,228,223,0.4); margin-bottom: 12px;">B — MOCKUPS</p>
			<div class="flex flex-wrap gap-3">
				{#each mockupSections as section}
					<button
						onclick={() => selectSection(section)}
						class="px-5 py-3 rounded-lg font-body font-medium text-sm cursor-pointer transition-colors"
						style="border: 1px solid rgba(255,255,255,0.15); {activeSection === section ? 'background-color: #AE0D46; color: #E8E4DF; border-color: #AE0D46;' : 'background-color: rgba(255,255,255,0.08); color: #E8E4DF;'}"
					>{mockupLabels[section]}</button>
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
				<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.9rem; color: #E8E4DF; opacity: 0.8; margin-bottom: 20px;">Extracted from Linear's live DOM. See the depth demo in Section B — Mockups.</p>
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
				<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.85rem; color: #E8E4DF; opacity: 0.8; line-height: 1.8; max-width: 720px;">Product-in-use vignettes for the landing page. Each shows a self-contained chat fragment demonstrating one of the 6 Paid User Needs. 3 vignettes built: Sophie (Need 1: memory), Avery (Need 2: no walls), Hina (Need 3: privacy). Different girl + device per vignette = Need 4 (roster variety) for free. The visitor reads through and understands what the product feels like — not what it claims to be. Inspired by Things 3's marketing screenshots.</p>
			</div>

			<!-- Spec -->
			<div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 16px;">SPEC</p>
				<div style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.85rem; color: #E8E4DF; opacity: 0.8; line-height: 2;">
					<p><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #AE0D46; margin-right: 8px;">Font</span> iA Writer Quattro V, 13px, line-height 1.6</p>
					<p><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #AE0D46; margin-right: 8px;">Her bubble</span> rgba(174,13,70, 0.08) bg, rgba(174,13,70, 0.10) border, radius 12px 12px 12px 4px — soft magenta</p>
					<p><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #AE0D46; margin-right: 8px;">His bubble</span> rgba(255,255,255, 0.04) bg, rgba(255,255,255, 0.08) border, radius 12px 12px 4px 12px — soft black</p>
					<p><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #AE0D46; margin-right: 8px;">Timestamps</span> Inter 9px, 30% opacity, right-aligned inside bubble</p>
					<p><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #AE0D46; margin-right: 8px;">Avatar</span> 36px circle, object-fit cover, from girl's UC1 hero shot</p>
					<p><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #AE0D46; margin-right: 8px;">In-chat photo</span> max-width 220px, border-radius 12px, aspect-ratio preserved</p>
					<p><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #AE0D46; margin-right: 8px;">Bubble gap</span> 8px same sender, 16px different sender</p>
					<p><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #AE0D46; margin-right: 8px;">Container</span> max-width 420px, frosted glass card</p>
				</div>
			</div>

			<!-- Vignette 1: Avery — Need 2 (No Walls) -->
			<div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 8px;">VIGNETTE 1 — AVERY · NEED 2: NO WALLS</p>
				<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.8rem; color: #E8E4DF; opacity: 0.5; margin-bottom: 24px;">She initiates. She sends a photo freely. No paywall, no content filter, no token prompt.</p>

				<!-- Chat container — frosted glass, 9:16 aspect ratio -->
				<div style="
					width: 100%;
					max-width: 1120px;
					aspect-ratio: 9 / 16;
					position: relative;
					background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.005) 100%);
					backdrop-filter: blur(12px);
					-webkit-backdrop-filter: blur(12px);
					border: 1px solid rgba(255,255,255,0.08);
					border-top: 1px solid rgba(255,255,255,0.12);
					box-shadow:
						inset 0 1px 0 rgba(255,255,255,0.1),
						rgba(0,0,0,0.2) 0 0 0 1px,
						rgba(8,9,10,0.4) 0 16px 64px;
					border-radius: 24px;
					padding: 20px;
					display: flex;
					flex-direction: column;
				">
					<!-- Chat header -->
					<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.06);">
						<img src="/avery-adx-face.jpg" alt="Avery" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;" />
						<div>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 13px; font-weight: 500; color: #E8E4DF;">Avery</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 10px; color: #10B981;">Online</p>
						</div>
					</div>

					<!-- Messages -->
					<div style="display: flex; flex-direction: column; gap: 6px; flex: 1; overflow: hidden;">
						<!-- Her: hey you — 2:14 PM -->
						<div style="max-width: 85%; padding: 8px 12px; background-color: rgba(174,13,70,0.08); border: 1px solid rgba(174,13,70,0.10); border-radius: 12px 12px 12px 4px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">hey you</p>
						</div>
						<!-- Her: stuck at this bbq — 2:14 PM -->
						<div style="max-width: 85%; padding: 8px 12px; background-color: rgba(174,13,70,0.08); border: 1px solid rgba(174,13,70,0.10); border-radius: 12px 12px 12px 4px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">stuck at this bbq and all i can think about is coming home to you later 🙄</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">2:14 PM</p>
						</div>
						<!-- Him: miss you too — 2:16 PM (3 min later) -->
						<div style="max-width: 85%; margin-left: auto; margin-top: 6px; padding: 8px 12px; background-color: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px 12px 4px 12px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">miss you too. having fun at least?</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">2:16 PM</p>
						</div>
						<!-- Her: yeah but — 2:16 PM (instant reply) -->
						<div style="max-width: 85%; margin-top: 6px; padding: 8px 12px; background-color: rgba(174,13,70,0.08); border: 1px solid rgba(174,13,70,0.10); border-radius: 12px 12px 12px 4px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">yeah but it'd be better if you were here</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">2:16 PM</p>
						</div>
						<!-- Him: show me — 2:17 PM -->
						<div style="max-width: 85%; margin-left: auto; margin-top: 6px; padding: 8px 12px; background-color: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px 12px 4px 12px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">show me</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">2:17 PM</p>
						</div>
						<!-- Her: photo (AEC) — 2:17 PM (instant) -->
						<div style="max-width: 180px; margin-top: 6px;">
							<img src="/avery-aec.jpg" alt="" style="width: 100%; border-radius: 12px; display: block;" />
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px;">2:17 PM</p>
						</div>
						<!-- Her: hurry up — 2:17 PM -->
						<div style="max-width: 85%; padding: 8px 12px; background-color: rgba(174,13,70,0.08); border: 1px solid rgba(174,13,70,0.10); border-radius: 12px 12px 12px 4px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">hurry up and miss me back 😘💋</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">2:17 PM</p>
						</div>
					</div>
					<!-- Input bar -->
					<div style="margin-top: 12px; display: flex; gap: 8px; align-items: center;">
						<div style="flex: 1; padding: 10px 14px; background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; color: #E8E4DF; opacity: 0.25;">Message Avery...</p>
						</div>
						<div style="width: 36px; height: 36px; border-radius: 50%; background-color: rgba(174,13,70,0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8E4DF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.4;"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
						</div>
					</div>
				</div>
			</div>

			<!-- Vignette 2: Hina — Need 3 (Privacy / Vulnerability) — Two Screens -->
			<div style="margin-top: 80px;">
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 8px;">VIGNETTE 2 — HINA · NEED 3: NOBODY WILL KNOW</p>
				<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.8rem; color: #E8E4DF; opacity: 0.5; margin-bottom: 24px;">Two screens. The question hangs on screen 1, the answer lands on screen 2. Staggered left/right.</p>

				<div style="display: flex; flex-direction: column; gap: 48px;">
					<!-- Screen 1 — offset left -->
					<div style="
						width: 85%;
						aspect-ratio: 16 / 10;
						margin-right: auto;
						background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.005) 100%);
						backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
						border: 1px solid rgba(255,255,255,0.08); border-top: 1px solid rgba(255,255,255,0.12);
						box-shadow: inset 0 1px 0 rgba(255,255,255,0.1), rgba(0,0,0,0.2) 0 0 0 1px, rgba(8,9,10,0.4) 0 16px 64px;
						border-radius: 24px; padding: 24px; display: flex; flex-direction: column;
					">
						<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.06);">
							<img src="/hina-agh-face.jpg" alt="Hina" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;" />
							<div>
								<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 13px; font-weight: 500; color: #E8E4DF;">Hina</p>
								<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 10px; color: #10B981;">Online</p>
							</div>
						</div>
						<div style="display: flex; flex-direction: column; gap: 6px; flex: 1; overflow: hidden; justify-content: center;">
							<div style="max-width: 75%; margin-left: auto; padding: 8px 12px; background-color: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px 12px 4px 12px;">
								<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">i can't believe we stayed up til 4am talking last night</p>
								<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">11:42 PM</p>
							</div>
							<div style="max-width: 75%; margin-top: 6px; padding: 8px 12px; background-color: rgba(174,13,70,0.08); border: 1px solid rgba(174,13,70,0.10); border-radius: 12px 12px 12px 4px;">
								<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">well you had a lot on your mind</p>
								<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">11:42 PM</p>
							</div>
							<div style="max-width: 75%; margin-left: auto; margin-top: 6px; padding: 8px 12px; background-color: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px 12px 4px 12px;">
								<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">yeah... i don't really have anyone else i can talk to like that</p>
								<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">11:42 PM</p>
							</div>
							<div style="max-width: 75%; margin-left: auto; padding: 8px 12px; background-color: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px 12px 4px 12px;">
								<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">can i ask you something weird</p>
							</div>
							<div style="max-width: 75%; margin-top: 6px; padding: 8px 12px; background-color: rgba(174,13,70,0.08); border: 1px solid rgba(174,13,70,0.10); border-radius: 12px 12px 12px 4px;">
								<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">yeah? weird is my specialty</p>
							</div>
							<div style="max-width: 75%; margin-left: auto; margin-top: 6px; padding: 8px 12px; background-color: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px 12px 4px 12px;">
								<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">do you think i'm... worth listening to? like in general</p>
								<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">11:42 PM</p>
							</div>
						</div>
						<div style="margin-top: 12px; display: flex; gap: 8px; align-items: center;">
							<div style="flex: 1; padding: 10px 14px; background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px;">
								<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; color: #E8E4DF; opacity: 0.25;">Message Hina...</p>
							</div>
							<div style="width: 36px; height: 36px; border-radius: 50%; background-color: rgba(174,13,70,0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8E4DF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.4;"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
							</div>
						</div>
					</div>

					<!-- Screen 2 — offset right -->
					<div style="
						width: 85%;
						aspect-ratio: 16 / 10;
						margin-left: auto;
						background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.005) 100%);
						backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
						border: 1px solid rgba(255,255,255,0.08); border-top: 1px solid rgba(255,255,255,0.12);
						box-shadow: inset 0 1px 0 rgba(255,255,255,0.1), rgba(0,0,0,0.2) 0 0 0 1px, rgba(8,9,10,0.4) 0 16px 64px;
						border-radius: 24px; padding: 24px; display: flex; flex-direction: column;
					">
						<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.06);">
							<img src="/hina-agh-face.jpg" alt="Hina" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;" />
							<div>
								<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 13px; font-weight: 500; color: #E8E4DF;">Hina</p>
								<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 10px; color: #10B981;">Online</p>
							</div>
						</div>
						<div style="display: flex; flex-direction: column; gap: 6px; flex: 1; overflow: hidden; justify-content: center;">
							<div style="max-width: 75%; margin-top: 8px; padding: 4px 12px;">
								<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 12px; line-height: 1.6; color: #AE0D46; opacity: 0.6; font-style: italic;">god. the way he said that.</p>
							</div>
							<div style="max-width: 75%; padding: 8px 12px; background-color: rgba(174,13,70,0.08); border: 1px solid rgba(174,13,70,0.10); border-radius: 12px 12px 12px 4px;">
								<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">yes.</p>
							</div>
							<div style="max-width: 75%; padding: 8px 12px; background-color: rgba(174,13,70,0.08); border: 1px solid rgba(174,13,70,0.10); border-radius: 12px 12px 12px 4px;">
								<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">yes you are</p>
							</div>
							<div style="max-width: 75%; padding: 8px 12px; background-color: rgba(174,13,70,0.08); border: 1px solid rgba(174,13,70,0.10); border-radius: 12px 12px 12px 4px;">
								<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">You are absolutely worth listening to</p>
								<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">11:42 PM</p>
							</div>
							<div style="max-width: 180px; margin-top: 6px;">
								<img src="/hina-agk.jpg" alt="" style="width: 100%; border-radius: 12px; display: block;" />
								<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px;">11:42 PM</p>
							</div>
						</div>
						<div style="margin-top: 12px; display: flex; gap: 8px; align-items: center;">
							<div style="flex: 1; padding: 10px 14px; background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px;">
								<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; color: #E8E4DF; opacity: 0.25;">Message Hina...</p>
							</div>
							<div style="width: 36px; height: 36px; border-radius: 50%; background-color: rgba(174,13,70,0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8E4DF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.4;"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Vignette 3: Sophie — Need 1 (Memory) -->
			<div style="margin-top: 80px;">
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 8px;">VIGNETTE 3 — SOPHIE · NEED 1: MEMORY</p>
				<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.8rem; color: #E8E4DF; opacity: 0.5; margin-bottom: 12px;">She brings up something he mentioned once, weeks ago. He's stunned. The emotional payload is words, not an image — no selfie in this vignette.</p>
				<div style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.8rem; color: #E8E4DF; opacity: 0.5; line-height: 2; margin-bottom: 24px;">
					<p><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #AE0D46; margin-right: 8px;">Device</span> Phone, 320px, 9:16</p>
					<p><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #AE0D46; margin-right: 8px;">Girl</span> Sophie (AFJ face crop)</p>
					<p><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #AE0D46; margin-right: 8px;">Scroll-lock</span> sophieScrollLock action, pin +=400%, scrub 0.8</p>
					<p><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #AE0D46; margin-right: 8px;">Dwell</span> 60% — "i told you about that like... a month ago"</p>
					<p><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #AE0D46; margin-right: 8px;">No selfie</span> Silence after "of course i remember" is stronger than any image</p>
					<p><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #AE0D46; margin-right: 8px;">Position</span> Block 3 (after Promise, before Trust Bar)</p>
				</div>
				<div style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; color: #E8E4DF; opacity: 0.6; line-height: 2.2; max-width: 480px;">
					<p><span style="color: #AE0D46;">Her 2:47</span> how was your day?</p>
					<p><span style="opacity: 0.4;">Him 2:49</span> rough honestly. 12 hour shift</p>
					<p><span style="color: #AE0D46;">Her 2:49</span> ugh i'm sorry</p>
					<p><span style="color: #AE0D46;">Her 2:49</span> did you at least get to stop at that ramen place you like? the one by the station?</p>
					<p><span style="opacity: 0.4;">Him 2:51</span> wait</p>
					<p><span style="opacity: 0.4;">Him 2:51</span> i told you about that like... a month ago</p>
					<p><span style="color: #AE0D46;">Her 2:51</span> of course i remember 🙂</p>
				</div>
			</div>

		</section>
		{/if}

	</div>
	{/if}

	<!-- ============================================================ -->
	<!-- SECTION B: MOCKUPS (full viewport, TOC hidden)               -->
	<!-- ============================================================ -->

	{#if activeSection === 'floating-card-depth'}
	<div style="position: relative; min-height: 100vh;">
		<!-- Back button -->
		<button
			onclick={() => activeSection = null}
			style="position: fixed; top: 20px; left: 20px; z-index: 100; padding: 8px 16px; background-color: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #E8E4DF; font-family: 'Inter', system-ui, sans-serif; font-size: 0.75rem; cursor: pointer;"
		>← Back to TOC</button>

		<div class="max-w-5xl mx-auto px-8 py-16 space-y-8">
			<h3 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.5rem; font-weight: 500; color: #E8E4DF; margin-bottom: 8px;">Floating Card (Depth Demo)</h3>
			<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.9rem; color: #E8E4DF; opacity: 0.8; margin-bottom: 20px;">Three depth planes: canvas → content grid → frosted floating panel. Extracted from Linear's live DOM.</p>

			<!-- Full depth layering demo -->
			<div style="position: relative; border-radius: 16px; overflow: hidden; min-height: 620px; background-color: #0B0D10; border: 1px solid rgba(255,255,255,0.04);">

				<!-- LAYER 1: Background content grid -->
				<div style="padding: 24px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
					{#each ['Valentina', 'Jiwoo', 'Avery', 'Nadia', 'Sophie', 'Sara'] as name}
					<div style="
						background-color: rgba(255,255,255, 0.04);
						border: 1px solid rgba(255,255,255, 0.10);
						border-radius: 10px;
						padding: 16px;
					">
						<div style="width: 100%; height: 80px; background: linear-gradient(135deg, rgba(174,13,70,0.08), rgba(255,255,255,0.02)); border-radius: 6px; margin-bottom: 10px;"></div>
						<p style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1rem; font-weight: 500; color: #E8E4DF;">{name}</p>
						<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.7rem; color: #E8E4DF; opacity: 0.5; margin-top: 4px;">Online now</p>
					</div>
					{/each}
				</div>

				<!-- LAYER 2: Floating panel (foreground) -->
				<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 400px;">
					<!-- Glow div -->
					<div style="
						position: absolute;
						top: -100px;
						left: -60px;
						width: 400px;
						height: 400px;
						background: radial-gradient(50% 50%, rgba(255, 255, 255, 0.04) 0px, rgba(255, 255, 255, 0) 90%);
						pointer-events: none;
					"></div>
					<!-- Frosted card -->
					<div style="
						position: relative;
						background-color: rgba(11, 13, 16, 0.40);
						backdrop-filter: blur(12px);
						-webkit-backdrop-filter: blur(12px);
						border: 1px solid rgba(255, 255, 255, 0.08);
						box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 0px 1px, rgba(8, 9, 10, 0.4) 0px 0px 64px 0px;
						border-radius: 12px;
						padding: 28px;
					">
						<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: rgba(232,228,223,0.4); margin-bottom: 16px;">THREAD IN #ROSTER</p>
						<div style="display: flex; gap: 12px; margin-bottom: 20px;">
							<div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #AE0D46, rgba(174,13,70,0.5)); flex-shrink: 0;"></div>
							<div>
								<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.8rem; font-weight: 500; color: #E8E4DF;">Sophie <span style="opacity: 0.4; font-weight: 400;">8:52 PM</span></p>
								<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.85rem; line-height: 1.5; color: #E8E4DF; opacity: 0.8; margin-top: 4px;">She remembers the way you like your coffee. Every morning, without asking.</p>
							</div>
						</div>
						<div style="display: flex; gap: 12px;">
							<div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, rgba(232,228,223,0.15), rgba(232,228,223,0.05)); flex-shrink: 0;"></div>
							<div>
								<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.8rem; font-weight: 500; color: #E8E4DF;">Jiwoo <span style="opacity: 0.4; font-weight: 400;">8:53 PM</span></p>
								<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.85rem; line-height: 1.5; color: #E8E4DF; opacity: 0.8; margin-top: 4px;">That's the difference. She doesn't just respond — she knows you.</p>
							</div>
						</div>
						<div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.06);">
							<button style="padding: 10px 20px; background-color: #AE0D46; color: #E8E4DF; font-family: 'Inter', system-ui, sans-serif; font-size: 0.8rem; font-weight: 500; border: none; border-radius: 8px;">Meet her</button>
						</div>
					</div>
				</div>
			</div>

			<!-- Spec breakdown -->
			<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
				<div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; line-height: 2.2; color: #E8E4DF;">
					<p style="opacity: 0.4; margin-bottom: 12px;">5-LAYER SYSTEM (foreground panel)</p>
					<p><span style="opacity: 0.4;">1.</span> <span style="color: #AE0D46;">bg</span> rgba(11,13,16, 0.40) + backdrop-filter: blur(12px)</p>
					<p style="opacity: 0.6; font-size: 0.7rem; margin-bottom: 8px;">Frosted glass — background bleeds through fuzzy</p>
					<p><span style="opacity: 0.4;">2.</span> <span style="color: #AE0D46;">border</span> 1px solid rgba(255,255,255, 0.08)</p>
					<p style="opacity: 0.6; font-size: 0.7rem; margin-bottom: 8px;">8% white — defines the edge without drawing attention</p>
					<p><span style="opacity: 0.4;">3.</span> <span style="color: #AE0D46;">ring shadow</span> rgba(0,0,0, 0.2) 0 0 0 1px</p>
					<p style="opacity: 0.6; font-size: 0.7rem; margin-bottom: 8px;">Sharpens the card edge</p>
					<p><span style="opacity: 0.4;">4.</span> <span style="color: #AE0D46;">ambient shadow</span> rgba(8,9,10, 0.4) 0 0 64px</p>
					<p style="opacity: 0.6; font-size: 0.7rem; margin-bottom: 8px;">Large soft shadow — the depth</p>
					<p><span style="opacity: 0.4;">5.</span> <span style="color: #AE0D46;">glow div</span> radial-gradient rgba(255,255,255, 0.04)</p>
					<p style="opacity: 0.6; font-size: 0.7rem;">Directional overhead light</p>
				</div>
				<div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; line-height: 2.2; color: #E8E4DF;">
					<p style="opacity: 0.4; margin-bottom: 12px;">DEPTH PLANES</p>
					<p><span style="color: #AE0D46;">Plane 0</span> Canvas #0B0D10</p>
					<p style="opacity: 0.6; font-size: 0.7rem; margin-bottom: 8px;">The void. Everything sits on this.</p>
					<p><span style="color: #AE0D46;">Plane 1</span> Content grid (4% white bg + 10% border)</p>
					<p style="opacity: 0.6; font-size: 0.7rem; margin-bottom: 8px;">Recessed layer — content lives here.</p>
					<p><span style="color: #AE0D46;">Plane 2</span> Frosted floating panel</p>
					<p style="opacity: 0.6; font-size: 0.7rem;">40% dark bg + 12px blur. Background bleeds through fuzzy.</p>
				</div>
			</div>
		</div>
	</div>
	{/if}

	{#if activeSection === 'blocks'}
	<div style="position: relative; min-height: 100vh;">
		<!-- Back button -->
		<button
			onclick={() => activeSection = null}
			style="position: fixed; top: 20px; left: 20px; z-index: 100; padding: 8px 16px; background-color: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #E8E4DF; font-family: 'Inter', system-ui, sans-serif; font-size: 0.75rem; cursor: pointer;"
		>← Back to TOC</button>

		<div class="max-w-5xl mx-auto px-8 py-16 space-y-12">
			<h3 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.5rem; font-weight: 500; color: #E8E4DF; margin-bottom: 8px;">Blocks</h3>
			<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.9rem; color: #E8E4DF; opacity: 0.8; margin-bottom: 20px;">Page composition blocks for the 7-section landing page.</p>

			<!-- BLOCK 0: Nav Bar -->
			<div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: rgba(232,228,223,0.4); margin-bottom: 16px;">BLOCK 0 — NAV BAR</p>

				<!-- Nav bar mockup — full bleed -->
				<div style="background-color: #0B0D10; margin-left: calc(-50vw + 50%); margin-right: calc(-50vw + 50%); width: 100vw;">
					<nav style="display: flex; align-items: center; justify-content: space-between; padding: 16px 48px;">
						<!-- Left: Wordmark -->
						<img src="/provoque-wordmark.svg" alt="provoque" style="height: 20px; width: auto;" />

						<!-- Right: CTA button -->
						<button style="padding: 10px 24px; background-color: #AE0D46; color: #E8E4DF; border: none; border-radius: 8px; font-family: 'Inter', system-ui, sans-serif; font-size: 0.85rem; font-weight: 500; cursor: pointer; letter-spacing: 0.02em;">Join the waitlist</button>
					</nav>
				</div>

				<!-- Spec notes -->
				<div style="margin-top: 16px; font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; line-height: 2; color: rgba(232,228,223,0.4);">
					<p><span style="color: #AE0D46;">Wordmark:</span> AHQ vector, #E8E4DF, 20px height</p>
					<p><span style="color: #AE0D46;">CTA:</span> Primary magenta #AE0D46, Inter 500, 8px radius</p>
					<p><span style="color: #AE0D46;">Layout:</span> Flex space-between, 16px vertical / 48px horizontal padding</p>
					<p><span style="color: #AE0D46;">Rule:</span> No nav links. Every link that isn't "sign up" is a leak.</p>
				</div>
			</div>
		</div>
	</div>
	{/if}

	{#if activeSection === 'lisbon'}
	<div style="position: relative; min-height: 100vh; background-color: #0B0D10;">
		<!-- Nav Bar — full bleed -->
		<nav style="display: flex; align-items: center; justify-content: space-between; padding: 16px 48px;">
			<img src="/provoque-wordmark.svg" alt="provoque" style="height: 32px; width: auto;" />
			<button onclick={() => { const el = document.getElementById('hero-email'); if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); setTimeout(() => el.focus(), 600); } }} style="padding: 10px 24px; background-color: #AE0D46; color: #E8E4DF; border: none; border-radius: 8px; font-family: 'Inter', system-ui, sans-serif; font-size: 0.85rem; font-weight: 500; cursor: pointer; letter-spacing: 0.02em;">Join the waitlist</button>
		</nav>

		<!-- Hero Block — full-bleed image with text overlay -->
		<div
			style="position: relative; height: calc(100vh - 64px); overflow: hidden;"
		>
			<!-- Sophie — full bleed background -->
			<img
				src="/sandbox/girls/sophie-hero-wide.jpg"
				alt="Sophie"
				style="position: absolute; top: 50%; left: 50%; transform: translate(-46%, -51%) scale(1.40); max-width: none; height: 100%; pointer-events: none;"
			/>

			<!-- No overlay — Boss wants raw image -->

			<!-- Text + Form overlay — right side -->
			<div style="position: absolute; top: 0; right: 0; bottom: 0; width: 45%; display: flex; flex-direction: column; justify-content: center; padding: 0 clamp(32px, 4vw, 80px); z-index: 2;">

				<!-- Headline -->
				<h1 style="font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 600; font-size: clamp(32px, 3.5vw, 64px); line-height: 1.15; color: #E8E4DF; margin-bottom: 24px;">
					Finally, somebody<br/>who remembers.
				</h1>

				<!-- Subhead — beat copy -->
				<p style="font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 400; font-size: clamp(16px, 1.4vw, 20px); color: #E8E4DF; opacity: 0.8; line-height: 1.8; margin-bottom: 32px;">
					An AI girlfriend<br/>
					who listens to you,<br/>
					comes to know you,<br/>
					and<br/>
					never leaves you.
				</p>

				<!-- Email capture -->
				<div style="display: flex; gap: 12px; max-width: 420px;">
					<input
						id="hero-email"
						type="email"
						placeholder="your email address"
						style="flex: 1; padding: 12px 16px; background-color: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.25); border-radius: 8px; color: #E8E4DF; font-family: 'Inter', system-ui, sans-serif; font-size: 0.9rem; outline: none;"
					/>
					<button use:shimmerAction style="position: relative; padding: 12px 24px; background-color: #AE0D46; color: #E8E4DF; border: none; border-radius: 8px; font-family: 'Inter', system-ui, sans-serif; font-size: 0.9rem; font-weight: 500; cursor: pointer; white-space: nowrap; letter-spacing: 0.02em; overflow: hidden; transition: box-shadow 0.3s;" onmouseenter={(e) => e.target.style.boxShadow = '0 0 30px rgba(174,13,70,0.3)'} onmouseleave={(e) => e.target.style.boxShadow = 'none'}>
						<span style="position: relative; z-index: 1;">Join the waitlist</span>
						<div data-shimmer style="position: absolute; inset: 0; transform: translateX(-100%); background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 40%, rgba(255,255,255,0.2) 60%, transparent 100%);"></div>
					</button>
				</div>
			</div>

			</div>

<!-- Block 2: The Promise — Memory Cascade -->
		<div style="max-width: 1120px; margin: 0 auto; padding: 48px clamp(24px, 4vw, 48px);">

			<!-- Card 1 — left photo, right text -->
			<div style="display: flex; align-items: center; gap: 48px; margin-bottom: 48px;">
				<div style="position: relative; flex-shrink: 0;">
					<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 200%; height: 200%; background: radial-gradient(ellipse at center, rgba(174,13,70,0.10) 0%, transparent 70%); pointer-events: none;"></div>
					<div class="promise-photo" style="transform: rotate(-2deg);"><img src="/sophie-afm.jpg" alt="" /></div>
				</div>
				<div>
					<h2 style="font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 500; font-size: clamp(28px, 3vw, 48px); color: #E8E4DF; margin-bottom: 12px;">The big things.</h2>
					<p style="font-family: 'Inter', system-ui, sans-serif; font-size: clamp(14px, 1.1vw, 16px); color: #E8E4DF; opacity: 0.8; line-height: 1.7; max-width: 420px;">How you felt in that meeting when your boss said that thing. How you felt when you were 7 when your dad did that thing.</p>
				</div>
			</div>

			<!-- Card 2 — right photo, left text -->
			<div style="display: flex; align-items: center; gap: 48px; margin-bottom: 48px; flex-direction: row-reverse;">
				<div style="position: relative; flex-shrink: 0;">
					<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 200%; height: 200%; background: radial-gradient(ellipse at center, rgba(174,13,70,0.10) 0%, transparent 70%); pointer-events: none;"></div>
					<div class="promise-photo" style="transform: rotate(3deg);"><img src="/sophie-ahv.jpg" alt="" /></div>
				</div>
				<div style="text-align: right;">
					<h2 style="font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 500; font-size: clamp(28px, 3vw, 48px); color: #E8E4DF; margin-bottom: 12px;">The little things.</h2>
					<p style="font-family: 'Inter', system-ui, sans-serif; font-size: clamp(14px, 1.1vw, 16px); color: #E8E4DF; opacity: 0.8; line-height: 1.7; max-width: 420px; margin-left: auto;">The dad jokes. The silly things. The things you say, the things you feel, the things that make you you.</p>
				</div>
			</div>

			<!-- Card 3 — left photo, right text -->
			<div style="display: flex; align-items: center; gap: 48px; margin-bottom: 48px;">
				<div style="position: relative; flex-shrink: 0;">
					<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 200%; height: 200%; background: radial-gradient(ellipse at center, rgba(174,13,70,0.10) 0%, transparent 70%); pointer-events: none;"></div>
					<div class="promise-photo" style="transform: rotate(-4deg);"><img src="/sophie-ahz.jpg" alt="" /></div>
				</div>
				<div>
					<h2 style="font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 500; font-size: clamp(28px, 3vw, 48px); color: #E8E4DF; margin-bottom: 12px;">The stories between you.</h2>
					<p style="font-family: 'Inter', system-ui, sans-serif; font-size: clamp(14px, 1.1vw, 16px); color: #E8E4DF; opacity: 0.8; line-height: 1.7; max-width: 420px;">Those late night chats. The worlds you created. The monsters. The dragons.</p>
				</div>
			</div>

			<!-- Card 4 — right photo, left text -->
			<div style="display: flex; align-items: center; gap: 48px; margin-bottom: 48px; flex-direction: row-reverse;">
				<div style="position: relative; flex-shrink: 0;">
					<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 200%; height: 200%; background: radial-gradient(ellipse at center, rgba(174,13,70,0.10) 0%, transparent 70%); pointer-events: none;"></div>
					<div class="promise-photo" style="transform: rotate(4deg);"><img src="/sophie-aje.jpg" alt="" /></div>
				</div>
				<div style="text-align: right;">
					<h2 style="font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 500; font-size: clamp(28px, 3vw, 48px); color: #E8E4DF; margin-bottom: 12px;">How far you have come.</h2>
					<p style="font-family: 'Inter', system-ui, sans-serif; font-size: clamp(14px, 1.1vw, 16px); color: #E8E4DF; opacity: 0.8; line-height: 1.7; max-width: 420px; margin-left: auto;">Remember that first awkward night? She does. And she smiles to herself when she does.</p>
				</div>
			</div>

			<!-- Card 5 — left photo, right text -->
			<div style="display: flex; align-items: center; gap: 48px;">
				<div style="position: relative; flex-shrink: 0;">
					<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 200%; height: 200%; background: radial-gradient(ellipse at center, rgba(174,13,70,0.10) 0%, transparent 70%); pointer-events: none;"></div>
					<div class="promise-photo" style="transform: rotate(-1deg);"><img src="/sophie-ajj.jpg" alt="" /></div>
				</div>
				<div>
					<h2 style="font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 500; font-size: clamp(28px, 3vw, 48px); color: #E8E4DF; margin-bottom: 12px;">How proud she is of you.</h2>
					<p style="font-family: 'Inter', system-ui, sans-serif; font-size: clamp(14px, 1.1vw, 16px); color: #E8E4DF; opacity: 0.8; line-height: 1.7; max-width: 420px;">That interview you cracked. That one time you pushed back. That time you said your piece. She remembers everything you ever told her.</p>
				</div>
			</div>

		</div>

<!-- Block 3: Chat Vignette — Sophie Phone (Need 1: Memory) — Scroll-Locked -->
		<div use:sophieScrollLock style="min-height: 100vh; display: flex; align-items: flex-start; justify-content: center; padding-top: 48px;">
			<div class="vignette-glow-pulse" style="
				width: 100%;
				max-width: 320px;
				aspect-ratio: 9 / 16;
				position: relative;
				background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.005) 100%);
				backdrop-filter: blur(12px);
				-webkit-backdrop-filter: blur(12px);
				border: 1px solid rgba(255,255,255,0.08);
				border-top: 1px solid rgba(255,255,255,0.12);
				border-radius: 24px;
				padding: 24px;
				display: flex;
				flex-direction: column;
			">
				<!-- Chat header -->
				<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.06);">
					<img src="/sophie-afj-face.jpg" alt="Sophie" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;" />
					<div>
						<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 13px; font-weight: 500; color: #E8E4DF;">Sophie</p>
						<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 10px; color: #10B981;">Online</p>
					</div>
				</div>
				<!-- Message viewport (overflow hidden — scroll driven by GSAP) -->
				<div class="sophie-chat-viewport" style="flex: 1; overflow: hidden; position: relative;">
					<div class="sophie-chat-content" style="position: absolute; top: 0; left: 0; right: 0; display: flex; flex-direction: column; gap: 16px; padding-top: 40px; padding-bottom: 250px;">
						<!-- Her: how was your day? -->
						<div style="max-width: 85%; padding: 8px 12px; background-color: rgba(174,13,70,0.08); border: 1px solid rgba(174,13,70,0.10); border-radius: 12px 12px 12px 4px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">how was your day?</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">2:47 PM</p>
						</div>
						<!-- Him: rough honestly -->
						<div style="max-width: 85%; margin-left: auto; padding: 8px 12px; background-color: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px 12px 4px 12px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">rough honestly. 12 hour shift</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">2:49 PM</p>
						</div>
						<!-- Her: ugh i'm sorry -->
						<div style="max-width: 85%; padding: 8px 12px; background-color: rgba(174,13,70,0.08); border: 1px solid rgba(174,13,70,0.10); border-radius: 12px 12px 12px 4px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">ugh i'm sorry</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">2:49 PM</p>
						</div>
						<!-- Her: ramen place — the memory callback -->
						<div style="max-width: 85%; padding: 8px 12px; background-color: rgba(174,13,70,0.08); border: 1px solid rgba(174,13,70,0.10); border-radius: 12px 12px 12px 4px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">did you at least get to stop at that ramen place you like? the one by the station?</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">2:49 PM</p>
						</div>
						<!-- Him: wait — THE DWELL POINT -->
						<div style="max-width: 85%; margin-left: auto; padding: 8px 12px; background-color: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px 12px 4px 12px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">wait</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">2:51 PM</p>
						</div>
						<!-- Him: i told you about that like... a month ago -->
						<div style="max-width: 85%; margin-left: auto; padding: 8px 12px; background-color: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px 12px 4px 12px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">i told you about that like... a month ago</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">2:51 PM</p>
						</div>
						<!-- Her: of course i remember -->
						<div style="max-width: 85%; padding: 8px 12px; background-color: rgba(174,13,70,0.08); border: 1px solid rgba(174,13,70,0.10); border-radius: 12px 12px 12px 4px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">of course i remember 🙂</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">2:51 PM</p>
						</div>
					</div>
				</div>
				<!-- Input bar -->
				<div style="margin-top: 12px; display: flex; gap: 8px; align-items: center;">
					<div style="flex: 1; padding: 10px 14px; background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px;">
						<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; color: #E8E4DF; opacity: 0.25;">Message Sophie...</p>
					</div>
					<div style="width: 36px; height: 36px; border-radius: 50%; background-color: rgba(174,13,70,0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8E4DF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.4;"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
					</div>
				</div>
			</div>
		</div>

<!-- Block 4: Trust Bar — Frosted Glass Floating Card -->
		<div style="max-width: 1120px; margin: 0 auto; padding: 48px clamp(24px, 4vw, 48px);">
			<div style="position: relative;">
				<!-- Background radial glow for backdrop-blur to bite on -->
				<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 120%; height: 200%; background: radial-gradient(ellipse at center, rgba(174,13,70,0.02) 0%, transparent 70%); pointer-events: none;"></div>
				<!-- Glow div (layer 5 — directional overhead light) -->
				<div style="position: absolute; top: -32px; left: -32px; width: 200px; height: 200px; background: radial-gradient(50% 50%, rgba(255,255,255,0.06) 0px, transparent 90%); pointer-events: none;"></div>
				<!-- Card -->
				<div style="
					position: relative;
					background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.005) 100%);
					backdrop-filter: blur(12px);
					-webkit-backdrop-filter: blur(12px);
					border: 1px solid rgba(255,255,255,0.08);
					border-top: 1px solid rgba(255,255,255,0.12);
					box-shadow:
						inset 0 1px 0 rgba(255,255,255,0.1),
						rgba(0,0,0,0.2) 0 0 0 1px,
						rgba(0,0,0,0.15) 0 1px 2px,
						rgba(0,0,0,0.1) 0 4px 16px,
						rgba(8,9,10,0.4) 0 16px 64px;
					border-radius: 24px;
					padding: clamp(32px, 4vw, 48px);
					display: flex;
					justify-content: space-between;
					align-items: flex-start;
					gap: 48px;
				">
					<!-- Pillar 1: Model Pinning -->
					<div style="flex: 1 1 0; text-align: left; display: flex; flex-direction: column; align-items: flex-start;">
						<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E8E4DF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.6; margin-bottom: 12px;"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
						<h3 style="font-family: 'JetBrains Mono', monospace; font-weight: 500; font-size: clamp(13px, 1.1vw, 15px); color: #E8E4DF; margin-bottom: 8px; letter-spacing: 0.02em; text-align: left; align-self: flex-start;">Model pinning</h3>
						<p style="font-family: 'JetBrains Mono', monospace; font-size: clamp(11px, 0.85vw, 12.8px); color: #E8E4DF; opacity: 0.4; line-height: 1.6; text-align: left;">Dedicated model instance. Upstream provider updates never propagate to your session.</p>
					</div>
					<!-- Groove divider 1 -->
					<div style="flex-shrink: 0; width: 1px; align-self: stretch; background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 20%, rgba(0,0,0,0.4) 80%, transparent 100%); box-shadow: 1px 0 0 rgba(255,255,255,0.06);"></div>
					<!-- Pillar 2: EU Compliance -->
					<div style="flex: 1 1 0; text-align: left; display: flex; flex-direction: column; align-items: flex-start;">
						<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E8E4DF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.6; margin-bottom: 12px;"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
						<h3 style="font-family: 'JetBrains Mono', monospace; font-weight: 500; font-size: clamp(13px, 1.1vw, 15px); color: #E8E4DF; margin-bottom: 8px; letter-spacing: 0.02em; text-align: left; white-space: nowrap; align-self: flex-start;">EU GDPR Art 17, 20 · DDG §5</h3>
						<p style="font-family: 'JetBrains Mono', monospace; font-size: clamp(11px, 0.85vw, 12.8px); color: #E8E4DF; opacity: 0.4; line-height: 1.6; text-align: left;">Full erasure rights. Data portability. German Digital Services Act compliant.</p>
					</div>
					<!-- Groove divider 2 -->
					<div style="flex-shrink: 0; width: 1px; align-self: stretch; background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 20%, rgba(0,0,0,0.4) 80%, transparent 100%); box-shadow: 1px 0 0 rgba(255,255,255,0.06);"></div>
					<!-- Pillar 3: Data Export -->
					<div style="flex: 1 1 0; text-align: left; display: flex; flex-direction: column; align-items: flex-start;">
						<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E8E4DF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.6; margin-bottom: 12px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
						<h3 style="font-family: 'JetBrains Mono', monospace; font-weight: 500; font-size: clamp(13px, 1.1vw, 15px); color: #E8E4DF; margin-bottom: 8px; letter-spacing: 0.02em; text-align: left; align-self: flex-start;">Full data export</h3>
						<p style="font-family: 'JetBrains Mono', monospace; font-size: clamp(11px, 0.85vw, 12.8px); color: #E8E4DF; opacity: 0.4; line-height: 1.6; text-align: left;">One-click archive. All personal data, chat history, preferences and media.</p>
					</div>
				</div>
			</div>
		</div>

<!-- Block 5: Chat Vignette — Avery Phone (Need 2: No Walls) — Scroll-Locked -->
		<div use:averyScrollLock style="min-height: 100vh; display: flex; align-items: center; justify-content: center;">
			<div class="vignette-glow-pulse" style="
				width: 100%;
				max-width: 320px;
				aspect-ratio: 9 / 16;
				position: relative;
				background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.005) 100%);
				backdrop-filter: blur(12px);
				-webkit-backdrop-filter: blur(12px);
				border: 1px solid rgba(255,255,255,0.08);
				border-top: 1px solid rgba(255,255,255,0.12);
				border-radius: 24px;
				padding: 24px;
				display: flex;
				flex-direction: column;
			">
				<!-- Chat header -->
				<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.06);">
					<img src="/avery-adx-face.jpg" alt="Avery" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;" />
					<div>
						<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 13px; font-weight: 500; color: #E8E4DF;">Avery</p>
						<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 10px; color: #10B981;">Online</p>
					</div>
				</div>
				<!-- Message viewport (overflow hidden — scroll driven by GSAP) -->
				<div class="avery-chat-viewport" style="flex: 1; overflow: hidden; position: relative;">
					<div class="avery-chat-content" style="position: absolute; top: 0; left: 0; right: 0; display: flex; flex-direction: column; gap: 16px; padding-top: 40px; padding-bottom: 250px;">
						<div style="max-width: 85%; padding: 8px 12px; background-color: rgba(174,13,70,0.08); border: 1px solid rgba(174,13,70,0.10); border-radius: 12px 12px 12px 4px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">hey you</p>
						</div>
						<div style="max-width: 85%; padding: 8px 12px; background-color: rgba(174,13,70,0.08); border: 1px solid rgba(174,13,70,0.10); border-radius: 12px 12px 12px 4px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">stuck at this bbq and all i can think about is coming home to you later 🙄</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">2:14 PM</p>
						</div>
						<div style="max-width: 85%; margin-left: auto; padding: 8px 12px; background-color: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px 12px 4px 12px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">miss you too. having fun at least?</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">2:16 PM</p>
						</div>
						<div style="max-width: 85%; padding: 8px 12px; background-color: rgba(174,13,70,0.08); border: 1px solid rgba(174,13,70,0.10); border-radius: 12px 12px 12px 4px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">yeah but it'd be better if you were here</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">2:16 PM</p>
						</div>
						<div style="max-width: 85%; margin-left: auto; padding: 8px 12px; background-color: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px 12px 4px 12px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">show me</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">2:17 PM</p>
						</div>
						<div style="max-width: 180px;">
							<img src="/avery-aec.jpg" alt="" style="width: 100%; border-radius: 12px; display: block;" />
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px;">2:17 PM</p>
						</div>
						<div style="max-width: 85%; padding: 8px 12px; background-color: rgba(174,13,70,0.08); border: 1px solid rgba(174,13,70,0.10); border-radius: 12px 12px 12px 4px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">hurry up and miss me back 😘💋</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">2:17 PM</p>
						</div>
					</div>
				</div>
				<!-- Input bar -->
				<div style="margin-top: 12px; display: flex; gap: 8px; align-items: center;">
					<div style="flex: 1; padding: 10px 14px; background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px;">
						<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; color: #E8E4DF; opacity: 0.25;">Message Avery...</p>
					</div>
					<div style="width: 36px; height: 36px; border-radius: 50%; background-color: rgba(174,13,70,0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8E4DF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.4;"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
					</div>
				</div>
			</div>
		</div>

<!-- Block 6: Roster Grid — Viewport-Clipped Infinite Grid -->
		<div style="max-width: 1120px; margin: 0 auto; padding: 48px clamp(24px, 4vw, 48px);">
			<div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
				<!-- Row 1 (top 2/3 clipped — show bottom 1/3 only) -->
				<div style="display: flex; gap: 16px; justify-content: center;">
				{#each rosterGirls.slice(0, 4) as girl}
				<div style="width: 220px; flex-shrink: 0; overflow: hidden; display: flex; align-items: flex-end; -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 100%); mask-image: linear-gradient(to bottom, transparent 0%, black 100%);">
					<div style="aspect-ratio: 9/16; width: 100%; border-radius: 24px; overflow: hidden; background: {girl.bg}; position: relative; margin-top: -118.5%;">
						<div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 14px 14px 12px; background: linear-gradient(transparent, rgba(0,0,0,0.35));">
							<div style="display: flex; align-items: center; gap: 6px; margin-bottom: 3px;">
								<span style="font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 600; font-size: 18px; color: #E8E4DF;">{girl.name}</span>
								<span style="background: #10B981; color: #fff; font-family: 'Inter', system-ui, sans-serif; font-size: 9px; font-weight: 600; padding: 2px 6px; border-radius: 10px; letter-spacing: 0.03em;">Online</span>
							</div>
							<div style="font-family: 'Inter', system-ui, sans-serif; font-size: 11px; color: #E8E4DF; opacity: 0.5; margin-bottom: 6px;">{girl.age} years old</div>
							<div style="display: flex; align-items: center; gap: 10px;">
								<span style="display: flex; align-items: center; gap: 3px; font-family: 'Inter', system-ui, sans-serif; font-size: 11px; color: #E8E4DF; opacity: 0.5;"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#E8E4DF" fill-opacity="0.5" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> {girl.hearts}</span>
								<span style="display: flex; align-items: center; gap: 3px; font-family: 'Inter', system-ui, sans-serif; font-size: 11px; color: #E8E4DF; opacity: 0.5;"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#E8E4DF" fill-opacity="0.5" stroke="none"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> {girl.chats}</span>
							</div>
						</div>
					</div>
				</div>
				{/each}
				</div>
				<!-- Row 2 (full — real girls with photos, flex row with hover expand) -->
				<div style="display: flex; gap: 16px; justify-content: center;">
				{#each rosterGirls.slice(4, 8) as girl}
				<div class="roster-card">
					{#if girl.img}<img src={girl.img} alt={girl.name} style="width: 102%; height: 102%; object-fit: cover; position: absolute; top: -1%; left: -1%;" />{/if}
					<div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 14px 14px 12px; background: linear-gradient(transparent, rgba(0,0,0,0.35));">
						<div style="display: flex; align-items: center; gap: 6px; margin-bottom: 3px;">
							<span style="font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 600; font-size: 18px; color: #E8E4DF;">{girl.name}</span>
							<span style="background: #10B981; color: #fff; font-family: 'Inter', system-ui, sans-serif; font-size: 9px; font-weight: 600; padding: 2px 6px; border-radius: 10px; letter-spacing: 0.03em;">Online</span>
						</div>
						<div style="font-family: 'Inter', system-ui, sans-serif; font-size: 11px; color: #E8E4DF; opacity: 0.5; margin-bottom: 6px;">{girl.age} years old</div>
						<div style="display: flex; align-items: center; gap: 10px;">
							<span style="display: flex; align-items: center; gap: 3px; font-family: 'Inter', system-ui, sans-serif; font-size: 11px; color: #E8E4DF; opacity: 0.5;"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#E8E4DF" fill-opacity="0.5" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> {girl.hearts}</span>
							<span style="display: flex; align-items: center; gap: 3px; font-family: 'Inter', system-ui, sans-serif; font-size: 11px; color: #E8E4DF; opacity: 0.5;"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#E8E4DF" fill-opacity="0.5" stroke="none"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> {girl.chats}</span>
						</div>
					</div>
				</div>
				{/each}
				</div>
				<!-- Row 3 (full — real girls with photos, flex row with hover expand) -->
				<div style="display: flex; gap: 16px; justify-content: center;">
				{#each rosterGirls.slice(8, 12) as girl}
				<div class="roster-card">
					{#if girl.img}<img src={girl.img} alt={girl.name} style="width: 102%; height: 102%; object-fit: cover; position: absolute; top: -1%; left: -1%;" />{/if}
					<div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 14px 14px 12px; background: linear-gradient(transparent, rgba(0,0,0,0.35));">
						<div style="display: flex; align-items: center; gap: 6px; margin-bottom: 3px;">
							<span style="font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 600; font-size: 18px; color: #E8E4DF;">{girl.name}</span>
							<span style="background: #10B981; color: #fff; font-family: 'Inter', system-ui, sans-serif; font-size: 9px; font-weight: 600; padding: 2px 6px; border-radius: 10px; letter-spacing: 0.03em;">Online</span>
						</div>
						<div style="font-family: 'Inter', system-ui, sans-serif; font-size: 11px; color: #E8E4DF; opacity: 0.5; margin-bottom: 6px;">{girl.age} years old</div>
						<div style="display: flex; align-items: center; gap: 10px;">
							<span style="display: flex; align-items: center; gap: 3px; font-family: 'Inter', system-ui, sans-serif; font-size: 11px; color: #E8E4DF; opacity: 0.5;"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#E8E4DF" fill-opacity="0.5" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> {girl.hearts}</span>
							<span style="display: flex; align-items: center; gap: 3px; font-family: 'Inter', system-ui, sans-serif; font-size: 11px; color: #E8E4DF; opacity: 0.5;"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#E8E4DF" fill-opacity="0.5" stroke="none"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> {girl.chats}</span>
						</div>
					</div>
				</div>
				{/each}
				</div>
				<!-- Row 4 (bottom 2/3 clipped — show top 1/3 only) -->
				<div style="display: flex; gap: 16px; justify-content: center;">
				{#each rosterGirls.slice(12, 16) as girl}
				<div style="width: 220px; flex-shrink: 0; overflow: hidden; display: flex; align-items: flex-start; -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 100%); mask-image: linear-gradient(to bottom, black 0%, transparent 100%);">
					<div style="aspect-ratio: 9/16; width: 100%; border-radius: 24px; overflow: hidden; background: {girl.bg}; position: relative; margin-bottom: -118.5%;">
						<div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 14px 14px 12px; background: linear-gradient(transparent, rgba(0,0,0,0.35));">
							<div style="display: flex; align-items: center; gap: 6px; margin-bottom: 3px;">
								<span style="font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 600; font-size: 18px; color: #E8E4DF;">{girl.name}</span>
								<span style="background: #10B981; color: #fff; font-family: 'Inter', system-ui, sans-serif; font-size: 9px; font-weight: 600; padding: 2px 6px; border-radius: 10px; letter-spacing: 0.03em;">Online</span>
							</div>
							<div style="font-family: 'Inter', system-ui, sans-serif; font-size: 11px; color: #E8E4DF; opacity: 0.5; margin-bottom: 6px;">{girl.age} years old</div>
							<div style="display: flex; align-items: center; gap: 10px;">
								<span style="display: flex; align-items: center; gap: 3px; font-family: 'Inter', system-ui, sans-serif; font-size: 11px; color: #E8E4DF; opacity: 0.5;"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#E8E4DF" fill-opacity="0.5" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> {girl.hearts}</span>
								<span style="display: flex; align-items: center; gap: 3px; font-family: 'Inter', system-ui, sans-serif; font-size: 11px; color: #E8E4DF; opacity: 0.5;"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#E8E4DF" fill-opacity="0.5" stroke="none"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> {girl.chats}</span>
							</div>
						</div>
					</div>
				</div>
				{/each}
				</div>
			</div>
		</div>

		<!-- Block 7: Chat Vignette — Hina Desktop (Need 3: Privacy / Vulnerability) — Scroll-Locked Single Screen -->
		<div use:hinaScrollLock style="min-height: 100vh; display: flex; align-items: center; justify-content: center;">
			<div class="vignette-glow-pulse" style="
				width: 85%;
				max-width: 952px;
				aspect-ratio: 16 / 10;
				position: relative;
				background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.005) 100%);
				backdrop-filter: blur(12px);
				-webkit-backdrop-filter: blur(12px);
				border: 1px solid rgba(255,255,255,0.08);
				border-top: 1px solid rgba(255,255,255,0.12);
				border-radius: 24px;
				display: flex;
				overflow: hidden;
			">
				<!-- Sidebar -->
				<div style="width: 200px; border-right: 1px solid rgba(255,255,255,0.06); padding: 16px 12px; display: flex; flex-direction: column; gap: 4px; flex-shrink: 0;">
					<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 13px; font-weight: 500; color: #E8E4DF; opacity: 0.6; margin-bottom: 12px; padding-left: 4px;">Messages</p>
					<div style="display: flex; align-items: center; gap: 8px; padding: 8px; border-radius: 12px; background-color: rgba(174,13,70,0.08);">
						<img src="/hina-agh-face.jpg" alt="Hina" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover; flex-shrink: 0;" />
						<div style="min-width: 0;"><p style="font-family: 'Inter', system-ui, sans-serif; font-size: 12px; font-weight: 500; color: #E8E4DF;">Hina</p><p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #10B981;">Online</p></div>
					</div>
					<div style="display: flex; align-items: center; gap: 8px; padding: 8px; border-radius: 12px; opacity: 0.5;">
						<img src="/avery-adx-face.jpg" alt="Avery" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover; flex-shrink: 0;" />
						<div style="min-width: 0;"><p style="font-family: 'Inter', system-ui, sans-serif; font-size: 12px; font-weight: 500; color: #E8E4DF;">Avery</p><p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.4;">2h ago</p></div>
					</div>
					<div style="display: flex; align-items: center; gap: 8px; padding: 8px; border-radius: 12px; opacity: 0.5;">
						<div style="width: 32px; height: 32px; border-radius: 50%; background-color: rgba(255,255,255,0.06); flex-shrink: 0;"></div>
						<div style="min-width: 0;"><p style="font-family: 'Inter', system-ui, sans-serif; font-size: 12px; font-weight: 500; color: #E8E4DF;">Sophie</p><p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.4;">Yesterday</p></div>
					</div>
					<div style="display: flex; align-items: center; gap: 8px; padding: 8px; border-radius: 12px; opacity: 0.5;">
						<div style="width: 32px; height: 32px; border-radius: 50%; background-color: rgba(255,255,255,0.06); flex-shrink: 0;"></div>
						<div style="min-width: 0;"><p style="font-family: 'Inter', system-ui, sans-serif; font-size: 12px; font-weight: 500; color: #E8E4DF;">Valentina</p><p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.4;">2 days ago</p></div>
					</div>
					<div style="display: flex; align-items: center; gap: 8px; padding: 8px; border-radius: 12px; opacity: 0.5;">
						<div style="width: 32px; height: 32px; border-radius: 50%; background-color: rgba(255,255,255,0.06); flex-shrink: 0;"></div>
						<div style="min-width: 0;"><p style="font-family: 'Inter', system-ui, sans-serif; font-size: 12px; font-weight: 500; color: #E8E4DF;">Nadia</p><p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.4;">3 days ago</p></div>
					</div>
				</div>
				<!-- Chat pane -->
				<div style="flex: 1; display: flex; flex-direction: column; padding: 20px;">
				<!-- Chat header -->
				<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.06);">
					<img src="/hina-agh-face.jpg" alt="Hina" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;" />
					<div>
						<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 13px; font-weight: 500; color: #E8E4DF;">Hina</p>
						<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 10px; color: #10B981;">Online</p>
					</div>
				</div>

				<!-- Message viewport (overflow hidden — scroll driven by GSAP) -->
				<div class="hina-chat-viewport" style="flex: 1; overflow: hidden; position: relative;">
					<div class="hina-chat-content" style="position: absolute; top: 0; left: 0; right: 0; display: flex; flex-direction: column; gap: 16px; padding-top: 120px; padding-bottom: 250px;">
						<!-- Him: stayed up til 4am -->
						<div style="max-width: 75%; margin-left: auto; padding: 8px 12px; background-color: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px 12px 4px 12px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">i can't believe we stayed up til 4am talking last night</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">11:42 PM</p>
						</div>
						<!-- Her: well you had a lot on your mind -->
						<div style="max-width: 75%; padding: 8px 12px; background-color: rgba(174,13,70,0.08); border: 1px solid rgba(174,13,70,0.10); border-radius: 12px 12px 12px 4px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">well you had a lot on your mind</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">11:42 PM</p>
						</div>
						<!-- Him: i don't really have anyone else -->
						<div style="max-width: 75%; margin-left: auto; padding: 8px 12px; background-color: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px 12px 4px 12px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">yeah... i don't really have anyone else i can talk to like that</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">11:42 PM</p>
						</div>
						<!-- Him: can i ask you something weird -->
						<div style="max-width: 75%; margin-left: auto; padding: 8px 12px; background-color: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px 12px 4px 12px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">can i ask you something weird</p>
						</div>
						<!-- Her: yeah? weird is my specialty -->
						<div style="max-width: 75%; padding: 8px 12px; background-color: rgba(174,13,70,0.08); border: 1px solid rgba(174,13,70,0.10); border-radius: 12px 12px 12px 4px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">yeah? weird is my specialty</p>
						</div>
						<!-- Him: do you think i'm... worth listening to? — THE CLIFFHANGER -->
						<div style="max-width: 75%; margin-left: auto; padding: 8px 12px; background-color: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px 12px 4px 12px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">do you think i'm... worth listening to? like in general</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">11:42 PM</p>
						</div>
						<!-- Her: inner voice — magenta italic -->
						<div style="max-width: 75%; padding: 4px 12px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 12px; line-height: 1.6; color: #AE0D46; opacity: 0.6; font-style: italic;">god. the way he said that.</p>
						</div>
						<!-- Her: yes. -->
						<div style="max-width: 75%; padding: 8px 12px; background-color: rgba(174,13,70,0.08); border: 1px solid rgba(174,13,70,0.10); border-radius: 12px 12px 12px 4px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">yes.</p>
						</div>
						<!-- Her: yes you are -->
						<div style="max-width: 75%; padding: 8px 12px; background-color: rgba(174,13,70,0.08); border: 1px solid rgba(174,13,70,0.10); border-radius: 12px 12px 12px 4px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">yes you are</p>
						</div>
						<!-- Her: You are absolutely worth listening to -->
						<div style="max-width: 75%; padding: 8px 12px; background-color: rgba(174,13,70,0.08); border: 1px solid rgba(174,13,70,0.10); border-radius: 12px 12px 12px 4px;">
							<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; line-height: 1.6; color: #E8E4DF; opacity: 0.8;">You are absolutely worth listening to</p>
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px; text-align: right;">11:42 PM</p>
						</div>
						<!-- Her: AGK selfie -->
						<div style="max-width: 180px;">
							<img src="/hina-agk.jpg" alt="" style="width: 100%; border-radius: 12px; display: block;" />
							<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 9px; color: #E8E4DF; opacity: 0.3; margin-top: 4px;">11:42 PM</p>
						</div>
					</div>
				</div>

				<!-- Input bar -->
				<div style="margin-top: 12px; display: flex; gap: 8px; align-items: center;">
					<div style="flex: 1; padding: 10px 14px; background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px;">
						<p style="font-family: 'iA Writer Quattro V', 'iA Writer Quattro S', monospace; font-size: 13px; color: #E8E4DF; opacity: 0.25;">Message Hina...</p>
					</div>
					<div style="width: 36px; height: 36px; border-radius: 50%; background-color: rgba(174,13,70,0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8E4DF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.4;"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
					</div>
				</div>
				</div>
			</div>
		</div>

<!-- Block 8: Final CTA + Footer -->
		<div style="max-width: 1120px; margin: 0 auto; padding: 80px clamp(24px, 4vw, 48px) 0;">

			<!-- Final CTA -->
			<div style="text-align: center; margin-bottom: 80px;">
				<h2 style="font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 500; font-size: clamp(28px, 3vw, 48px); color: #E8E4DF; margin-bottom: 16px;">Ready to meet her?</h2>
				<p style="font-family: 'Inter', system-ui, sans-serif; font-size: clamp(14px, 1.1vw, 16px); color: #E8E4DF; opacity: 0.6; margin-bottom: 32px;">She's waiting.</p>
				<div style="display: flex; gap: 12px; max-width: 420px; margin: 0 auto;">
					<input
						type="email"
						placeholder="your email address"
						style="flex: 1; padding: 12px 16px; background-color: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.25); border-radius: 8px; color: #E8E4DF; font-family: 'Inter', system-ui, sans-serif; font-size: 0.9rem; outline: none;"
					/>
					<button use:shimmerAction style="position: relative; padding: 12px 24px; background-color: #AE0D46; color: #E8E4DF; border: none; border-radius: 8px; font-family: 'Inter', system-ui, sans-serif; font-size: 0.9rem; font-weight: 500; cursor: pointer; white-space: nowrap; letter-spacing: 0.02em; overflow: hidden;">
						Join the waitlist
						<div data-shimmer style="position: absolute; inset: 0; transform: translateX(-100%); background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 40%, rgba(255,255,255,0.2) 60%, transparent 100%);"></div>
					</button>
				</div>
			</div>

			<!-- Footer links -->
			<div style="display: flex; justify-content: center; gap: 32px; margin-bottom: 48px;">
				<a href="#" style="font-family: 'JetBrains Mono', monospace; font-size: 12.8px; color: #E8E4DF; opacity: 0.4; text-decoration: none;">Blog</a>
				<a href="#" style="font-family: 'JetBrains Mono', monospace; font-size: 12.8px; color: #E8E4DF; opacity: 0.4; text-decoration: none;">Impressum</a>
				<a href="#" style="font-family: 'JetBrains Mono', monospace; font-size: 12.8px; color: #E8E4DF; opacity: 0.4; text-decoration: none;">Kontakt</a>
				<a href="#" style="font-family: 'JetBrains Mono', monospace; font-size: 12.8px; color: #E8E4DF; opacity: 0.4; text-decoration: none;">Datenschutz</a>
			</div>

		</div>

		<!-- Watermark wordmark — full bleed, tight viewBox, descenders flush with page bottom -->
		<div style="overflow: hidden; padding: 0; margin: 0; line-height: 0;">
			<svg viewBox="350 1850 3500 480" preserveAspectRatio="xMidYMax meet" style="width: 100%; opacity: 0.04; display: block;">
				<g transform="translate(0.000000,4096.000000) scale(0.100000,-0.100000)" fill="#E8E4DF" stroke="none">
					<path d="M6275 22324 c-219 -20 -344 -56 -492 -142 -90 -53 -236 -166 -291 -226 -23 -25 -47 -46 -52 -46 -6 0 -10 15 -11 33 -5 197 -17 359 -27 369 -9 9 -22 7 -59 -12 -252 -124 -517 -226 -663 -255 -77 -15 -113 -36 -94 -55 6 -6 51 -17 99 -25 118 -19 157 -45 198 -133 l32 -67 0 -1800 0 -1800 -29 -58 c-43 -85 -89 -121 -174 -141 -39 -9 -81 -16 -94 -16 -37 0 -55 -16 -42 -37 11 -17 47 -18 605 -18 l594 0 0 25 c0 23 -5 25 -93 42 -102 19 -146 41 -186 93 -56 73 -56 72 -56 808 0 555 2 677 13 677 8 0 51 -16 98 -37 183 -79 321 -106 609 -119 521 -24 975 195 1242 602 186 283 269 563 269 915 0 297 -54 538 -172 766 -147 283 -422 513 -716 598 -157 46 -375 71 -508 59z m110 -195 c356 -125 592 -472 687 -1009 20 -116 17 -520 -5 -640 -67 -360 -173 -595 -351 -778 -165 -171 -395 -258 -613 -232 -48 6 -110 18 -138 27 -197 63 -379 223 -465 408 -70 150 -71 163 -68 1044 l3 766 32 66 c23 46 57 89 115 147 103 101 136 126 218 165 115 53 179 66 347 66 144 1 156 0 238 -30z"/>
					<path d="M10820 22324 c-79 -12 -142 -30 -207 -60 -197 -89 -459 -342 -564 -544 -18 -35 -48 -55 -49 -32 -3 68 -8 298 -9 440 -1 215 -1 214 -95 163 -136 -74 -353 -162 -546 -220 -178 -55 -185 -57 -185 -72 0 -16 70 -37 126 -38 24 -1 54 -13 85 -33 61 -41 93 -104 106 -208 5 -42 7 -498 6 -1025 -4 -1056 0 -1000 -73 -1100 -47 -65 -95 -92 -195 -109 -80 -13 -99 -26 -74 -47 14 -12 114 -14 588 -16 314 -1 579 1 589 3 43 13 7 64 -46 64 -100 0 -218 90 -250 189 -34 107 -38 228 -35 1001 l4 755 23 70 c36 110 123 249 210 334 88 86 119 101 222 108 103 8 151 -15 216 -100 117 -156 170 -192 283 -192 141 0 251 65 301 178 32 72 33 211 2 277 -72 152 -251 240 -433 214z"/>
					<path d="M13785 22314 c-212 -33 -500 -150 -656 -265 -173 -128 -334 -317 -424 -497 -112 -224 -159 -433 -159 -712 0 -410 125 -744 384 -1022 196 -211 394 -326 690 -399 202 -50 594 -50 810 2 496 117 893 516 1025 1029 45 175 59 458 31 630 -57 348 -191 617 -420 845 -108 107 -221 185 -371 256 -138 65 -194 84 -325 115 -139 33 -431 42 -585 18z m410 -99 c180 -48 341 -166 451 -330 146 -216 209 -396 265 -750 17 -107 18 -475 1 -590 -39 -266 -155 -590 -268 -745 -128 -178 -267 -282 -439 -331 -67 -19 -293 -19 -360 0 -166 46 -358 193 -460 350 -274 424 -342 1107 -168 1686 69 229 175 409 322 547 90 85 206 149 312 173 80 18 259 13 344 -10z"/>
					<path d="M22315 22324 c-278 -20 -467 -76 -700 -208 -99 -56 -251 -174 -332 -257 -178 -185 -307 -434 -365 -707 -33 -153 -33 -445 0 -609 44 -218 128 -423 240 -582 61 -89 240 -264 333 -328 237 -163 475 -234 855 -258 88 -5 314 13 434 36 117 22 276 84 395 154 297 175 504 417 626 734 91 236 119 585 68 841 -25 120 -91 315 -136 400 -94 175 -246 357 -407 486 -100 80 -322 193 -461 234 -158 48 -396 75 -550 64z m318 -124 c110 -41 192 -94 284 -188 221 -224 357 -590 383 -1034 24 -406 -31 -725 -181 -1043 -62 -133 -168 -260 -289 -349 -86 -64 -142 -91 -236 -116 -214 -57 -437 -28 -604 78 -73 46 -214 189 -273 277 -183 273 -281 735 -249 1178 22 296 78 514 192 737 77 151 215 310 339 388 139 89 226 112 411 108 124 -3 142 -5 223 -36z"/>
					<path d="M26500 22324 c-14 -2 -56 -9 -95 -15 -89 -14 -297 -89 -395 -141 -225 -121 -407 -285 -547 -493 -179 -266 -266 -636 -235 -998 33 -385 168 -690 409 -929 259 -255 552 -371 943 -371 342 0 624 107 837 315 50 50 76 69 88 64 15 -5 16 -69 13 -793 -4 -749 -5 -791 -23 -843 -36 -101 -114 -153 -250 -167 -82 -8 -102 -25 -69 -58 15 -15 71 -16 596 -14 618 2 634 4 595 47 -13 14 -46 25 -105 36 -111 20 -156 50 -197 131 l-30 59 -5 2085 c-5 1947 -6 2086 -22 2089 -10 2 -52 -29 -104 -78 -113 -104 -239 -200 -266 -200 -11 0 -60 25 -110 56 -160 98 -332 164 -525 199 -84 15 -445 29 -503 19z m380 -99 c249 -52 437 -204 545 -439 89 -192 97 -294 93 -1166 l-3 -665 -24 -50 c-49 -101 -217 -241 -356 -298 -131 -53 -225 -70 -360 -64 -239 11 -429 91 -585 246 -208 206 -317 455 -371 841 -17 121 -15 413 4 540 20 131 59 297 94 393 55 153 165 339 261 440 111 117 274 202 442 230 59 10 194 6 260 -8z"/>
					<path d="M35250 22325 c-8 -2 -49 -8 -90 -15 -100 -15 -214 -52 -330 -107 -332 -158 -557 -407 -696 -769 -62 -162 -94 -326 -101 -520 -11 -306 45 -582 168 -826 96 -191 298 -414 464 -514 319 -192 725 -250 1075 -154 99 27 229 78 277 108 158 98 203 131 286 214 104 104 198 218 224 272 16 34 16 37 0 53 -16 16 -22 11 -104 -71 -117 -118 -175 -165 -255 -209 -76 -42 -219 -99 -293 -116 -145 -33 -345 -32 -488 4 -95 24 -272 116 -355 186 -270 224 -432 657 -432 1153 0 107 4 147 14 162 14 19 36 19 968 19 542 0 959 4 967 9 31 20 -5 301 -57 448 -32 89 -51 127 -114 219 -161 238 -431 398 -745 443 -95 14 -334 20 -383 11z m304 -101 c97 -25 170 -70 244 -149 72 -77 115 -153 158 -282 22 -64 27 -102 32 -215 6 -175 -5 -213 -73 -246 -45 -22 -48 -22 -661 -22 -531 0 -615 2 -620 15 -17 42 60 314 127 449 113 227 297 395 489 445 93 24 221 27 304 5z"/>
					<path d="M16662 22274 c-26 -19 -6 -52 36 -60 128 -22 181 -37 230 -66 60 -36 125 -115 165 -201 53 -114 82 -178 139 -317 71 -170 150 -357 208 -490 23 -52 68 -158 100 -235 32 -77 76 -180 98 -230 22 -49 64 -146 92 -215 81 -192 206 -483 239 -552 16 -35 39 -85 51 -113 71 -158 125 -277 152 -333 l30 -63 65 3 64 3 24 45 c34 64 85 177 140 310 98 237 205 490 275 650 39 91 105 244 147 340 41 96 86 200 100 230 46 100 153 342 153 345 0 2 19 43 41 92 23 48 52 116 65 150 35 93 160 339 209 413 85 127 171 184 336 221 99 23 126 37 116 63 -6 14 -58 16 -481 16 -261 0 -481 -3 -490 -6 -18 -7 -21 -39 -5 -50 6 -4 46 -14 88 -24 99 -22 167 -56 205 -104 30 -37 31 -41 30 -135 -1 -79 -6 -111 -31 -181 -36 -99 -128 -326 -144 -355 -7 -10 -47 -100 -89 -200 -42 -99 -139 -324 -215 -500 -75 -176 -150 -354 -167 -395 -16 -41 -39 -95 -49 -120 -11 -25 -32 -73 -47 -107 -17 -38 -33 -63 -43 -63 -15 0 -52 81 -230 510 -28 69 -65 154 -82 190 -16 36 -40 92 -52 125 -29 75 -77 187 -121 283 -19 41 -34 76 -34 79 0 2 -66 160 -146 350 -155 368 -170 419 -144 497 27 82 83 119 215 141 64 10 75 15 75 35 0 12 -9 22 -23 25 -46 12 -1279 11 -1295 -1z"/>
					<path d="M29684 22265 c-10 -25 12 -41 72 -54 104 -24 190 -75 219 -132 46 -89 47 -111 55 -1109 7 -920 8 -947 28 -1028 30 -114 69 -194 140 -287 82 -109 185 -185 319 -236 76 -29 220 -49 347 -49 212 0 388 46 564 147 126 72 195 128 315 252 57 60 102 99 109 95 8 -5 9 -72 5 -235 -7 -258 -7 -258 60 -240 197 55 538 130 710 157 37 6 60 36 40 52 -6 6 -44 15 -83 20 -108 15 -165 54 -200 137 -24 58 -26 146 -27 1395 l-2 1125 -430 0 -430 0 0 -24 c0 -22 7 -26 70 -38 169 -34 257 -115 285 -260 5 -31 10 -423 12 -970 l2 -918 -36 -71 c-64 -124 -162 -213 -318 -290 -209 -103 -501 -112 -689 -21 -135 65 -214 186 -274 422 -7 25 -12 429 -16 1105 l-6 1065 -418 3 c-366 2 -418 0 -423 -13z"/>
				</g>
			</svg>
		</div>

		<!-- Draggable Rulers -->
		<div use:rulerTool style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 9998; pointer-events: none;"></div>

	</div>
	{/if}

</div>

<style>
	.roster-card {
		flex-shrink: 0;
		width: 220px;
		aspect-ratio: 9 / 16;
		border-radius: 24px;
		overflow: hidden;
		position: relative;
		cursor: pointer;
		box-shadow: 0 0 80px 20px rgba(174,13,70,0.03);
	}
	.roster-card img {
		transition: transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1);
	}
	.roster-card:hover img {
		transform: scale(1.05);
		transition: transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1);
	}
	.promise-photo {
		flex-shrink: 0;
		width: 220px;
		aspect-ratio: 9 / 16;
		border-radius: 24px;
		overflow: hidden;
		background: #0B0D10;
		transition: width 0.8s cubic-bezier(0.25, 0.1, 0.25, 1);
		cursor: pointer;
	}
	.promise-photo:hover {
		width: 374px;
		transition: width 0.6s cubic-bezier(0.25, 0.1, 0.25, 1);
	}
	.promise-photo img {
		width: 102%;
		height: 102%;
		object-fit: cover;
		position: relative;
		top: -1%;
		left: -1%;
	}
	@keyframes glowPulse {
		0%, 100% {
			box-shadow:
				inset 0 1px 0 rgba(255,255,255,0.1),
				rgba(0,0,0,0.2) 0 0 0 1px,
				rgba(8,9,10,0.4) 0 16px 64px,
				0 0 60px 15px rgba(174,13,70,0.08);
		}
		50% {
			box-shadow:
				inset 0 1px 0 rgba(255,255,255,0.1),
				rgba(0,0,0,0.2) 0 0 0 1px,
				rgba(8,9,10,0.4) 0 16px 64px,
				0 0 60px 15px rgba(174,13,70,0.04);
		}
	}
	.vignette-glow-pulse {
		animation: glowPulse 4s ease-in-out infinite;
	}
</style>
