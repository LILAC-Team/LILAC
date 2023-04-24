// import "@/styles/globals.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
// import * as S from "../style";
import { Fragment, useEffect } from "react";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    window.addEventListener("resize", () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }, []);

  return <Component {...pageProps} />;
};

export default MyApp;
