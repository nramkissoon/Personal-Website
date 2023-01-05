import format from "date-fns/format";
import fromUnixTime from "date-fns/fromUnixTime";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { execa } from "execa";
import path from "path";
import { z } from "zod";
import { FrontMatter } from "../components/Post";
import { NextFetchEvent } from "next/server";

/**
 * Format the last edited timestamp and author from git output
 */
function getTimestampAndAuthor(str: string) {
  if (!str) return null;

  const GIT_COMMIT_TIMESTAMP_AUTHOR_REGEX = /^(\d+), (.+)$/;
  const temp = str.match(GIT_COMMIT_TIMESTAMP_AUTHOR_REGEX);

  if (!temp || temp.length < 3) return null;

  const [, timestamp, author] = temp;
  const dateStr = fromUnixTime(+(timestamp as string));

  return {
    date: format(dateStr, "MMMM dd, yyyy"),
    author: author ?? null,
  };
}

/**
 * Gets the last edited timestamp and author from git
 * using `git log`
 *
 * %an = author name
 * %ct = committer date, UNIX timestamp
 *
 * @see https://git-scm.com/docs/git-log
 */
async function getLastEdited(filePath: string) {
  try {
    const { stdout } = await execa("git", [
      "log",
      "-1",
      "--format=%ct, %an",
      filePath,
    ]);
    return getTimestampAndAuthor(stdout);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const rawFrontMatterSchema = z.object({
  title: z.string().min(45).max(70),
  seoDescription: z.string().min(110).max(160),
  description: z.string().min(110).max(250),
  tags: z.optional(
    z
      .union([z.literal("AWS"), z.literal("TypeScript"), z.literal("Next.js")])
      .array()
      .nonempty()
  ),
});

export type Tags = z.infer<typeof rawFrontMatterSchema.shape.tags>;

export const processRawFrontMatter = async ({
  mdxContent,
  frontMatter,
  slug,
  path: mdxPath,
}: {
  frontMatter: any;
  slug: string;
  path: string;
  mdxSource: MDXRemoteSerializeResult<Record<string, unknown>>;
  mdxContent: string;
  excerpt: string;
}): Promise<FrontMatter> => {
  const { title, description, tags, seoDescription } =
    rawFrontMatterSchema.parse(frontMatter);

  const filePath = path.join(mdxPath, slug + ".mdx");
  const lastEdited = (await getLastEdited(filePath)) ?? null;

  return {
    tags,
    slug,
    title,
    description,
    lastEdited,
    openGraph: {
      title,
      description: seoDescription,
      site_name: "Developer Blog | Nicholas Ramkissoon",
      type: "article",
      url: "https://blog.nickramkissoon.com/posts/" + slug,
      images: [
        {
          url: `https://blog.nickramkissoon.com/api/og?title=${title}&description=${seoDescription}`,
          width: 1200,
          height: 630,
          alt: "Developer blog.",
          type: "image/png",
        },
      ],
      article: {
        modifiedTime: lastEdited ? lastEdited.date : "",
      },
    },
  };
};
