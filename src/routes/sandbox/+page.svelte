<script>
	import { onMount } from 'svelte';
	import { getSvgPath } from 'figma-squircle';

	let squirclePath = $state('');
	let card1;

	onMount(() => {
		const rect = card1?.getBoundingClientRect();
		if (rect) {
			squirclePath = getSvgPath({
				width: rect.width,
				height: rect.height,
				cornerRadius: 24,
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
		">Left: standard border-radius 24px — Right: squircle 24px (photo-only card, text overlay)</p>

		<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px;">

			<!-- Standard 24px -->
			<div>
				<div style="
					position: relative;
					border-radius: 24px;
					overflow: hidden;
				">
					<img src="/sandbox/girls/sophie.jpg" alt="Sophie" style="width: 100%; aspect-ratio: 3/4; object-fit: cover; display: block;" />
					<div style="
						position: absolute;
						bottom: 0;
						left: 0;
						right: 0;
						padding: 20px;
						background: linear-gradient(transparent, rgba(0,0,0,0.7));
					">
						<h3 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.4rem; font-weight: 500; color: #E8E4DF;">Sophie</h3>
						<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.75rem; color: #E8E4DF; opacity: 0.7;">25 years old</p>
					</div>
				</div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: rgba(232,228,223,0.4); margin-top: 12px; text-align: center;">Standard border-radius: 24px</p>
			</div>

			<!-- Squircle 24px -->
			<div>
				<div
					bind:this={card1}
					style="
						position: relative;
						overflow: hidden;
						{squirclePath ? `clip-path: path('${squirclePath}');` : 'border-radius: 24px;'}
					"
				>
					<img src="/sandbox/girls/sophie.jpg" alt="Sophie" style="width: 100%; aspect-ratio: 3/4; object-fit: cover; display: block;" />
					<div style="
						position: absolute;
						bottom: 0;
						left: 0;
						right: 0;
						padding: 20px;
						background: linear-gradient(transparent, rgba(0,0,0,0.7));
					">
						<h3 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.4rem; font-weight: 500; color: #E8E4DF;">Sophie</h3>
						<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.75rem; color: #E8E4DF; opacity: 0.7;">25 years old</p>
					</div>
				</div>
				<p style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: rgba(232,228,223,0.4); margin-top: 12px; text-align: center;">Apple squircle: 24px, smoothing 0.6</p>
			</div>

		</div>
	</div>
</div>
