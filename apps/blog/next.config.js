//const withTM = require("next-transpile-modules")(["ui"]);

module.exports = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx"],
  images: {
    domains: ["komonitor-blog.s3.amazonaws.com", "cdn.uploadjoy.com"],
  },
  async redirects() {
    return [
      {
        source: "/posts/integrate-stripe-t3",
        destination: "https://nkrkn.me/writing/t3-stripe",
        permanent: true,
      },
      {
        source: "/posts/t3-s3-presigned-urls",
        destination: "https://nkrkn.me/writing/t3-s3",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/posts/integrate-stripe-t3",
          destination: "https://nkrkn.me/writing/t3-stripe",
        },
        {
          source: "/posts/t3-s3-presigned-urls",
          destination: "https://nkrkn.me/writing/t3-s3",
        },
      ],
    };
  },
};
