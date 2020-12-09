<script>
  import { getContext, onMount } from 'svelte'
  import { fly } from 'svelte/transition'
  import Document from './document'

  export let works

  const entry = getContext('entry')
  const entries = works.fields.works.map(work => entry(work.sys.id))

  let popupWork
</script>

<div class="works">
  {#each entries as work}
  <article>
    <h5>{work.fields.title}</h5>
    <small><p>{work.fields.excerpt}</p></small>
    {#if work.fields.linkUrl}
    {#if work.fields.linkUrl.indexOf('http') > -1}
    <a href="{work.fields.linkUrl}" target='blank'><h6>{work.fields.linkLabel}</h6></a>
    {:else}
    <a href="#{work.fields.linkUrl}" on:click={() => popupWork = work}><h6>{work.fields.linkLabel}</h6></a>
    {/if}
    {/if}
  </article>
  {/each}
</div>

{#if popupWork}
<article class="popup" in:fly={{ y: 100 }} out:fly={{ y: -100 }} on:scroll={(e) => {
  if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight) {
    // e.currentTarget.style.pointerEvents = 'none'
    popupWork = undefined
  }
}}>
  <button on:click={() => popupWork = undefined}></button>
  <div>
    <button on:click={() => popupWork = undefined}>Close</button>

    <h2>{popupWork.fields.title}</h2>
    <h6>{popupWork.fields.tags.join(' – ')}</h6>
    <!-- <p>{popupWork.fields.excerpt}</p> -->

    <small><Document body={popupWork.fields.body} /></small>
  </div>
</article>
{/if}

<style>
  .works {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    column-gap: 4rem;
  }

    .works > article {
      padding-top: 6rem;
    }

  @media (max-width: 900px) {
  .works {
    grid-template-columns: 1fr;
  }

    .works > article {
      padding-top: 4rem;
    }
  }

  .popup {
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    padding: 4rem 4rem 42vh;
    color: black;
  }

    .popup small > :global(p) {
      columns: 2 auto;
		  column-gap: 5vw;
    }

    .popup > button {
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
      background: transparent;
    }

  h2 {
    color: var(--darkbrown);
  }

    .popup > div {
      position: relative;
      background: white;
      padding: 8rem;
      min-height: 120vh;
    }

    .popup > div > button {
      cursor: pointer;
      position: absolute;
      top: 0;
      right: 0;
      border: none;
      background: transparent;
      padding: 1rem;
      text-transform: uppercase;
    }

    .popup > div > h6 {
      margin: 2rem 0;
    }

  @media (max-width: 1200px) {
    .popup {
      padding: 0 0 33vh;
    }

      .popup > div {
        padding: 4rem;
      }
  }

  @media (max-width: 900px) {
      .popup > div {
        padding: 4rem 1rem;
      }

      .popup small > :global(p) {
        columns: auto;
      }
  }
</style>