import { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

const Document = ({ styles }) => {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <style>
          {`
            html {
              --color-background: #3d3a4b;
              --color-primary: #cca4fc;
              --color-light: #e3dfff;
            }
            body {
              font-family: "NotoSansKR700", "NotoSansKR500", "NotoSansKR400", sans-serif;
              max-width: 100vw;
              margin: 0rem;
              padding: 0rem 1rem 0rem 1rem;
              overflow-x: hidden;
            }
          `}
        </style>
        {styles}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

// Document.getInitialProps = async (ctx) => {
//   const sheet = new ServerStyleSheet();
//   const originalRenderPage = ctx.renderPage;

//   try {
//     ctx.renderPage = () =>
//       originalRenderPage({
//         enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
//       });

//     const initialProps = await Document.getInitialProps(ctx);
//     return {
//       ...initialProps,
//       styles: (
//         <>
//           {initialProps.styles}
//           {sheet.getStyleElement()}
//         </>
//       ),
//     };
//   } finally {
//     sheet.seal();
//   }
// };

export default Document;
