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
    object-fit: contain;
  }
</style>