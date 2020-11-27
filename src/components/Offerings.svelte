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
  <Slider length={entries.length + 1} width='33'>
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
</div>

<style>
  /* .offerings {
    display: flex;
    overflow-x: auto;
  } */

    article {
      text-align: center;
      border: 1px solid;
      padding: 2rem;
      margin-right: 1rem;
      width: 33vw;

      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    @media (max-width: 900px) {
    article {
      width: 100%;
    }
    }

    article > small {
      height: 33%;
      margin-bottom: 2rem;
    }

    article > h5 {
      height: 10%;
    }

    article:last-child {
      color: var(--beige);
      background: var(--brown);
    }
</style>