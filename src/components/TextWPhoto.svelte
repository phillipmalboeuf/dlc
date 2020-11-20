<script>
  import { getContext, onMount } from 'svelte'
  import Picture from './Picture'
  import Document from './document'

  export let text
  const asset = getContext('asset')
</script>

<article>
  <div>
    <h5>{text.fields.title}</h5>
    <Document body={text.fields.body} />
  </div>

  <div class="photo">
    <Picture media={asset(text.fields.photo.sys.id)} />
  </div>
</article>

<style>
  article {
    display: flex;
    align-items: center;
    margin: 4rem 0;
  }

    div {
      width: 50%;
      padding: 4rem;
    }

    /* div.photo {
      background: var(--beige);
    } */
</style>