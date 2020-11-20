<script>
  import { getContext, onMount } from 'svelte'
  import Picture from './Picture'
  import Document from './document'

  export let text
</script>

<article>
  <div>
    <h5>{text.fields.title}</h5>
    <Document body={text.fields.body} />
  </div>

  <div class="quote">
    <Document body={text.fields.quote} />
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

    div.quote {
      background: var(--beige);
    }
</style>