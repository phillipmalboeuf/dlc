<script>
  import { getContext, onMount } from 'svelte'
  import Picture from './Picture'
  import Document from './document'

  export let text
  const asset = getContext('asset')
</script>

<article>
  <div>
    {#if text.fields.title}<h5>{text.fields.title}</h5>{/if}
    <Document body={text.fields.body} />
  </div>

  <div class="photo">
    <Picture media={asset(text.fields.photo.sys.id)} />
  </div>
</article>

<style>
  article {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr;
    column-gap: 4rem;
    margin: 4rem 0;
  }

    div.photo {
      padding: 4rem;
    }

  @media (max-width: 900px) {
  article {
    grid-template-columns: 1fr;
  }

    div.photo {
      padding: 0;
    }
  }
</style>