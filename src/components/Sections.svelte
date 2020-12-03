<script>
  import { onMount } from 'svelte'

  import AnimatedText from '$components/AnimatedText'
  import Document from '$components/document'

  export let contactUrl
  export let playlistsUrl
  export let sections

  let open = {}

  onMount(() => {
		const observer = new IntersectionObserver( 
			(entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						document.body.classList.add(entry.target.getAttribute('data-background'))
					} else {
            document.body.classList.remove(entry.target.getAttribute('data-background'))
          }
				})
			},
			{ threshold: [0.5], rootMargin: '50px 0px' }
		)

		sections.forEach(section => observer.observe(document.getElementById(section.fields.identifier)))
	})
</script>


{#each sections as section, index}
<section id={section.fields.identifier} data-background={section.fields.background && section.fields.background.replace(' ', '').toLowerCase()} class:open={open[section.fields.identifier]}>
  <div class="title" on:click={() => open[section.fields.identifier] = open[section.fields.identifier] ? false : true}>
	  <h1><AnimatedText text={section.fields.title} /></h1>
    <button>{#if open[section.fields.identifier]}–{:else}+{/if}</button>
  </div>
  <div class="body">
	  <Document body={section.fields.body} />
  </div>

  {#if index === sections.length - 1}
  <div class="buttons">
    <a href="{contactUrl}"><h5>{contactUrl.replace('mailto:', '')}</h5></a>
    <a href="{playlistsUrl}"><h5>Playlists</h5></a>
  </div>
  {/if}
</section>
{/each}

<style>
  section {
		padding: 10vh 10vw;
		color: var(--textcolor);
		background: var(--backgroundcolor);
		transition: background-color 333ms, color 333ms;
	}

  @media (max-width: 1200px) {
  section {
		padding: 5vh 5vw;
  }
  }

  .title {
    display: flex;
    padding-top: 1rem;
  }

    .title > h1 {
      color: var(--headingcolor);
      margin-left: 0;
      transition: color 333ms;
    }

    .title > button {
      display: none;
      font-size: 1.5rem;
      color: var(--brown);
      background: transparent;
    }

  @media (min-width: 900px) {
  :global(body.lightcamel) { --backgroundcolor: var(--lightcamel) }
	:global(body.gold) { --textcolor: white; --headingcolor: white; --backgroundcolor: var(--gold) }
	:global(body.brown) { --textcolor: white; --headingcolor: white; --backgroundcolor: var(--brown) }
	:global(body.darkbrown) { --textcolor: white; --headingcolor: white; --backgroundcolor: var(--darkbrown) }
  }

  @media (max-width: 900px) {
	section {
		padding: 0 5vw 1rem;
		scroll-margin-top: 4rem;
	}

  .title {
    border-top: 1px solid;
  }

    .title > button {
      display: inline-block;
    }

  .body {
    height: 0;
    overflow: hidden;
    transition: height 666ms;
  }

  section.open .body {
    height: auto;
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