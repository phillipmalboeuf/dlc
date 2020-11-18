<script>
  import { getContext } from 'svelte'

  import Picture from '../Picture.svelte'
  import Mark from './mark.svelte'

  import Works from '../Works.svelte'
  import Offerings from '../Offerings.svelte'

  export let node
  const entry = getContext('entry')
  const asset = getContext('asset')
</script>

{#if node.nodeType === 'heading-1'}
  <h1>{#each node.content as mark}<Mark mark={mark} />{/each}</h1>
{:else if node.nodeType === 'heading-2'}
  <h2>{#each node.content as mark}<Mark mark={mark} />{/each}</h2>
{:else if node.nodeType === 'heading-5'}
  <h5>{#each node.content as mark}<Mark mark={mark} />{/each}</h5>
{:else if node.nodeType === 'heading-6'}
  <h6>{#each node.content as mark}<Mark mark={mark} />{/each}</h6>
{:else if node.nodeType === 'paragraph'}
  <p>{#each node.content as mark}<Mark mark={mark} />{/each}</p>
{:else if node.nodeType === 'hr'}
  <hr />

{:else if node.nodeType === 'unordered-list'}
  <ul>
    {#each node.content as item}<li>{#each item.content as node}<svelte:self node={node} />{/each}</li>{/each}
  </ul>

{:else if node.nodeType === 'blockquote'}
  <blockquote>{#each node.content as code}<svelte:self node={code} />{/each}</blockquote>

{:else if node.nodeType === 'embedded-asset-block'}
<Picture media={node.data.target} />
{:else if node.nodeType === 'embedded-entry-block'}
  {#if entry(node.data.target.sys.id).sys.contentType.sys.id === 'works'}
  <Works works={entry(node.data.target.sys.id)} />
  {:else if entry(node.data.target.sys.id).sys.contentType.sys.id === 'offerings'}
  <Offerings offerings={entry(node.data.target.sys.id)} />
  {/if}
{/if}