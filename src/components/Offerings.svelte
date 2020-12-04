<script>
  import { getContext, onMount } from 'svelte'
  import Slider from './Slider'
  import Picture from './Picture'

  export let offerings

  const entry = getContext('entry')
  const asset = getContext('asset')
  const entries = offerings.fields.offerings.map(offering => entry(offering.sys.id))
</script>

<div class="offerings">
  <Slider length={entries.length + 1} width='30'>
    {#each entries as offering, i}
    <article>
      <h6>No. {i+1}</h6>
      <h5>{offering.fields.title}</h5>
      <figure>
        <Picture media={asset(offering.fields.photo.sys.id)} small />
      </figure>
      <small>{offering.fields.excerpt}</small>
      {#if offering.fields.linkUrl}
      {#if offering.fields.linkUrl.indexOf('http') > -1}
      <a href="{offering.fields.linkUrl}" target='blank'><h6>{offering.fields.linkLabel}</h6></a>
      {:else}
      <a href="#{offering.fields.linkUrl}"><h6>{offering.fields.linkLabel}</h6></a>
      {/if}
      {/if}
    </article>
    {/each}

    <article>
      <h6>{offerings.fields.title}</h6>
      <a href="{offerings.fields.contactUrl}" target='blank'><h5>{offerings.fields.contactLabel}</h5></a>
      <h6>{offerings.fields.subTitle}</h6>
    </article>
  </Slider>

  <div class='gradient'></div>
</div>

<style>
  .offerings {
    position: relative;
    margin-top: 3rem;
    margin-left: -10vw;
    width: 100vw;
  }

  .gradient {
    pointer-events: none;
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 10%;
    background: linear-gradient(90deg, transparent, var(--backgroundcolor));
  }

  @media (max-width: 1200px) {
  .offerings {
    margin-left: -5vw;
  }
  }

  @media (max-width: 900px) {
    .offerings {
      margin-left: 0;
      width: 100%;
    }

    .gradient {
      display: none;
    }
  }

    article {
      text-align: center;
      border: 1px solid;
      padding: 1.5rem 2rem;
      margin-right: 1rem;
      width: 30vw;

      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    article:first-of-type { margin-left: 10vw; }
    article:last-of-type { margin-right: 10vw; }

    @media (max-width: 1200px) {
    article:first-of-type { margin-left: 5vw; }
    article:last-of-type { margin-right: 5vw; }
    }

    @media (max-width: 900px) {
    article:first-of-type { margin-left: 0; }
    article:last-of-type { margin-right: 0; }
    }

    article > small {
      height: 42%;
      margin-bottom: 3rem;
    }

    article > h5 {
      margin: 2rem 0;
      height: 10%;
    }

    article h6 {
      font-size: 13px;
    }
    
    figure {
      margin: 2rem 0;
    }

    figure :global(img) {
      width: 147px;
      height: 196px;
      object-fit: contain;
    }

    @media (max-width: 1200px) {
    article > h5 { margin: 1rem; }
    figure { margin: 1rem 0; }
    figure :global(img) {
      width: 111px;
      height: 151px;
    }
    }

    @media (max-width: 900px) {
    figure { margin: 0.5rem 0; }
    figure :global(img) {
      width: 92px;
      height: 135px;
    }
    }

    article a:last-child {
      justify-self: flex-end;
    }

    @media (max-width: 1200px) {
    article h6 {
      font-size: 12px;
    }
    }

    article:last-child {
      color: var(--beige);
      background: var(--brown);
    }

    @media (max-width: 900px) {
    article {
      width: 100%;
      padding: 0.5rem 1rem;
      margin-bottom: 1rem;
    }

    article:last-child {
      height: 42vh;
    }

    .offerings :global(.slides) {
      display: block !important;
      width: 100% !important;
    }

    .offerings :global(.controls) {
      display: none !important;
    }
    }
</style>