/** @type {import('next').NextConfig} */

const nextConfig = {
  pageExtensions: ["tsx", "jsx"],
  reactStrictMode: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  // Enable figma's wrong mask-type attribute work
                  removeRasterImages: false,
                  removeStyleElement: false,
                  removeUnknownsAndDefaults: false,
                  // Enable svgr's svg to fill the size
                  removeViewBox: false,
                },
              ],
            },
          },
        },
      ],
    });
    config.resolve.modules.push(__dirname);
    return config;
  },
};
// module.exports = withPlugins([withFonts()], nextConfig);
module.exports = nextConfig;

const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  // next.js config
  // reactStrictMode: true,
});
