import { DefaultSeo } from "next-seo";
import { AppType } from "next/dist/shared/lib/utils";
import React from "react";
import "../styles/global.css";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <>
      <DefaultSeo
        title={undefined}
        titleTemplate={"Blog | %s"}
        defaultTitle="Blog | Nicholas Ramkissoon"
        openGraph={{
          type: "website",
          locale: "en_IE",
          url: "https://blog.nickramkissoon.com/",
          site_name: "Blog | Nicholas Ramkissoon",
        }}
      />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
