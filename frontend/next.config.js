// /** @type {import('next').NextConfig} */

// const nextConfig = {
//   pageExtensions: ["tsx"],
//   reactStrictMode: false,
//   webpack: (config) => {
//     config.module.rules.push({
//       test: /\.svg$/,
//       use: [
//         {
//           loader: "@svgr/webpack",
//           options: {
//             svgoConfig: {
//               plugins: [
//                 {
//                   // Enable figma's wrong mask-type attribute work
//                   removeRasterImages: false,
//                   removeStyleElement: false,
//                   removeUnknownsAndDefaults: false,
//                   // Enable svgr's svg to fill the size
//                   removeViewBox: false,
//                 },
//               ],
//             },
//           },
//         },
//       ],
//     });
//     config.resolve.modules.push(__dirname);
//     return config;
//   },
// };
// // module.exports = withPlugins([withFonts()], nextConfig);
// module.exports = nextConfig;

// // const withPWA = require("next-pwa")({
// //   dest: "public",
// // });

// // module.exports = withPWA({
// //   // next.js config
// //   // reactStrictMode: true,
// // });
// const withPWA = require("next-pwa");

// module.exports = withPWA({
//   pwa: {
//     dest: "public",
//     // 추가적인 PWA 구성 옵션을 여기에 설정할 수 있습니다.
//   },
//   pageExtensions: ["tsx"],
//   reactStrictMode: false,
//   webpack: (config) => {
//     // 웹팩 설정을 수정합니다.
//     // ...
//     return config;
//   },
// });
const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  // pwa: {
  //   dest: "public",
  //   // 추가적인 PWA 구성 옵션을 여기에 설정할 수 있습니다.
  // },
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
