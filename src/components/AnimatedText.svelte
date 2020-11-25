
<script>
  import { onMount } from 'svelte'

  export let text
  let element
  let visible = false

  onMount(() => {
		const observer = new IntersectionObserver( 
			([e]) => visible = e.isIntersecting,
			{ threshold: 1 }
		)

		observer.observe(element)
	})
</script>

<div class:visible bind:this={element}>
  {#each text.split(' ') as word, i}
  <div><span style="transition-delay: {i*66}ms;">{word}&nbsp;</span></div>
  {/each}
</div>

<style>
  div {
    display: inline-block;
  }

  div > div {
    overflow: hidden;
  }

  span {
    display: inline-block;
    transform: translateY(100%);
    transition: transform 333ms;
  }

  div.visible span {
    transform: translateY(0%);
  }
</style>