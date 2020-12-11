<script>
  import { getContext } from 'svelte'
  import { fly } from 'svelte/transition'

  const asset = getContext('asset')
  export let audio
  let file = asset(audio.fields.audio.sys.id)

  // let duration
  let currentTime = 0
  let paused = true

  function start() {
    paused = false
  }

  function stop() {
    // currentTime = 0
    paused = true
  }
</script>

<audio bind:paused bind:currentTime src={file.fields.file.url} loop preload='metadata' />
<article>
  <button on:click={() => paused ? start() : stop()}>{audio.fields.label}</button>
</article>

{#if !paused}
<button on:click={stop} transition:fly={{ y: 66 }} class="control">Volume On <span>Pause</span></button>
{/if}

<style>
  article {
    position: relative;
    display: inline;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    display: inline;
    border: none;
    background: none;
    color: var(--textcolor);
    transform: translate(0,0);
    font-size: inherit;
    text-decoration: underline;
    text-transform: inherit;
    padding: 0;
    margin: 0;
    line-height: inherit;
  }

  button.control {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    font-size: 1rem;
    text-transform: none;
    text-decoration: none;
    padding: 0.5rem 1rem;
    color: var(--backgroundcolor);
    background: var(--headingcolor);
    border-radius: 2rem;
  }

    button > span {
      margin-left: 0.5em;
      text-decoration: underline;
    }
</style>