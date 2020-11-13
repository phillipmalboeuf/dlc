<script context="module">
	const contentful = {
		space: '4pr30xezuxn1',
		accessToken: '7vJK8ulctiSCdZ0qukMt1VazK-JKWaDAYk9kY2YoYy8'
	}

	export async function preload({ params, query }) {
		const response = await this.fetch(`https://cdn.contentful.com/spaces/${contentful.space}/entries?access_token=${contentful.accessToken}&content_type=page&include=3`)

		return { content: (await response.json()) }
	}
</script>

<script>
	import Navigation from '$components/Navigation'
	import Document from '$components/document'

	export let content
	const page = content.items[0]
	const sections = page.fields.sections
		.map(section => content.includes.Entry.find(entry => entry.sys.id === section.sys.id))
</script>

<header>
	<Navigation {sections} contact={page.fields.contactUrl} playlists={page.fields.playlistsUrl} />
</header>

{#each sections as section}
<section id={section.fields.identifier}>
	<h1>{section.fields.title}</h1>
	<Document body={section.fields.body} />
</section>
{/each}

<footer>
	<Navigation {sections} contact={page.fields.contactUrl} playlists={page.fields.playlistsUrl} />
</footer>

<style>
	header,
	footer {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background: var(--beige);
	}

	header {
		z-index: 2;
	}

	header :global(a) { color: var(--darkbrown); }

	footer {
		top: auto;
		bottom: 0;
		z-index: -1;
		background: var(--darkbrown);
	}

	footer :global(a) { color: var(--beige); }

	section {
		position: relative;
		z-index: 1;
		padding: 10rem 0;
		background: var(--beige);
	}

	section > h1 {
		color: var(--brown);
	}
</style>