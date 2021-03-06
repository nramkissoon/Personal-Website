const withTM = require("next-transpile-modules")(["ui"]);

module.exports = withTM({
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx'],
  images: {
    domains: ['komonitor-blog.s3.amazonaws.com'],
  }
});
