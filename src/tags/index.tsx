import { ArticleListItem } from "../_includes/components/article-heading.tsx";

export const layout = "layouts/base.tsx";

export default function* ({ search }: Lume.Data, helpers: Lume.Helpers) {
  const tags = search.values("tags") as string[];

  for (const tag of tags) {
    const links = search
      .pages(tag as string, "date=desc")
      .map((page, index) => (
        <ArticleListItem
          key={index}
          date={helpers.date(page.date)}
          url={page.url}
          title={page.title}
          description={page.description}
          tags={page.tags}
        />
      ));
    yield {
      url: `/tags/${tag}/`,
      content: (
        <>
          <h2>tag: {tag}</h2>
          <dl>{links}</dl>
        </>
      ),
    };
  }
}
