import { React } from "lume/deps/react.ts";

export const ArticleListItem = ({
  date,
  url,
  title,
  description,
  tags,
}: {
  date: string | undefined;
  url: string;
  title: string | undefined;
  description: string;
  tags: string[];
}) => (
  <div>
    <dt>
      <a href={url}>{title}</a>
    </dt>
    <dd>
      <time>{date}</time>
    </dd>
    <dd>
      <ul>
        {tags.map((tag) => (
          <li>
            <a href={`/tags/${tag}/`}>{tag}</a>
          </li>
        ))}
      </ul>
    </dd>
    <dd>{description}</dd>
  </div>
);
