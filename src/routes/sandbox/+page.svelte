<script>
	import { onMount } from 'svelte';
	import { getSvgPath } from 'figma-squircle';

	let squirclePath24 = $state('');
	let squirclePath12 = $state('');
	let card1;
	let card2;

	onMount(() => {
		// Generate squircle paths after mount so we know the card dimensions
		const rect1 = card1?.getBoundingClientRect();
		const rect2 = card2?.getBoundingClientRect();

		if (rect1) {
			squirclePath24 = getSvgPath({
				width: rect1.width,
				height: rect1.height,
				cornerRadius: 24,
				cornerSmoothing: 0.6  // Apple's iOS uses ~0.6
			});
		}
		if (rect2) {
			squirclePath12 = getSvgPath({
				width: rect2.width,
				height: rect2.height,
				cornerRadius: 12,
				cornerSmoothing: 0.6
			});
		}
	});
</script>

<div class="min-h-screen" style="background-color: #0B0D10;">
	<div style="max-width: 900px; margin: 0 auto; padding: 80px 32px;">
		<p style="
			font-family: 'JetBrains Mono', monospace;
			font-size: 11px;
			color: rgba(232,228,223,0.4);
			margin-bottom: 40px;
		">Left: standard border-radius — Right: figma-squircle (iOS continuous corners, smoothing 0.6)</p>

		<!-- 24px comparison -->
		<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-bottom: 60px;">
			<!-- Standard 24px -->
			<div>
				<div style="
					border: 1px solid rgba(255,255,255, 0.08);
					border-radius: 24px;
					overflow: hidden;
				">
					<img src="/sandbox/girls/sophie.jpg" alt="Sophie" style="width: 100%; aspect-ratio: 3/4; object-fit: cover; display: block;" />
					<div style="padding: 20px;">
						<h3 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.4rem; font-weight: 500; color: #E8E4DF; margin-bottom: 6px;">Sophie</h3>
						<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.85rem; line-height: 1.5; color: #E8E4DF; opacity: 0.8;">She remembers the way you like your coffee.</p>
					</div>
				</div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: rgba(232,228,223,0.4); margin-top: 12px; text-align: center;">Standard border-radius: 24px</p>
			</div>

			<!-- Squircle 24px -->
			<div>
				<div
					bind:this={card1}
					style="
						overflow: hidden;
						{squirclePath24 ? `clip-path: path('${squirclePath24}');` : 'border-radius: 24px;'}
					"
				>
					<img src="/sandbox/girls/sophie.jpg" alt="Sophie" style="width: 100%; aspect-ratio: 3/4; object-fit: cover; display: block;" />
					<div style="padding: 20px;">
						<h3 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.4rem; font-weight: 500; color: #E8E4DF; margin-bottom: 6px;">Sophie</h3>
						<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.85rem; line-height: 1.5; color: #E8E4DF; opacity: 0.8;">She remembers the way you like your coffee.</p>
					</div>
				</div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: rgba(232,228,223,0.4); margin-top: 12px; text-align: center;">Apple squircle: 24px, smoothing 0.6</p>
			</div>
		</div>

		<!-- 12px comparison -->
		<p style="
			font-family: 'JetBrains Mono', monospace;
			font-size: 11px;
			color: rgba(232,228,223,0.4);
			margin-bottom: 24px;
		">Same at 12px radius</p>

		<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px;">
			<!-- Standard 12px -->
			<div>
				<div style="
					border: 1px solid rgba(255,255,255, 0.08);
					border-radius: 12px;
					overflow: hidden;
				">
					<img src="/sandbox/girls/valentina.jpg" alt="Valentina" style="width: 100%; aspect-ratio: 3/4; object-fit: cover; display: block;" />
					<div style="padding: 20px;">
						<h3 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.4rem; font-weight: 500; color: #E8E4DF;">Valentina</h3>
					</div>
				</div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: rgba(232,228,223,0.4); margin-top: 12px; text-align: center;">Standard 12px</p>
			</div>

			<!-- Squircle 12px -->
			<div>
				<div
					bind:this={card2}
					style="
						overflow: hidden;
						{squirclePath12 ? `clip-path: path('${squirclePath12}');` : 'border-radius: 12px;'}
					"
				>
					<img src="/sandbox/girls/valentina.jpg" alt="Valentina" style="width: 100%; aspect-ratio: 3/4; object-fit: cover; display: block;" />
					<div style="padding: 20px;">
						<h3 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.4rem; font-weight: 500; color: #E8E4DF;">Valentina</h3>
					</div>
				</div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: rgba(232,228,223,0.4); margin-top: 12px; text-align: center;">Squircle 12px</p>
			</div>
		</div>
	</div>
</div>
