<script lang="ts">
	import Nav from '$lib/components/lisbon/Nav.svelte';

	let { children } = $props();
</script>

<Nav />
<div class="page-content">
	{@render children()}
</div>

<style>
	.page-content {
		padding-top: 64px;
	}

	@media (max-width: 768px) {
		.page-content {
			padding-top: 48px;
		}
	}
</style>
