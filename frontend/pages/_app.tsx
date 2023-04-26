import Header from "@/components/common/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
// import * as S from "../style";
import { Fragment, useEffect } from "react";
// import "react-beautiful-dnd/style.css";
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
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
