const withTM = require("next-transpile-modules")(["ui"]);

module.exports = withTM({
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx'],
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(ts)x??$/, // Just `tsx?` file only
      use: [
        options.defaultLoaders.babel,
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            onlyCompileBundledFiles: true,
          },
        },
      ],
    });
  
    return config;
  },
});
