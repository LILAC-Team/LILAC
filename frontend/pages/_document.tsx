import { Html, Head, Main, NextScript } from "next/document";

const Document = ({ styles }) => {
  return (
    <Html>
      <Head>{styles}</Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
