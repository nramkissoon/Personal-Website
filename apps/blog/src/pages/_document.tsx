import NextDocument, { Head, Html, Main, NextScript } from "next/document";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <script
            defer
            data-domain="blog.nickramkissoon.com"
            src="https://plausible.io/js/plausible.js"
          />
        </Head>
        <body className="text-zinc-100 font-sans tracking-tight">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
