<script>
  import { getContext, onMount } from 'svelte'
  import Picture from './Picture'
  import Document from './document'

  export let text
  const asset = getContext('asset')
</script>

<article>
  <div>
    {#if text.fields.title}<h5>{text.fields.title}</h5>{/if}
    <Document body={text.fields.body} />
  </div>

  <figure class={text.fields.align}>
    <Picture media={asset(text.fields.photo.sys.id)} />
  </figure>
</article>

<style>
  article {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr;
    column-gap: 4rem;
    margin: 4rem 0;
  }

    figure {
      margin-left: auto;
      padding: 4rem;
    }

    figure.Top {
      padding-top: 0;
      align-self: flex-start;
    }

    figure.Bottom {
      padding-bottom: 0;
      align-self: flex-end;
    }

  @media (max-width: 900px) {
  article {
    grid-template-columns: 1fr;
    margin: 2rem 0;
  }

    figure {
      padding: 0;
    }

    figure.Top {
      margin: 0 0 2rem auto;
      order: -1;
    }

    figure :global(img) {
      max-height: 245px;
    }
  }
</style>