<script>
  import { getContext, onMount } from 'svelte'
  import Slider from './Slider'
  import Picture from './Picture'

  export let gallery

  const asset = getContext('asset')
</script>

<div>
  <Slider length={gallery.fields.photos.length} width='100'>
    {#each gallery.fields.photos as photo, i}
    <figure>
      <Picture media={asset(photo.sys.id)} small />
    </figure>
    {/each}
  </Slider>
</div>

<style>

  figure {
    padding: 2rem;
    margin-right: 1rem;
    width: 100vw;
  }

  figure :global(img) {
    height: 66vh;
    width: 100%;
    object-fit: contain;
  }

  div :global(.controls) {
    pointer-events: none;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
    div :global(.controls button) {
      pointer-events: auto;
    }
    div :global(.controls .previous) {
      order: -1;
    }

  @media (max-width: 900px) {
  figure {
    padding: 0;
  }

  figure :global(img) {
    height: 42vh;
  }
  }
</style>