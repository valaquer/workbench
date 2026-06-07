<script lang="ts">
	import { marked } from 'marked';

	let { data } = $props();
	let pages = $derived(data.pages);
	let navigation = $derived(data.navigation);
	let validPages = $derived(new Set(data.validPages));

	let selectedPage = $state('Home');

	function selectPage(slug: string) {
		selectedPage = slug;
	}

	function renderMarkdown(content: string): string {
		// Convert wikilinks to clickable links or plain text
		const processed = content.replace(/\[\[([^\]]+)\]\]/g, (_, name) => {
			if (validPages.has(name)) {
				return `<a class="wikilink" data-page="${name}" href="#">${name}</a>`;
			}
			return name;
		});
		return marked.parse(processed, { async: false }) as string;
	}

	function handleClick(e: MouseEvent) {
		const target = e.target as HTMLElement;
		if (target.classList.contains('wikilink')) {
			e.preventDefault();
			const page = target.getAttribute('data-page');
			if (page && validPages.has(page)) {
				selectedPage = page;
				// Scroll reading pane to top
				const pane = document.querySelector('.reading-pane');
				if (pane) pane.scrollTop = 0;
			}
		}
	}

	let currentPage = $derived(pages[selectedPage]);
	let renderedContent = $derived(currentPage ? renderMarkdown(currentPage.content) : '');
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="wiki-root" onclick={handleClick}>
	<!-- Sidebar -->
	<nav class="wiki-sidebar">
		<div class="sidebar-title">Wiki</div>

		<button
			class="nav-item home"
			class:active={selectedPage === 'Home'}
			onclick={() => selectPage('Home')}
		>
			Home
		</button>

		{#each navigation as hub}
			<div class="hub-group">
				<button
					class="nav-item hub"
					class:active={selectedPage === hub.slug}
					onclick={() => selectPage(hub.slug)}
				>
					{hub.title}
				</button>

				{#each hub.children as child}
					<button
						class="nav-item child"
						class:active={selectedPage === child.slug}
						onclick={() => selectPage(child.slug)}
					>
						{child.title}
					</button>
				{/each}
			</div>
		{/each}
	</nav>

	<!-- Reading Pane -->
	<main class="reading-pane">
		{#if currentPage}
			<div class="meta-bar">
				{#if currentPage.frontmatter['last-verified']}
					<span class="meta-tag">Verified: {currentPage.frontmatter['last-verified']}</span>
				{/if}
				{#if currentPage.frontmatter.tags}
					<span class="meta-tag">{currentPage.frontmatter.tags}</span>
				{/if}
			</div>
			<article class="wiki-content">
				{@html renderedContent}
			</article>
		{/if}
	</main>
</div>

<style>
	.wiki-root {
		display: grid;
		grid-template-columns: 250px 1fr;
		min-height: 100vh;
		background: #0b0d10;
		color: #e8e4dc;
		font-family: Inter, system-ui, sans-serif;
		font-size: 14px;
		line-height: 1.6;
	}

	/* Sidebar */
	.wiki-sidebar {
		background: #0e1114;
		border-right: 1px dashed #282a30;
		padding: 1rem 0;
		overflow-y: auto;
		height: 100vh;
		position: sticky;
		top: 0;
	}

	.sidebar-title {
		font-family: Inter, system-ui, sans-serif;
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #7a5e4a;
		padding: 0 1.5rem 0.75rem;
	}

	.nav-item {
		display: block;
		width: 100%;
		text-align: left;
		background: none;
		border: none;
		color: #999;
		cursor: pointer;
		padding: 4px 1.5rem;
		font-family: Inter, system-ui, sans-serif;
		font-size: 13px;
		line-height: 1.4;
		transition: color 0.15s;
	}

	.nav-item:hover {
		color: #e8e4dc;
	}

	.nav-item.active {
		color: #e8e4dc;
		background: rgba(122, 94, 74, 0.15);
		border-left: 2px solid #7a5e4a;
	}

	.nav-item.home {
		font-weight: 500;
		margin-bottom: 0.5rem;
	}

	.nav-item.hub {
		font-weight: 500;
		padding-top: 6px;
	}

	.nav-item.child {
		padding-left: 2.5rem;
		font-size: 12px;
		color: #777;
	}

	.nav-item.child:hover {
		color: #bbb;
	}

	.nav-item.child.active {
		color: #e8e4dc;
	}

	.hub-group {
		margin-bottom: 4px;
	}

	/* Reading Pane */
	.reading-pane {
		padding: 2rem 3rem;
		overflow-y: auto;
		height: 100vh;
		max-width: 800px;
	}

	.meta-bar {
		display: flex;
		gap: 1rem;
		margin-bottom: 1.5rem;
		padding-bottom: 0.75rem;
		border-bottom: 1px dashed #282a30;
	}

	.meta-tag {
		font-size: 11px;
		color: #777;
		font-family: 'JetBrains Mono', monospace;
	}

	/* Wiki content markdown styles */
	.wiki-content :global(h1) {
		font-size: 24px;
		font-weight: 600;
		color: #e8e4dc;
		margin: 0 0 1rem;
		line-height: 1.2;
	}

	.wiki-content :global(h2) {
		font-size: 18px;
		font-weight: 600;
		color: #e8e4dc;
		margin: 2rem 0 0.75rem;
		line-height: 1.3;
	}

	.wiki-content :global(h3) {
		font-size: 15px;
		font-weight: 600;
		color: #ccc;
		margin: 1.5rem 0 0.5rem;
	}

	.wiki-content :global(p) {
		margin: 0.75rem 0;
		color: #ccc;
	}

	.wiki-content :global(a) {
		color: #7a5e4a;
		text-decoration: none;
	}

	.wiki-content :global(a:hover) {
		color: #a8836a;
		text-decoration: underline;
	}

	.wiki-content :global(strong) {
		color: #e8e4dc;
		font-weight: 600;
	}

	.wiki-content :global(hr) {
		border: none;
		border-top: 1px dashed #282a30;
		margin: 1.5rem 0;
	}

	.wiki-content :global(ul),
	.wiki-content :global(ol) {
		margin: 0.5rem 0;
		padding-left: 1.5rem;
		color: #ccc;
	}

	.wiki-content :global(li) {
		margin: 0.25rem 0;
	}

	.wiki-content :global(table) {
		width: 100%;
		border-collapse: collapse;
		margin: 1rem 0;
		font-size: 13px;
	}

	.wiki-content :global(th) {
		text-align: left;
		padding: 8px 12px;
		border-bottom: 1px solid #282a30;
		color: #999;
		font-weight: 500;
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.wiki-content :global(td) {
		padding: 8px 12px;
		border-bottom: 1px solid #1a1c20;
		color: #ccc;
		vertical-align: top;
	}

	.wiki-content :global(tr:hover td) {
		background: rgba(122, 94, 74, 0.05);
	}

	.wiki-content :global(blockquote) {
		border-left: 2px solid #7a5e4a;
		margin: 1rem 0;
		padding: 0.5rem 1rem;
		color: #999;
	}

	.wiki-content :global(code) {
		font-family: 'JetBrains Mono', monospace;
		font-size: 12px;
		background: #1a1c20;
		padding: 2px 6px;
		border-radius: 3px;
		color: #a8836a;
	}

	.wiki-content :global(pre) {
		background: #1a1c20;
		padding: 1rem;
		border-radius: 4px;
		overflow-x: auto;
		margin: 1rem 0;
	}

	.wiki-content :global(pre code) {
		background: none;
		padding: 0;
	}
</style>
