<script>
  export let media
  export let small = false
  export let webp = false
</script>

<style>
  img,
  video {
    max-width: 100%;
  }
</style>

{#if media.fields.file.contentType.startsWith('video/')}
<video src="{media.fields.file.url}" autoplay muted loop playsinline></video>
{:else}
<picture>
  {#if small}
  <source srcSet="{media.fields.file.url}?w=400{webp ? '&fm=webp' : ''}" media="(max-width: 900px)" />
  <source srcSet="{media.fields.file.url}?w=600{webp ? '&fm=webp' : ''}" media="(max-width: 1200px)" />
  <img src="{media.fields.file.url}?w=800{webp ? '&fm=webp' : ''}" alt="{media.fields.title} {media.fields.description}" />
  {:else}
  <source srcSet="{media.fields.file.url}?w=900{webp ? '&fm=webp' : ''}" media="(max-width: 900px)" />
  <source srcSet="{media.fields.file.url}?w=1200{webp ? '&fm=webp' : ''}" media="(max-width: 1200px)" />
  <img src="{media.fields.file.url}?w=1800{webp ? '&fm=webp' : ''}" alt="{media.fields.title} {media.fields.description}" />
  {/if}
</picture>
{/if}