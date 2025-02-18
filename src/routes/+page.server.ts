const contentful = {
	space: '4pr30xezuxn1',
	accessToken: '7vJK8ulctiSCdZ0qukMt1VazK-JKWaDAYk9kY2YoYy8'
}

export async function load({ params, query }) {
	const response = await this.fetch(`https://cdn.contentful.com/spaces/${contentful.space}/entries?access_token=${contentful.accessToken}&content_type=page&include=4`)

	return { content: (await response.json()) }
}
