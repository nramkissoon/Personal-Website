import fs from "fs";
import matter from "gray-matter";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import path from "path";
import React from "react";

const Post = (props: {
  frontMatter: {
    [key: string]: any;
  };
  slug: string;
}) => {
  return (
    <div className="container mb-9">
      <h2 className="mb-0 text-3xl font-bold tracking-wide text-rose-600">
        {props.frontMatter.title}
      </h2>
      <p className="mb-4 text-lg ">{props.frontMatter.date}</p>
      <p className="mb-2 text-xl tracking-wide ">
        {props.frontMatter.description}
      </p>
      <Link href={"/posts/" + props.slug} passHref>
        <a className="text-xl text-orange-400 hover:text-orange-800">
          Read More
        </a>
      </Link>
    </div>
  );
};

function Blog(props: InferGetServerSidePropsType<typeof getStaticProps>) {
  // const [pageIndex, setPageIndex] = React.useState(0);
  // const PAGE_SIZE = 6;

  // const includePostsUntilEnd = pageIndex + PAGE_SIZE > props.posts.length;

  // const postsOnPage = props.posts.slice(
  //   PAGE_SIZE * pageIndex,
  //   includePostsUntilEnd ? undefined : PAGE_SIZE * pageIndex + PAGE_SIZE
  // );

  return (
    <div className="container max-w-6xl pt-12 mx-auto p-7">
      <h1 className="text-2xl font-bold tracking-wide text-slate-100">
        Nick&apos;s Blog
      </h1>
      <h2 className="mb-2 text-xl text-slate-500">
        Ramblings about tech, learnings, project updates, etc.
      </h2>
      <div className="mt-10">
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
