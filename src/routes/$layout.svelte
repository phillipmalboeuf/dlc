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

  :global(html) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
    scroll-behavior: smooth;
  }

  :global(body) {
    background-color: var(--beige);
    margin: 0 0 5rem;
    padding: 0;
  }

  @media (max-width: 900px) {
  :global(body) {
    margin-bottom: 12rem;
  }
  }

	main {
		/* padding: 1em; */
		/* margin: 0 auto; */
    /* max-width: var(--large); */
	}

  :global(h1, h2, h3) {
    font-family: "Voyage", 'Times New Roman', Times, serif;
    font-weight: normal;
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
    line-height: 1.222;
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
    white-space: pre-line;
  }

  :global(small),
  :global(small p) {
    display: block;
    font-size: 14px;
    line-height: 1.6;
  }

  @media (max-width: 1200px) {
  :global(h1) {
    font-size: 120px;
  }

  :global(h2) {
    font-size: 75px;
  }

  :global(h3) {
    font-size: 56px;
  }

  :global(h5) {
    font-size: 16px;
    line-height: 1.2;
  }

  :global(h6) {
    font-size: 12px;
    letter-spacing: 0.05em;
    line-height: 1.6;
  }

  :global(p) {
    font-size: 14px;
    line-height: 1.8;
  }

  :global(small) {
    font-size: 12px;
    line-height: 1.6;
  }
  }

  @media (max-width: 900px) {
  :global(h1) {
    font-size: 60px;
  }

  :global(h2) {
    font-size: 50px;
  }

  :global(h3) {
    font-size: 50px;
  }
  }

  :global(a) {
    outline: none;
    color: currentColor;
  }

  :global(a:hover),
  :global(a:focus) {
    color: var(--gold);
  }

  :global(a:hover),
  :global(button:hover) {
    cursor: url('/smallcursor.svg') 30 30, pointer;
  }

  :global(button) {
    outline: none;
    font-size: inherit;
    cursor: pointer;
    border: none;
  }
</style>