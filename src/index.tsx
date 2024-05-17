import { ArticleListItem } from "./_includes/components/article-heading.tsx";

export const layout = "layouts/base.tsx";

export default (data: Lume.Data, helpers: Lume.Helpers) => {
  return (
    <>
      <dl>
        {data.search
          .pages("category=article", "date=desc")
          .map((page, index) => (
            <ArticleListItem
              key={index}
              date={helpers.date(page.date)}
              url={page.url}
              title={page.title}
              description={page.description}
              tags={page.tags}
            />
          ))}
      </dl>
    </>
  );
};
