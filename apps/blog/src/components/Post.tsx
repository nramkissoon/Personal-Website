import { NextSeo, NextSeoProps } from "next-seo";
import { OpenGraph } from "next-seo/lib/types";
import { Tags } from "../utils/mdx";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Toc } from "./Toc";
import { Section } from "./SectionProvider";

export interface SEOProps
  extends Pick<NextSeoProps, "title" | "description" | "openGraph"> {}

export interface FrontMatter {
  slug: string;
  title: string;
  description: string;
  openGraph: OpenGraph;
  lastEdited: {
    date: string;
    author: string | null;
  } | null;
  tags: Tags;
}

function useHeadingFocusOnRouteChange() {
  const router = useRouter();

  React.useEffect(() => {
    const onRouteChange = () => {
      const [heading] = Array.from(document.getElementsByTagName("h1"));
      heading?.focus();
    };
    router.events.on("routeChangeComplete", onRouteChange);
    return () => {
      router.events.off("routeChangeComplete", onRouteChange);
    };
  }, [router.events]);
}

const ArrowSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    className="rotate-180 fill-rose-500 stroke-rose-500"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <line x1="15" y1="16" x2="19" y2="12"></line>
    <line x1="15" y1="8" x2="19" y2="12"></line>
  </svg>
);

export const Seo = ({ title, description, openGraph }: SEOProps) => (
  <NextSeo
    title={title}
    description={description}
    canonical={openGraph?.url}
    openGraph={{
      ...openGraph,
      title,
      description,
      type: "article",
    }}
    twitter={{
      handle: "@nickramki",
      cardType: "summary_large_image",
    }}
  />
);

interface MDXLayoutProps {
  frontMatter: FrontMatter;
  children: React.ReactNode;
  sections: Section[];
}

export const MDXLayout: React.FC<MDXLayoutProps> = ({
  frontMatter,
  children,
  sections,
}) => {
  return (
    <PostContainer frontMatter={frontMatter} sections={sections}>
      {children}
    </PostContainer>
  );
};

export const PostContainer: React.FC<{
  frontMatter: FrontMatter;
  children: React.ReactNode;
  sections: Section[];
}> = ({ frontMatter, children, sections }) => {
  const { title, openGraph, tags, lastEdited, slug } = frontMatter;
  useHeadingFocusOnRouteChange();

  return (
    <>
      <Seo
        title={title}
        description={openGraph.description}
        openGraph={openGraph}
      />

      <div className="relative mx-auto h-full w-full">
        <div className="">
          <div className=" pointer-events-none absolute inset-0 bg-gradient-to-r from-violet-500 via-rose-500 to-emerald-500 " />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center  bg-[url('/bg.svg')] bg-[length:140px_140px] -left-[20px]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-radial from-transparent to-[#111] " />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#111]/20 via-[#18181800] to-[#111]/20 "></div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r to-[#18181800] via-[#111]/95 from-[#18181800] scale-x-100 "></div>
        </div>
        <div className="mx-auto  max-w-4xl z-2 ">
          <div className="container relative pt-12 gap-12 p-7  max-w-4xl mx-auto ">
            <Link passHref href="/">
              <div className="flex hover:text-rose-500 group hover:cursor-pointer w-fit duration-150">
                Return to all posts
              </div>
            </Link>
            <article className="w-full">
              <header className="mb-[40px]">
                <p className="mt-3 font-medium text-slate-500">
                  {lastEdited?.date && (
                    <span className="font-medium text-gray-500 text-sm">
                      {lastEdited?.date}
                    </span>
                  )}
                </p>
                <h1 className="mb-8 lg:text-5xl text-3xl font-bold tracking-wide">
                  {title}
                </h1>
              </header>
              <span>Table of contents</span>
              <Toc slug={slug} sections={sections} />
              <main>{children}</main>
            </article>
            <hr className="border-1 my-9 border-zinc-500" />
            <div className="flex flex-col items-center justify-between space-y-7 sm:flex-row sm:space-y-0">
              <Link passHref href="/">
                <div className="flex hover:text-rose-500 group hover:cursor-pointer w-fit duration-150">
                  Return to all posts
                </div>
              </Link>
              <div className="flex space-x-5">
                <Link
                  passHref
                  href="https://github.com/nramkissoon"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="w-6 h-6 fill-zinc-50 hover:cursor-pointer hover:fill-[#6e5494] duration-150"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </Link>

                <Link
                  passHref
                  href="https://twitter.com/nickramki"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 fill-zinc-50 hover:cursor-pointer hover:fill-[#1DA1F2] duration-150"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
