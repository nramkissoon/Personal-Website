import fs from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import { MDXComponents } from "../../components/MdxComponents";
import { FrontMatter, MDXLayout } from "../../components/Post";
import { processRawFrontMatter } from "../../utils/mdx";

const Post = ({
  frontMatter,
  mdxSource,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <MDXLayout frontMatter={frontMatter}>
      <MDXRemote {...mdxSource} components={MDXComponents} />
    </MDXLayout>
  );
};

export const getStaticProps: GetStaticProps<{
  frontMatter: FrontMatter;
  mdxSource: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
}> = async ({ params }) => {
  const markdownWithMeta = fs.readFileSync(
    path.join("src/content", params?.slug + ".mdx"),
    "utf-8"
  );
  const { data: rawFrontMatter, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content);

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
