<script>
  import { getContext, onMount } from 'svelte'
  import Picture from './Picture'
  import Document from './document'

  export let text
</script>

<article>
  <h5>{text.fields.title}</h5>
  {#each text.fields.numbers as number}
  <div>
    <h1>{number.split('/')[0]}</h1>
    <hr>
    <h6>{number.split('/')[1]}</h6>
  </div>
  {/each}
</article>

<style>
  article {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 4rem 0;
  }

    h5 {
      width: 100%;
      padding: 0 4rem;
    }

    div {
      width: 50%;
      padding: 2rem 4rem;
      color: var(--brown);
    }

    hr {
      border: none;
      border-bottom: 1px solid;
      margin: 2rem 0;
    }

    /* div.photo {
      background: var(--beige);
    } */
</style>