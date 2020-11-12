<script context="module">
import { createClient } from 'contentful'

const client = createClient({
  space: '4pr30xezuxn1',
  accessToken: '7vJK8ulctiSCdZ0qukMt1VazK-JKWaDAYk9kY2YoYy8'
})
// export default client

export const entry = (id, locale) => client.getEntry(id, { locale, include: 2 })
export const asset = (id, locale) => client.getAsset(id, { locale })
</script>