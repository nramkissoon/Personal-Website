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
          {/* <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width"></meta>
          <meta name="robots" content="index,follow"></meta>

          <meta name="twitter:card" content="summary_large_image"></meta>
          <meta name="twitter:creator" content="@nickramki"></meta>

          <meta property="og:title" content="Developer Blog"></meta>
          <meta
            property="og:description"
            content="Developer blog covering software engineering topics, tutorials, personal project updates, and more."
          ></meta>
          <meta
            property="og:url"
            content="https://blog.nickramkissoon.com/"
          ></meta>
          <meta property="og:type" content="website"></meta>
          <meta property="og:image:alt" content="Developer blog."></meta>
          <meta property="og:image:type" content="image/png"></meta>
          <meta property="og:image:width" content="1200"></meta>
          <meta property="og:image:height" content="630"></meta>
          <meta
            property="og:image"
            content="https://blog.nickramkissoon.com/api/og"
          ></meta>
          <meta property="og:locale" content="en_IE"></meta>
          <meta
            property="og:site_name"
            content="Developer Blog | Nicholas Ramkissoon"
          ></meta>

          <meta
            name="description"
            content="Developer blog covering software engineering topics, tutorials, personal project updates, and more."
          ></meta>
          <meta name="next-head-count" content="18"></meta>

          <link rel="canonical" href="https://blog.nickramkissoon.com/"></link> */}
        </Head>
        <body className="text-gray-300 font-sans tracking-tight">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
