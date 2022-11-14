import { DefaultSeo } from "next-seo";
import { AppType } from "next/dist/shared/lib/utils";
import "../styles/global.css";

import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <>
      <DefaultSeo
        title="@nickramki's Blog"
        canonical="https://blog.nickramkissoon.com/"
        description="Developer blog covering software engineering topics, tutorials, personal project updates, and more."
        openGraph={{
          type: "website",
          locale: "en_IE",
          url: "https://blog.nickramkissoon.com/",
          site_name: "@nickramki's Blog",
          description:
            "Blog covering software engineering topics, tutorials, personal project updates, and more.",
          images: [
            {
              url: "https://blog.nickramkissoon.com/api/og",
              width: 1200,
              height: 630,
              alt: "@nickramki's Blog",
              type: "image/png",
            },
          ],
        }}
        twitter={{
          handle: "@nickramki",
          cardType: "summary_large_image",
        }}
      />
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
