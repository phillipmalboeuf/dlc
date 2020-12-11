<script context="module">
	const contentful = {
		space: '4pr30xezuxn1',
		accessToken: '7vJK8ulctiSCdZ0qukMt1VazK-JKWaDAYk9kY2YoYy8'
	}

	export async function preload({ params, query }) {
		const response = await this.fetch(`https://cdn.contentful.com/spaces/${contentful.space}/entries?access_token=${contentful.accessToken}&content_type=page&include=4`)

		return { content: (await response.json()) }
	}
</script>

<script>
	import { onMount, setContext } from 'svelte'

	import Navigation from '$components/Navigation'
	import Document from '$components/document'
	import Picture from '$components/Picture'
	import AnimatedText from '$components/AnimatedText'
	import Sections from '$components/Sections'

	export let content

	function entry(id) {
		return content.includes.Entry.find(entry => entry.sys.id === id)
	}

	function asset(id) {
		return content.includes.Asset.find(asset => asset.sys.id === id)
	}

	setContext('entry', entry)
	setContext('asset', asset)

	const page = content.items[0]
	const sections = page.fields.sections
		.map(section => entry(section.sys.id))

	const heroMedia = asset(page.fields.heroMedia.sys.id)

	let header
	let hero
	let stuck
	let scrolled

	onMount(() => {
		const observer = new IntersectionObserver( 
			([e]) => stuck = e.intersectionRatio < 1,
			{ threshold: [1] }
		)

		observer.observe(header)

		const scrolledObserver = new IntersectionObserver( 
			([e]) => scrolled = !e.isIntersecting,
			{ threshold: [0] }
		)

		scrolledObserver.observe(hero)
	})
	
</script>

<section bind:this={hero} class='hero'>
	<div>
		<h2><AnimatedText text={page.fields.heroTopTagline} /></h2>
		<figure>
			<Picture media={heroMedia} small />
			<figcaption><h5>{@html heroMedia.fields.title}</h5></figcaption>
		</figure>
		<h2><AnimatedText text={page.fields.heroBottomTagline} /></h2>
	</div>
</section>

<header bind:this={header} class:stuck class:scrolled>
	<Navigation {sections} contact={page.fields.contactUrl} playlists={page.fields.playlistsUrl} logotype={!stuck} menu />
</header>

<section class='intro' id={'manifesto'}>
	<Document body={page.fields.introduction} />
</section>

<Sections sections={sections} contactUrl={page.fields.contactUrl} playlistsUrl={page.fields.playlistsUrl} />

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
		transition: background-color 333ms;
	}

	header :global(a),
	footer :global(a) {
		color: var(--beige);
		transition: color 333ms;
	}

	header {
		position: sticky;
		position: -webkit-sticky;
		top: -1px;
		z-index: 2;
	}

	@media (max-width: 900px) {
	header {
		position: fixed;
	}
	}

	header.scrolled { background: var(--backgroundcolor); }
	header.scrolled :global(a) { color: var(--headingcolor); }
	header:not(.scrolled) :global(.menu > button) { color: var(--backgroundcolor); }

	footer {
		top: auto;
		bottom: 0;
		z-index: -1;
		background: var(--darkbrown);
	}

	section {
		padding: 10vh 10vw;
		color: var(--textcolor);
		background: var(--backgroundcolor);
		transition: background-color 333ms, color 333ms;
	}

	@media (max-width: 1200px) {
	section {
		padding: 5vh 5vw;
		scroll-margin-top: 3rem;
	}
	}

	section.hero {
		padding: 2rem 10vw;
		height: calc(100vh - 5rem);
		text-align: center;
		color: var(--beige);
		background: var(--brown);
		cursor: url('/cursor.svg') 30 30, auto;
	}

		section.hero div {
			padding: 1rem;
			border: 1px solid;
			min-height: 80vh;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}

		section.hero :global(img) {
			margin: 2rem 0;
			width: 276px;
		}

	@media (max-height: 900px) {
	section.hero {
		padding: 2rem 5vw;
		height: auto;
	}

		section.hero div {
			padding: 0.5rem;
		}

		section.hero :global(img) {
			width: 206px;
		}
	}

	@media (max-width: 900px) {
	section.hero {
		padding: 1rem;
		margin-top: 4rem;
	}

		section.hero div {
			padding: 0.33rem;
			min-height: auto;
		}
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
			color: white;
		}

			figcaption h5 {
				margin-bottom: 0;
			}

	section.intro {
		display: grid;
		grid-template-columns: 1fr 1fr;
    column-gap: 5vw;
	}

	section:not(.intro) > :global(p) {
		columns: 2 auto;
		column-gap: 5vw;
	}

	@media (max-width: 900px) {
	section:not(.intro) > :global(p) {
		columns: auto;
	}

	section.intro {
		display: block;
		text-align: center;
	}
	}
</style>