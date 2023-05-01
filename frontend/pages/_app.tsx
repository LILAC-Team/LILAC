import type { AppProps } from "next/app";
import { GlobalStyle } from "@/styles/globalStyle";
import { useEffect } from "react";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    window.addEventListener("resize", () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }, []);
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
