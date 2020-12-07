<script>
  import { getContext } from 'svelte'

  const asset = getContext('asset')
  export let audio
  let file = asset(audio.fields.audio.sys.id)

  let duration
  let currentTime = 0
  let paused = true

  function start() {
    paused = false
  }

  function stop() {
    currentTime = 0
    paused = true
  }

  function toggle() {
    paused = !paused
  }
</script>

<audio bind:duration bind:paused bind:currentTime src={file.fields.file.url} loop preload='metadata' />
<article>
  <button on:click={toggle}>{audio.fields.label}</button>
  <span style="width: {currentTime / duration * 100}%"></span>
</article>

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
    font-size: inherit;
    text-decoration: underline;
    text-transform: inherit;
    padding: 0;
    line-height: inherit;
  }

  span {
    position: absolute;
    bottom: 2px;
    left: 0;
    width: 0;
    border-bottom: 2px solid;
  }
</style>