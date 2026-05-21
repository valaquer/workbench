<script lang="ts">
	type Props = {
		sender: 'sophie' | 'user';
		children: any;
		image?: boolean;
	};

	let { sender, children, image = false }: Props = $props();
</script>

{#if sender === 'sophie'}
	<div class="flex justify-start">
		<div class="max-w-[80%] px-4 py-3 bg-magenta/[0.08] border border-magenta/20 rounded-2xl rounded-bl-md text-body text-cream/90">
			{#if image}
				<!-- Image placeholder: blurred gradient implying a photo was sent -->
				<div class="w-48 h-32 rounded-lg bg-gradient-to-br from-magenta/20 to-magenta/5 flex items-center justify-center mb-2">
					<svg class="w-6 h-6 text-magenta/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
						<circle cx="12" cy="13" r="4" />
					</svg>
				</div>
			{/if}
			{@render children()}
		</div>
	</div>
{:else}
	<div class="flex justify-end">
		<div class="max-w-[80%] px-4 py-3 bg-cream/[0.08] border border-cream/10 rounded-2xl rounded-br-md text-body text-cream/70">
			{@render children()}
		</div>
	</div>
{/if}
