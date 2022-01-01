import fs from "fs";
import matter from "gray-matter";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import path from "path";

const Post = (props: {
  frontMatter: {
    [key: string]: any;
  };
  slug: string;
}) => {
  return (
    <div className="container mb-9">
      <Link href={"/posts/" + props.slug} passHref>
        {props.frontMatter.title}
      </Link>
    </div>
  );
};

function Blog(props: InferGetServerSidePropsType<typeof getStaticProps>) {
  return (
    <div>
      <h1 className="text-sm bg-slate-200">Blog</h1>
      <div>
        {props.posts.map((post) => (
          <Post {...post} key={post.slug} />
        ))}
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const files = fs.readdirSync("content/");
  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("content/", filename),
      "utf-8"
    );
    const { data: frontMatter } = matter(markdownWithMeta);
    return {
      frontMatter,
      slug: filename.split(".")[0],
    };
  });
  return {
    props: {
      posts,
    },
  };
};

export default Blog;
