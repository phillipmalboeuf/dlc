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
	import { onMount } from 'svelte'

	import Navigation from '$components/Navigation'
	import Document from '$components/document'
	import Picture from '$components/Picture'

	export let content

	function entry(id) {
		return content.includes.Entry.find(entry => entry.sys.id === id)
	}

	function asset(id) {
		return content.includes.Asset.find(asset => asset.sys.id === id)
	}

	const page = content.items[0]
	const sections = page.fields.sections
		.map(section => entry(section.sys.id))

	const heroMedia = asset(page.fields.heroMedia.sys.id)

	let y
	let header
	let stuck

	onMount(() => {
		const observer = new IntersectionObserver( 
			([e]) => stuck = e.intersectionRatio < 1,
			{ threshold: [1] }
		)

		observer.observe(header)
	})

	
</script>

<svelte:window bind:scrollY={y} />

<section class='hero'>
	<div>
		<h2>{page.fields.heroTopTagline}</h2>
		<figure>
			<Picture media={heroMedia} />
			<figcaption><h6>{@html heroMedia.fields.title}</h6></figcaption>
		</figure>
		<h2>{page.fields.heroBottomTagline}</h2>
	</div>
</section>

<header bind:this={header} class:stuck>
	<Navigation {sections} contact={page.fields.contactUrl} playlists={page.fields.playlistsUrl} />
</header>

<section>
	<Document body={page.fields.introduction} />
</section>

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
		background: var(--brown);
		/* transition: background-color 333ms; */
	}

	header :global(a),
	footer :global(a) {
		color: var(--beige);
		/* transition: color 333ms; */
	}

	header {
		position: sticky;
		position: -webkit-sticky;
		top: -1px;
		z-index: 2;
	}

	header.stuck { background: var(--beige); }
	header.stuck :global(a) { color: var(--darkbrown); }

	footer {
		top: auto;
		bottom: 0;
		z-index: -1;
		background: var(--darkbrown);
	}

	section {
		position: relative;
		z-index: 1;
		padding: 10rem 10vw;
		background: var(--beige);
	}

	section.hero {
		padding: 2rem 10vw;
		height: calc(100vh - 5rem);
		text-align: center;
		color: var(--beige);
		background: var(--brown);
	}

		section.hero div {
			padding: 1rem;
			border: 1px solid;
		}

		section.hero :global(img) {
			margin: 2rem 0;
			width: 50vh;
			height: 50vh;
			object-fit: cover;
    	object-position: center;
		}

	figure {
		position: relative;
		margin: 0;
	}
		figcaption {
			position: absolute;
			top: 50%;
			left: 0;
			width: 100%;
			transform: translateY(-50%);
		}

	section > h1 {
		color: var(--brown);
	}
</style>