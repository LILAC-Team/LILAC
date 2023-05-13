/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  disable: true,
});

module.exports = withPWA({
  env: {
    CLOUDFRONT_URL: "https://d1nj0um6xv6zar.cloudfront.net/",
  },
  pageExtensions: ["tsx"],
  reactStrictMode: false,
  webpack: (config) => {
    // 웹팩 설정을 수정합니다.
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

// async redirects() {
//   return [
//     {
//       source: "/404",
//       destination: "/404/index",
//       permanent: true,
//     },
//   ];
// },
