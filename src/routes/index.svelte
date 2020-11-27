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
	let stuck

	onMount(() => {
		const observer = new IntersectionObserver( 
			([e]) => stuck = e.intersectionRatio < 1,
			{ threshold: [1] }
		)

		observer.observe(header)
	})

	onMount(() => {
		const observer = new IntersectionObserver( 
			(entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						// console.log(entry.target.getAttribute('data-background'))
						document.body.className = ''
						document.body.classList.add(entry.target.getAttribute('data-background'))
					}
				})
			},
			{ threshold: [0.5] }
		)

		sections.forEach(section => observer.observe(document.getElementById(section.fields.identifier)))
	})

	
</script>

<section class='hero'>
	<div>
		<h2><AnimatedText text={page.fields.heroTopTagline} /></h2>
		<figure>
			<Picture media={heroMedia} small />
			<figcaption><h6>{@html heroMedia.fields.title}</h6></figcaption>
		</figure>
		<h2><AnimatedText text={page.fields.heroBottomTagline} /></h2>
	</div>
</section>

<header bind:this={header} class:stuck>
	<Navigation {sections} contact={page.fields.contactUrl} playlists={page.fields.playlistsUrl} logotype={!stuck} />
</header>

<section class='intro'>
	<Document body={page.fields.introduction} />
</section>

{#each sections as section, index}
<section id={section.fields.identifier} data-background={section.fields.background && section.fields.background.replace(' ', '').toLowerCase()}>
	<h1><AnimatedText text={section.fields.title} /></h1>
	<Document body={section.fields.body} />

	{#if index === sections.length - 1}
	<div class="buttons">
		<a href="{page.fields.contactUrl}"><h5>{page.fields.contactUrl.replace('mailto:', '')}</h5></a>
		<a href="{page.fields.playlistsUrl}"><h5>Playlists</h5></a>
	</div>
	{/if}
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

	header.stuck { background: var(--backgroundcolor); }
	header.stuck :global(a) { color: var(--headingcolor); }

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

	@media (max-width: 900px) {
	section {
		padding: 5vh 5vw;
	}
	}

	section > h1 {
		color: var(--headingcolor);
		transition: color 333ms;
	}

	:global(body.lightcamel) { --backgroundcolor: var(--lightcamel) }
	:global(body.gold) { --textcolor: white; --headingcolor: white; --backgroundcolor: var(--gold) }
	:global(body.brown) { --textcolor: white; --headingcolor: white; --backgroundcolor: var(--brown) }
	:global(body.darkbrown) { --textcolor: white; --headingcolor: white; --backgroundcolor: var(--darkbrown) }

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
		}

		section.hero :global(img) {
			margin: 2rem 0;
			width: 50vh;
			height: 50vh;
			object-fit: cover;
    	object-position: center;
		}

	@media (max-width: 900px) {
	section.hero {
		padding: 0.66rem;
	}

		section.hero div {
			padding: 0.33rem;
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

	section.intro,
	section:not(.intro) > :global(p) {
		columns: 2 auto;
		column-gap: 5vw;
	}

	@media (max-width: 900px) {
	section.intro,
	section:not(.intro) > :global(p) {
		columns: auto;
	}

	section.intro {
		text-align: center;
	}
	}

	.buttons {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 10vh;
	}

		.buttons a {
			width: 48%;
			text-align: center;
			text-decoration: none;
			padding: 6rem 0;
			border: 1px solid;
		}

		.buttons a h5 {
			margin-bottom: 0;
		}

	@media (max-width: 900px) {
		.buttons a {
			width: 100%;
		}

		.buttons a + a {
			margin-top: 1rem;
		}
	}
</style>