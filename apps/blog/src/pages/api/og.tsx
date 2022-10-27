import { ImageResponse } from "@vercel/og";
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title");
  const description = searchParams.get("description");

  if (!title || !description) {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <div tw="flex flex-col w-full justify-center items-center">
            <h2 tw="flex flex-col text-7xl font-extrabold tracking-tighter text-gray-900 text-center">
              Developer Blog 👋
            </h2>
            <h3 tw="text-center tracking-tight text-gray-700 text-3xl ">
              Blog covering software engineering topics, tutorials, personal
              project updates, and more.
            </h3>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        emoji: "twemoji",
      }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <div tw="flex flex-col w-full justify-center items-center">
          <h2 tw="flex flex-col text-7xl font-extrabold tracking-tighter text-gray-900 text-center">
            {title} 👋
          </h2>
          <h3 tw="text-center tracking-tight text-gray-700 text-3xl ">
            {description}
          </h3>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
