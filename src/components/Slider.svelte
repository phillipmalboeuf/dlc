<script>
  import { onMount } from 'svelte'

  export let length
  export let width

  let slider

  onMount(() => {
		// slider.addEventListener('scroll', e => {
    //   console.log(e)
    // })
	})

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

  <div class="buttons">
    <button on:click={previous}>❮</button>
    <button on:click={next}>❯</button>
  </div>
</div>

<style>
  .slider {
    overflow-x: auto;
  }

  .slides {
    display: flex;
  }

  .container {
    position: relative;
  }

  .buttons {
    position: absolute;
    top: 50%;
    right: 0;
    text-align: right;
    transform: translateY(-50%);
  }

    button {
      color: white;
      background: var(--gold);
      padding: 1rem;
      border: none;
      display: block;
      margin: 0.5rem 0;
    }
</style>