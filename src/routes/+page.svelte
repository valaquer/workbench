<script>
	const routes = [
		'/bavaria', '/cernere', '/cydonia', '/lisbon'
	];

	function getVisitHistory() {
		try {
			return JSON.parse(localStorage.getItem('workbench-visits') || '{}');
		} catch { return {}; }
	}

	function recordVisit(route) {
		const visits = getVisitHistory();
		visits[route] = Date.now();
		localStorage.setItem('workbench-visits', JSON.stringify(visits));
	}

	let sortedRoutes = $state(routes);

	$effect(() => {
		const visits = getVisitHistory();
		sortedRoutes = [...routes].sort((a, b) => {
			const aTime = visits[a] || 0;
			const bTime = visits[b] || 0;
			if (aTime && bTime) return bTime - aTime;
			if (aTime) return -1;
			if (bTime) return 1;
			return a.localeCompare(b);
		});
	});
</script>

<nav class="min-h-screen bg-dark px-6 py-12">
	<div class="max-w-7xl mx-auto">
		<h1 class="text-heading text-cream mb-8">Workbench</h1>
		<ul class="space-y-4">
			{#each sortedRoutes as route}
				<li>
					<a href={route} class="text-body text-cream/70 hover:text-cream transition-colors" onclick={() => recordVisit(route)}>
						{route}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>
