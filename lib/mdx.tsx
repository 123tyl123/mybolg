import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { type Options as RehypePrettyCodeOptions } from "rehype-pretty-code";
import { mdxComponents } from "@/components/mdx-components";

const prettyCodeOptions: RehypePrettyCodeOptions = {
  theme: {
    dark: "github-dark-default",
    light: "github-light-default",
  },
  keepBackground: false,
};

export function MdxRenderer({ source }: { source: string }) {
  const options: MDXRemoteProps["options"] = {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "append" }],
        [rehypePrettyCode, prettyCodeOptions],
      ],
    },
  };

  return <MDXRemote source={source} components={mdxComponents} options={options} />;
}
