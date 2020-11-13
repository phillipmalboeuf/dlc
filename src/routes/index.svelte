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
	import Document from '$components/document'

	export let content
	const page = content.items[0]
	const sections = page.fields.sections
		.map(section => content.includes.Entry.find(entry => entry.sys.id === section.sys.id))
</script>

<nav>
	{#each sections as section}
	<a href="#{section.fields.identifier}">{section.fields.title}</a>
	{/each}
</nav>

{#each sections as section}
<section id={section.fields.identifier}>
	<h1>{section.fields.title}</h1>
	<Document body={section.fields.body} />
</section>
{/each}

<style>
	nav {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		padding: 1rem;
		background: var(--beige);
	}
</style>