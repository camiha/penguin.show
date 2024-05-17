import lume from "lume/mod.ts";
import jsx from "lume/plugins/jsx.ts";
import remark from "lume/plugins/remark.ts";
import lightningCss from "lume/plugins/lightningcss.ts";
import prism from "lume/plugins/prism.ts";
import "npm:prismjs@1.29.0/components/prism-typescript.js";
import transformImages from "lume/plugins/transform_images.ts";
import rehypeBudouxParagraph from "npm:rehype-budoux-paragraph@1.0.0";
import minifyHTML from "lume/plugins/minify_html.ts";
import date from "lume/plugins/date.ts";

const site = lume({
  src: "./src",
  dest: "./out",
});

site
  .use(jsx())
  .use(lightningCss())
  .use(
    remark({
      rehypePlugins: [rehypeBudouxParagraph],
    })
  )
  .use(date())
  .use(prism())
  .use(minifyHTML())
  .use(transformImages())

export default site;
