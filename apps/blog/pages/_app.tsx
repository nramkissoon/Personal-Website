import { AppType } from "next/dist/shared/lib/utils";
import React from "react";
import "../styles/global.css";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
