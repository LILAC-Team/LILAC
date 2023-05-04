import type { AppProps } from "next/app";
import { GlobalStyle } from "@/styles/globalStyle";
import { useEffect } from "react";
import { Provider } from "react-redux";
import wrapper from "@/store/configStore";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    window.addEventListener("resize", () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }, []);

  return (
    <Provider store={store}>
      <GlobalStyle />
      <Component {...props} />
    </Provider>
  );
};

export default MyApp;
