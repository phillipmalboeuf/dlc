<script>
  import { getContext, onMount } from 'svelte'

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
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 1fr;
    column-gap: 4rem;
    margin: 4rem 0;
  }

    h5 {
      width: 100%;
      grid-column-start: 1;
      grid-column-end: 3;
    }

    div {
      grid-row-start: 2;
      color: var(--brown);
    }

    hr {
      border: none;
      border-bottom: 1px solid;
      margin: 2rem 0;
    }

  @media (max-width: 900px) {
  article {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }

  h5 {
    grid-column-end: auto;
  }
  
  div {
    grid-row-start: auto;
  }

  hr {
    margin: 0.5rem 0;
  }
  }
</style>