<script context="module">
  let current
</script>

<script>
  import { getContext } from 'svelte'
  import { fly } from 'svelte/transition'

  const asset = getContext('asset')
  export let audio
  let file = asset(audio.fields.audio.sys.id)

  let paused = true
  let player

  function start() {
    if (current) { current.pause() }

    current = player
    paused = false
  }

  function stop() {
    current = undefined
    paused = true
  }
</script>

<audio bind:this={player} bind:paused src={file.fields.file.url} loop preload='metadata' />
<article>
  <button on:click={() => paused ? start() : stop()}>{audio.fields.label}</button>
</article>

{#if !paused}
<button on:click={stop} transition:fly|global={{ y: 66 }} class="control">Volume On <span>Pause</span></button>
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