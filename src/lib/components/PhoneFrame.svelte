<script lang="ts">
	type Props = {
		children: any;
		animate?: boolean;
		rotate?: number;
		glow?: boolean;
		class?: string;
	};

	let { children, animate = false, rotate = 0, glow = false, class: className = '' }: Props = $props();
</script>

<div
	class="relative {className}"
	style:transform={rotate ? `rotate(${rotate}deg)` : undefined}
>
	<!-- Magenta glow orbs behind phone -->
	{#if glow}
		<div class="absolute -inset-12 -z-10 pointer-events-none">
			<div class="absolute top-1/4 -left-8 w-48 h-48 bg-magenta/20 rounded-full blur-3xl animate-[pulse_3s_ease-in-out_infinite]"></div>
			<div class="absolute bottom-1/4 -right-8 w-48 h-48 bg-magenta/15 rounded-full blur-3xl animate-[pulse_3s_ease-in-out_infinite_1.5s]"></div>
		</div>
	{/if}

	<!-- Phone body -->
	<div
		class="relative w-[320px] md:w-[375px] bg-[#1a1a1a] rounded-[40px] border-2 border-cream/10 overflow-hidden shadow-2xl"
		class:animate-[float_3s_ease-in-out_infinite]={animate}
	>
		<!-- Notch -->
		<div class="relative h-8 bg-[#1a1a1a] flex justify-center items-end pb-1">
			<div class="w-28 h-5 bg-dark rounded-b-2xl"></div>
		</div>

		<!-- Screen area -->
		<div class="bg-dark mx-1 mb-1 rounded-b-[36px] overflow-hidden">
			<!-- Status bar -->
			<div class="flex justify-between items-center px-6 py-2 text-[10px] text-cream/40 font-mono">
				<span>9:41</span>
				<div class="flex items-center gap-1">
					<svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>
					<svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
				</div>
			</div>

			<!-- Chat header -->
			<div class="flex items-center gap-3 px-4 py-3 border-b border-cream/10">
				<div class="w-8 h-8 rounded-full bg-magenta/30 flex items-center justify-center">
					<span class="text-xs text-magenta font-medium">S</span>
				</div>
				<div>
					<p class="text-sm text-cream font-medium font-satoshi">Sophie</p>
					<p class="text-[10px] text-emerald/70">Online</p>
				</div>
			</div>

			<!-- Chat messages -->
			<div class="px-3 py-4 space-y-3 min-h-[280px]">
				{@render children()}
			</div>

			<!-- Input bar -->
			<div class="flex items-center gap-2 px-3 py-3 border-t border-cream/10">
				<div class="flex-1 h-9 bg-cream/[0.05] border border-cream/10 rounded-full px-4 flex items-center">
					<span class="text-xs text-cream/30">Message Sophie...</span>
				</div>
				<div class="w-9 h-9 rounded-full bg-magenta/20 flex items-center justify-center">
					<svg class="w-4 h-4 text-magenta" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
				</div>
			</div>
		</div>
	</div>
</div>
