interface Base extends Lume.Data {
  title: string;
  children: JSX.Element;
}

const Nav = () => (
  <nav>
    <a
      href="https://www.kyoto-aquarium.com/event/index.html"
      target="_blank"
      rel="noreferrer"
    >
      Schedule
    </a>
    <a href="https://github.com/camiha/" target="_blank" rel="noreferrer">
      Github
    </a>
    <a href="https://twitter.com/_camiha" target="_blank" rel="noreferrer">
      X
    </a>
  </nav>
);

export default (data: Base, helpers: Lume.Helpers) => {
  const { title, children, description } = data;
  const date = helpers.date(data.date);

  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>penguin.show</title>
        <meta name="description" content="penguin.show" />
        <meta name="author" content="camiha" />
        <meta keywords="penguin, show, blog, camiha" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=M+PLUS+2:wght@100..900&display=fallback"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/styles.css" />
        <link rel="preconnect" href="https://pvinis.github.io" />
      </head>
      <body>
        <div>
          <header>
            <a href="/">
              <h1>
                penguin
                <wbr />
                .show
              </h1>
            </a>
            <Nav />
          </header>
          <main>
            {description ? (
              <article>
                <header>
                  <time>{date}</time>
                  <div>
                    {/* <a href={data.url}> */}
                    <h2>{title}</h2>
                    {/* </a> */}
                    <ul>
                      {data.tags.map((tag) => (
                        <li>
                          <a href={`/tags/${tag}/`}>{tag}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </header>
                {children}
                <footer>
                  <a href="/">← Back</a>
                </footer>
              </article>
            ) : (
              children
            )}
          </main>
          <footer>
            <small>©camiha 2024.</small>
            <Nav />
          </footer>
        </div>
        <link rel="stylesheet" href="/css/prism-atom-dark.css" />
        <link
          href="https://pvinis.github.io/iosevka-webfont/3.4.1/iosevka.css"
          rel="stylesheet"
        />
      </body>
    </html>
  );
};
