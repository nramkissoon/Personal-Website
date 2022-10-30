import fs from "fs";
import matter from "gray-matter";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import path from "path";
import shell from "shelljs";
import { FrontMatter } from "../components/Post";
import { processRawFrontMatter } from "../utils/mdx";

const ArrowSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    className="fill-emerald-500 stroke-emerald-500"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <line x1="15" y1="16" x2="19" y2="12"></line>
    <line x1="15" y1="8" x2="19" y2="12"></line>
  </svg>
);

const Post = (props: { frontMatter: FrontMatter; slug: string }) => {
  return (
    <div className="container mb-9 group hover:scale-[101%] duration-100">
      <Link href={"/posts/" + props.slug} passHref>
        <a>
          <h2 className="mb-0 text-3xl font-bold tracking-wide group-hover:text-emerald-500">
            {props.frontMatter.title}
          </h2>
          <p className="mb-4 text-sm font-medium text-zinc-400">
            {props.frontMatter.lastEdited?.date}
          </p>
          <p className="mb-2 text-xl font-medium">
            {props.frontMatter.description}
          </p>
          <div className="flex group-hover:text-emerald-500">
            Read more
            <div className="hidden ml-2 group-hover:inline animate-bounce-horizontal">
              <ArrowSVG />
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

type StaticProps = InferGetStaticPropsType<typeof getStaticProps>;

function Blog(props: StaticProps) {
  // const [pageIndex, setPageIndex] = React.useState(0);
  // const PAGE_SIZE = 6;

  // const includePostsUntilEnd = pageIndex + PAGE_SIZE > props.posts.length;

  // const postsOnPage = props.posts.slice(
  //   PAGE_SIZE * pageIndex,
  //   includePostsUntilEnd ? undefined : PAGE_SIZE * pageIndex + PAGE_SIZE
  // );

  return (
    <main className="relative mx-auto h-full overflow-hidden">
      <div className=" pointer-events-none absolute inset-0 bg-gradient-to-r from-violet-500 via-rose-500 to-emerald-500" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden bg-[url('/bg.svg')] bg-[length:140px_140px] -left-[20px]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial from-transparent to-[#111]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#111]/20 via-[#18181800] to-[#111]/20"></div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r to-[#18181800] via-[#111]/95 from-[#18181800] scale-x-150"></div>

      <div className="container relative z-2 max-w-4xl pt-12 mx-auto p-7 flex-col flex h-screen">
        <h1 className="text-2xl font-bold tracking-wide">
          <Link passHref href="https://twitter.com/nickramki">
            <a target="_blank" rel="noreferrer">
              <span className="hover:cursor-pointer hover:text-[#1DA1F2] duration-150">
                @nickramki
              </span>
              &apos;s
            </a>
          </Link>{" "}
          Blog
        </h1>
        <h2 className="mb-2 text-xl text-zinc-400 font-medium">
          Stuff about tech, learnings, project updates, and more.
        </h2>
        <hr className="mb-3 mt-9 border-zinc-400" />
        <h2 className="text-2xl font-bold">Posts</h2>
        <div className="mt-6">
          {props.frontMatters.map((post) => (
            <Post frontMatter={post} slug={post.slug} key={post.slug} />
          ))}
        </div>
        <hr className=" my-9 border-slate-400" />

        <div className="flex flex-col items-center justify-between space-y-7 sm:flex-row sm:space-y-0">
          <div className="flex space-x-5">
            <Link passHref href="https://github.com/nramkissoon">
              <a target="_blank" rel="noreferrer">
                <svg
                  viewBox="0 0 16 16"
                  className="w-6 h-6 fill-zinc-50 hover:cursor-pointer hover:fill-[#6e5494] duration-150"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>
            </Link>

            <Link passHref href="https://twitter.com/nickramki">
              <a target="_blank" rel="noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 fill-zinc-50 hover:cursor-pointer hover:fill-[#1DA1F2] duration-150"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
            </Link>
          </div>
        </div>
        <div className="flex-grow" />
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps<{
  frontMatters: FrontMatter[];
}> = async ({ params }) => {
  const dir = path.join(process.cwd(), "src/content");
  const filenames = shell.ls("-R", `${dir}/**/*.mdx`);

  const dataPromise = filenames.map(async (filename) => {
    const filePath = path.resolve(filename);
    if (!fs.existsSync(filePath)) {
      throw new Error(
        `can't load MDX file ${filename} in ${filePath} does not exist`
      );
    }

    const markdownWithMeta = fs.readFileSync(filePath, "utf-8");
    const { data: rawFrontMatter, content } = matter(markdownWithMeta);
    const mdxSource = await serialize(content);

    const slug = filePath.substring(filePath.lastIndexOf("/") + 1);

    return await processRawFrontMatter({
      slug: slug.substring(0, slug.lastIndexOf(".mdx")),
      frontMatter: rawFrontMatter,
      mdxSource,
      mdxContent: content,
      path: path.join(process.cwd(), "src/content"),
      excerpt: "",
    });
  });

  const data = await Promise.all(dataPromise);

  return {
    props: {
      frontMatters: data,
    },
  };
};

export default Blog;
