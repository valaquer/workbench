<script lang="ts">
	type Props = {
		src: string;
		caption: string;
		rotation?: number;
		class?: string;
	};

	let { src, caption, rotation = 0, class: className = '' }: Props = $props();
</script>

<div
	class="bg-cream p-2.5 pb-10 shadow-xl hover:rotate-0 transition-transform duration-300 hover:shadow-2xl {className}"
	style:transform="rotate({rotation}deg)"
>
	<div class="w-44 h-44 overflow-hidden">
		<img {src} alt={caption} class="w-full h-full object-cover" loading="lazy" />
	</div>
	<p class="text-dark/80 font-medium text-center mt-3 font-satoshi text-sm">{caption}</p>
</div>
