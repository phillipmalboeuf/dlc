<script>
  import { getContext, onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import { fly } from 'svelte/transition'
  export let works

  const entry = getContext('entry')
  const entries = works.fields.works.map(work => entry(work.sys.id))

  let popupWork
</script>

<div class="works">
  {#each entries as work}
  <article>
    <h5>{work.fields.title}</h5>
    <p>{work.fields.excerpt}</p>
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
  <div>
    <button on:click={() => popupWork = undefined}>Close</button>

    <h2>{popupWork.fields.title}</h2>
    <p>{popupWork.fields.excerpt}</p>
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

  .popup {
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    padding: 4rem 4rem 42vh;
  }

  h2 {
    color: var(--darkbrown);
  }

    .popup > div {
      position: relative;
      background: white;
      padding: 4rem;
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
    }
</style>