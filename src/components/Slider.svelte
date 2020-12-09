<script>
  import { onMount } from 'svelte'

  export let length
  export let width

  let slider

  function previous() {
    slider.scrollBy({
      behavior: 'smooth',
      left: -(slider.scrollWidth / length)
    })
  }

  function next() {
    slider.scrollBy({
      behavior: 'smooth',
      left: slider.scrollWidth / length
    })
  }
</script>

<div class="container">
  <div class="slider" bind:this={slider}>
    <div class="slides" style="width: {length*width}%;">
      <slot></slot>
    </div>
  </div>

  <div class="controls">
    <button class='next' on:click={next}>
      <svg width="24" height="24" viewBox="0 0 14 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 0.97876L12 12L1 23.0212" stroke="white" stroke-width="2"/></svg>
    </button>
    <button class='previous' on:click={previous}>
      <svg width="24" height="24" viewBox="0 0 14 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 23.0212L1.99999 12L13 0.978824" stroke="white" stroke-width="2"/></svg>
    </button>
  </div>
</div>

<style>
  .slider {
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    padding-bottom: 3rem;
  }

  .slider::-webkit-scrollbar {
    height: 4px;
  }

  .slider::-webkit-scrollbar-thumb {
    background: var(--gold);
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  .slides {
    display: flex;
  }

  .container {
    position: relative;
    border-bottom: 1px solid black;
  }

  .controls {
    position: absolute;
    z-index: 1;
    top: 50%;
    right: 0;
    text-align: right;
    transform: translateY(-50%);
  }

    button {
      color: white;
      background: var(--gold);
      padding: 0.88rem 1rem 0.8rem;
      border: none;
      display: block;
      margin: 0.5rem 0;
    }

      button.previous { padding-left: 0.66rem; }
      button.next { padding-right: 0.66rem; }
</style> 