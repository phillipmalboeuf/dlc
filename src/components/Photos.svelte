<script>
  import { getContext, onMount } from 'svelte'
  import Picture from './Picture'

  export let photos
  const asset = getContext('asset')

  const assets = photos.fields.photos.map(photo => asset(photo.sys.id))
</script>

<article class={'has'+assets.length}>
  {#each assets as photo}
  <figure>
    <Picture media={photo} />
    {#if photo.fields.description}
    <figcaption>{photo.fields.description}</figcaption>
    {/if}
  </figure>  
  {/each}
</article>

<style>
  article {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 1rem;
    margin: 4rem 0;
  }

  article.has1 { grid-template-columns: 1fr; }
  article.has2 { grid-template-columns: 1fr 1fr; }

    figure {
      margin: 0;
    }

    figure :global(img),
    figure :global(video) {
      width: 100%;
    }

  @media (max-width: 900px) {
  article {
    grid-template-columns: 1fr;
    margin: 2rem 0;
  }
  }
</style>