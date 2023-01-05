import fs from "fs";
import matter from "gray-matter";
import { GetStaticPaths, InferGetStaticPropsType } from "next";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { visit } from "unist-util-visit";
import { slugifyWithCounter } from "@sindresorhus/slugify";
import path from "path";
import { toString } from "mdast-util-to-string";
import { MDXComponents } from "../../components/MdxComponents";
import { FrontMatter, MDXLayout } from "../../components/Post";
import { processRawFrontMatter } from "../../utils/mdx";

const Post = ({
  frontMatter,
  mdxSource,
  sections,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <MDXLayout frontMatter={frontMatter} sections={sections}>
      <MDXRemote {...mdxSource} components={MDXComponents} />
    </MDXLayout>
  );
};

export const getStaticProps = async ({ params }) => {
  function getSections(node: any) {
    let sections = [];

    for (let child of node.children ?? []) {
      if (child.type === "element" && child.tagName === "h2") {
        sections.push({
          title: toString(child as any),
          id: child.properties.id,
          ...child.properties.annotation,
        });
      } else if (child.children) {
        sections.push(...getSections(child));
      }
    }

    return sections;
  }

  // adds an id to the h2's to link to
  function rehypeSlugify() {
    return (tree) => {
      let slugify = slugifyWithCounter();
      visit(tree, "element", (node) => {
        if (node.tagName === "h2" && !node.properties.id) {
          node.properties.id = slugify(toString(node));
        }
      });
    };
  }

  const markdownWithMeta = fs.readFileSync(
    path.join("src/content", params?.slug + ".mdx"),
    "utf-8"
  );

  let sections: { title: string; id: string }[] = [];

  const { data: rawFrontMatter, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlugify,
        () => (tree) => {
          sections = getSections(tree);
        },
      ],
    },
  });

  return {
    props: {
      frontMatter: await processRawFrontMatter({
        slug: params?.slug as string,
        frontMatter: rawFrontMatter,
        mdxSource,
        mdxContent: content,
        path: path.join(process.cwd(), "src/content"),
        excerpt: "",
      }),
      mdxSource,
      sections,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join("src/content"));

  const paths = files.map((filename) => ({
    params: {
      slug: [filename.replace(".mdx", "")],
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export default Post;
