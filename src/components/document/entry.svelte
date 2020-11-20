<script>
  import { getContext } from 'svelte'

  import Works from '../Works.svelte'
  import Offerings from '../Offerings.svelte'
  import Audio from '../Audio.svelte'
  import Gallery from '../Gallery.svelte'
  import TextWQuote from '../TextWQuote.svelte'
  import TextWPhoto from '../TextWPhoto.svelte'
  import BigNumbers from '../BigNumbers.svelte'
  import Approach from '../Approach.svelte'

  export let target
  const fetchEntry = getContext('entry')
  const entry = fetchEntry(target.sys.id)
</script>

{#if entry}
{#if entry.sys.contentType.sys.id === 'works'}
<Works works={entry} />
{:else if entry.sys.contentType.sys.id === 'offerings'}
<Offerings offerings={entry} />
{:else if entry.sys.contentType.sys.id === 'approach'}
<Approach approach={entry} />
{:else if entry.sys.contentType.sys.id === 'gallery'}
<Gallery gallery={entry} />
{:else if entry.sys.contentType.sys.id === 'textWQuote'}
<TextWQuote text={entry} />
{:else if entry.sys.contentType.sys.id === 'textWPhoto'}
<TextWPhoto text={entry} />
{:else if entry.sys.contentType.sys.id === 'bigNumbers'}
<BigNumbers text={entry} />
{:else if entry.sys.contentType.sys.id === 'audio'}
<Audio audio={entry} />
{/if}
{/if}