import { NextSeo, NextSeoProps } from "next-seo";
import React from "react";

export interface SEOProps extends Pick<NextSeoProps, "title" | "description"> {}

interface MDXLayoutProps {
  frontMatter: any;
}

interface PostContainerProps {
  frontMatter: {
    slug: string;
    title: string;
    description: string;
  };
}

export const SEO = ({ title, description }: SEOProps) => (
  <NextSeo
    title={title}
    description={description}
    openGraph={{ title, description }}
    titleTemplate={"%s | Nick's Blog"}
  />
);

export const MDXLayout: React.FC<MDXLayoutProps> = ({
  frontMatter,
  children,
}) => {
  return <PostContainer frontMatter={frontMatter}>{children}</PostContainer>;
};

export const PostContainer: React.FC<PostContainerProps> = ({
  frontMatter,
  children,
}) => {
  const { slug, title, description } = frontMatter;
  return (
    <>
      <SEO title={title} description={description} />
      {children}
    </>
  );
};
