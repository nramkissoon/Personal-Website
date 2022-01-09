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
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="bg-zinc-50 text-slate-900">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
