<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	import { createClient } from '$lib/supabase/client';

	let { data, children } = $props();

	let supabase = $state(createClient());

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((_, session) => {
			invalidate('supabase:auth');
		});

		return () => subscription.unsubscribe();
	});
</script>

{@render children()}
