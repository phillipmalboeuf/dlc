<script>
  import { getContext, onMount } from 'svelte'
  import Picture from './Picture'
  import Document from './document'

  export let text
</script>

<article>
  <div>
    {#if text.fields.title}<h5>{text.fields.title}</h5>{/if}
    <Document body={text.fields.body} />
  </div>

  <div class="quote">
    <Document body={text.fields.quote} />
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

    /* div {
      width: 50%;
      padding: 4rem;
    } */

    div.quote {
      padding: 4rem;
      background: var(--beige);
    }
</style>