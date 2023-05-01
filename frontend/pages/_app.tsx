import type { AppProps } from "next/app";
import { GlobalStyle } from "@/styles/globalStyle";
import { useEffect } from "react";
import Layout from "@/components/common/Layout";
import { GetServerSideProps } from "next";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    window.addEventListener("resize", () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }, []);

  console.log("pageProps: ", pageProps);

  return (
    <>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default MyApp;
