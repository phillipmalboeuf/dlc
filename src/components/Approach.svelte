<script>
  import { getContext, onMount } from 'svelte'
  import Picture from './Picture'
  import Document from './document'

  export let approach

  const entry = getContext('entry')
  const asset = getContext('asset')
  const entries = approach.fields.steps.map(step => entry(step.sys.id))
</script>

<section>
  {#each entries as step, i}
  <article>
    <h5><sup>{i + 1}</sup> {step.fields.title}</h5>
    <small><Document body={step.fields.body} /></small>
  </article>
  {/each}

  <figure><Picture media={asset(approach.fields.media.sys.id)} /></figure>
</section>

<style>
  section {
    border: 1px solid;
    padding: 4rem;
    margin: 2rem 0;

    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto 1fr 1fr auto;
    column-gap: 2rem;
    row-gap: 2rem;
  }

    article small {
      margin-top: 0.5rem;
      margin-bottom: 0;
      max-width: 250px;
      display: inline-block;
    }

    article small :global(p) {
      margin-bottom: 0;
    }

    article:nth-child(1) {
      grid-column-start: 2;
      text-align: center;
    }

    article:nth-child(2) {
      grid-column-start: 3;
      grid-row-start: 2;
    }

    article:nth-child(3) {
      grid-column-start: 3;
      grid-row-start: 3;
    }

    article:nth-child(4) {
      grid-column-start: 2;
      grid-row-start: 4;
      text-align: center;
    }

    article:nth-child(5) {
      grid-column-start: 1;
      grid-row-start: 3;
      text-align: right;
    }

    article:nth-child(6) {
      grid-column-start: 1;
      grid-row-start: 2;
      text-align: right;
    }

    figure {
      margin: 1.5rem;
      border-radius: 50%;
      overflow: hidden;
      grid-column-start: 2;
      grid-row-start: 2;
      grid-row-end: 4;
    }

    figure :global(video) {
      display: block;
      border-radius: 50%;
    }

  @media (max-height: 900px) {
  section {
    padding: 1rem;
    row-gap: 0rem;
  }
  }

  @media (max-width: 900px) {
  section {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    row-gap: 2rem;
  }

    article:nth-child(n) {
      text-align: center;
      grid-column-start: 1;
      grid-row-start: auto;
    }

    figure {
      grid-row-start: 4;
      grid-row-end: auto;
      grid-column-start: 1;
    }
  }

    h5 {
      margin-bottom: 0rem;
    }

    sup {
      color: var(--headingcolor);
    }
</style>