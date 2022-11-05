import { ImageResponse } from "@vercel/og";
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const mediumInterFont = fetch(
  "https://blog.nickramkissoon.com/fonts/Inter-Medium.ttf"
).then((res) => res.arrayBuffer());

const boldInterFont = fetch(
  "https://blog.nickramkissoon.com/fonts/Inter-Bold.ttf"
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title");
  const description = searchParams.get("description");

  const fontData = [await mediumInterFont, await boldInterFont];

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
          <div tw="relative flex flex-col w-full justify-center items-center bg-transparent h-screen">
            <div
              tw="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #8b5cf6, #f43f5e,#10b981 )",
              }}
            />
            <div
              tw="absolute inset-0 flex items-center justify-center overflow-hidden -left-[20px] -top-[20px]"
              style={{
                backgroundImage: `url(https://blog.nickramkissoon.com/bg.svg)`,
              }}
            />
            <div
              tw="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(17,17,17, 0.0), rgba(24,24,24, 0.7), rgba(17,17,17, 0.0))",
              }}
            />
            <div
              tw="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, rgba(24,24,24, 0), rgba(17,17,17, 0.7), rgba(24,24,24, 0))",
              }}
            />
            <div tw="relative z-2 max-w-4xl p-7 flex-col items-center justify-center flex">
              <h2
                tw="text-7xl tracking-tighter w-full text-center"
                style={{
                  fontFamily: "Inter-bold",
                }}
              >
                <span tw="text-6xl mr-4">💻</span> Developer Blog{" "}
                <span tw="text-6xl ml-4">✍🏽</span>
              </h2>
              <h3
                tw="text-center tracking-tight text-gray-300 text-4xl "
                style={{
                  fontFamily: "Inter-med",
                }}
              >
                Blog covering software engineering topics, tutorials, personal
                project updates, and more.
              </h3>
            </div>
          </div>
        </div>
      ),
      {
        status: 200,
        width: 1200,
        height: 630,
        emoji: "twemoji",
        fonts: [
          {
            name: "Inter-med",
            data: fontData[0],
            style: "normal",
          },
          {
            name: "Inter-bold",
            data: fontData[1],
            style: "normal",
          },
        ],
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
        <div tw="relative flex flex-col w-full justify-center items-center bg-transparent h-screen">
          <div
            tw="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, #8b5cf6, #f43f5e,#10b981 )",
            }}
          />
          <div
            tw="absolute inset-0 flex items-center justify-center overflow-hidden -left-[20px] -top-[20px]"
            style={{
              backgroundImage: `url(https://blog.nickramkissoon.com/bg.svg)`,
            }}
          />
          <div
            tw="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(17,17,17, 0.0), rgba(24,24,24, 0.7), rgba(17,17,17, 0.0))",
            }}
          />
          <div
            tw="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(24,24,24, 0), rgba(17,17,17, 0.7), rgba(24,24,24, 0))",
            }}
          />
          <div tw="relative z-2 max-w-4xl p-7 flex-col items-center justify-center flex">
            <h2
              tw="text-7xl tracking-tighter w-full text-center"
              style={{
                fontFamily: "Inter-bold",
              }}
            >
              {title} 💻
            </h2>
            <h3
              tw="text-center tracking-tight text-gray-300 text-4xl "
              style={{
                fontFamily: "Inter-med",
              }}
            >
              {description}
            </h3>
          </div>
        </div>
      </div>
    ),
    {
      status: 200,
      width: 1200,
      height: 630,
      emoji: "twemoji",
      fonts: [
        {
          name: "Inter-med",
          data: fontData[0],
          style: "normal",
        },
        {
          name: "Inter-bold",
          data: fontData[1],
          style: "normal",
        },
      ],
    }
  );
}
