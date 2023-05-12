/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  // pwa: {
  //   dest: "public",
  //   // 추가적인 PWA 구성 옵션을 여기에 설정할 수 있습니다.
  // },
  env: {
    CLOUDFRONT_URL: "https://d1nj0um6xv6zar.cloudfront.net/",
  },
  pageExtensions: ["tsx"],
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    // 웹팩 설정을 수정합니다.
    if (!isServer) {
      config.plugins = config.plugins.filter(
        (plugin) => plugin.constructor.name !== "HotModuleReplacementPlugin"
      );
    }
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
});
