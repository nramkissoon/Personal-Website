import fs from "fs";
import matter from "gray-matter";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import path from "path";
import React from "react";

const ArrowSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    className="fill-rose-500 stroke-rose-500"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <line x1="15" y1="16" x2="19" y2="12"></line>
    <line x1="15" y1="8" x2="19" y2="12"></line>
  </svg>
);

const Post = (props: {
  frontMatter: {
    [key: string]: any;
  };
  slug: string;
}) => {
  return (
    <div className="container mb-9 group">
      <Link href={"/posts/" + props.slug} passHref>
        <a>
          <h2 className="mb-0 text-3xl font-bold tracking-wide text-slate-900 group-hover:text-rose-600">
            {props.frontMatter.title}
          </h2>
          <p className="mb-4 text-lg ">{props.frontMatter.date}</p>
          <p className="mb-2 text-xl tracking-wide ">
            {props.frontMatter.description}
          </p>
          <div className="flex text-slate-900 group-hover:text-rose-600">
            Read More
            <div className="hidden ml-2 group-hover:inline animate-bounce-horizontal">
              <ArrowSVG />
            </div>
          </div>
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
    <div className="container max-w-4xl pt-12 mx-auto p-7">
      <h1 className="text-2xl font-bold tracking-wide text-slate-900">
        Nick&apos;s Blog
      </h1>
      <h2 className="mb-2 text-xl text-slate-600">
        Ramblings about tech, learnings, project updates, etc.
      </h2>
      <hr className="mb-3 mt-9 border-slate-600" />
      <h2 className="text-2xl font-bold">Posts</h2>
      <div className="mt-6">
        {props.posts.map((post) => (
          <Post {...post} key={post.slug} />
        ))}
      </div>
      <hr className=" my-9 border-slate-600" />
      <div className="flex flex-col items-center justify-between space-y-7 sm:flex-row sm:space-y-0">
        <div className="flex space-x-5">
          <Link passHref href="https://github.com/nramkissoon">
            <a target="_blank" rel="noreferrer">
              <svg
                viewBox="0 0 16 16"
                className="w-6 h-6 fill-slate-800 hover:cursor-pointer hover:fill-gray-600"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>
          </Link>

          <Link passHref href="https://twitter.com/nickramki">
            <a target="_blank" rel="noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 fill-slate-800 hover:cursor-pointer hover:fill-gray-600 "
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const files = fs.readdirSync("content/");
  const posts = files
    .map((filename) => {
      const markdownWithMeta = fs.readFileSync(
        path.join("content/", filename),
        "utf-8"
      );
      const { data: frontMatter } = matter(markdownWithMeta);
      return {
        frontMatter,
        slug: filename.split(".")[0],
      };
    })
    .sort(
      (a, b) => Date.parse(b.frontMatter.date) - Date.parse(a.frontMatter.date) // sort most recent to oldest
    );
  return {
    props: {
      posts,
    },
  };
};

export default Blog;
