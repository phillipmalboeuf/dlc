<main>
  <slot></slot>
</main>

<style>
  :global(*) {
    box-sizing: border-box;
  }

	:global(:root) {
		font-family: "Suisse Int'l", sans-serif;

    --beige: #EAE9E2;
    --lightcamel: #B1987B;
    --gold: #9B7F61;
    --brown: #614632; 
    --darkbrown: #472F1C;

    --large: 1444px;
    --medium: 1024px;
    --small: 375px;

    --textcolor: black;
    --headingcolor: var(--brown);
    --backgroundcolor: var(--beige);
	}

  :global(body) {
    background-color: var(--beige);
    margin: 0 0 5rem;
    padding: 0;
  }

	main {
		/* padding: 1em; */
		/* margin: 0 auto; */
    /* max-width: var(--large); */
	}

  :global(h1, h2, h3) {
    font-family: "Voyage", 'Times New Roman', Times, serif;
    text-transform: uppercase;
    line-height: 1;
    margin: 0 auto 1rem;
  }

  :global(h1) {
    font-size: 150px;
  }

  :global(h2) {
    font-size: 90px;
  }

  :global(h3) {
    font-size: 82px;
  }

  :global(h5, h6, p, small) {
    margin: 0 auto 1rem;
  }

  :global(h5) {
    font-size: 18px;
    font-weight: normal;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    line-height: 1.8;
  }

  :global(h6) {
    font-size: 14px;
    font-weight: normal;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    line-height: 1.6;
  }

  :global(p) {
    font-size: 18px;
    line-height: 1.8;
  }

  :global(small) {
    display: block;
    font-size: 14px;
    line-height: 1.6;
  }

  :global(a) {
    color: currentColor;
  }

  :global(a:hover),
  :global(a:focus) {
    color: var(--gold);
  }
</style>