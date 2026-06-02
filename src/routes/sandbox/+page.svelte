<script>
</script>

<div class="min-h-screen" style="background-color: #0B0D10;">
	<div style="max-width: 600px; margin: 0 auto; padding: 80px 32px;">
		<p style="
			font-family: 'JetBrains Mono', monospace;
			font-size: 11px;
			color: rgba(232,228,223,0.4);
			margin-bottom: 40px;
			text-align: center;
		">Linear card effect — extracted from live DOM</p>

		<!-- Card with Linear's exact floating effect -->
		<div style="position: relative;">
			<!-- Glow element — radial white gradient positioned top-left (directional light) -->
			<div style="
				position: absolute;
				top: -100px;
				left: -60px;
				width: 400px;
				height: 400px;
				background: radial-gradient(50% 50%, rgba(255, 255, 255, 0.04) 0px, rgba(255, 255, 255, 0) 90%);
				pointer-events: none;
			"></div>

			<!-- The card itself -->
			<div style="
				position: relative;
				background-color: rgba(255, 255, 255, 0.01);
				border: 1px solid rgba(255, 255, 255, 0.08);
				box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 0px 1px, rgba(8, 9, 10, 0.4) 0px 0px 64px 0px;
				border-radius: 12px;
				padding: 24px;
			">
				<h3 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.6rem; font-weight: 500; color: #E8E4DF; margin-bottom: 12px;">Sophie</h3>
				<p style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.9rem; line-height: 1.6; color: #E8E4DF; opacity: 0.8; margin-bottom: 16px;">She remembers the way you like your coffee. The name of your childhood dog. That you hate cilantro.</p>
				<button style="padding: 10px 20px; background-color: #AE0D46; color: #E8E4DF; font-family: 'Inter', system-ui, sans-serif; font-size: 0.8rem; font-weight: 500; border: none; border-radius: 6px;">Meet her</button>
			</div>
		</div>

		<p style="
			font-family: 'JetBrains Mono', monospace;
			font-size: 11px;
			color: rgba(232,228,223,0.4);
			margin-top: 40px;
			line-height: 1.8;
		">
			bg: rgba(255,255,255, 0.01)<br>
			border: 1px solid rgba(255,255,255, 0.08)<br>
			shadow ring: rgba(0,0,0, 0.2) 0 0 0 1px<br>
			shadow ambient: rgba(8,9,10, 0.4) 0 0 64px<br>
			glow: radial-gradient rgba(255,255,255, 0.04) → transparent
		</p>
	</div>
</div>
