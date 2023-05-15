import type { AppProps } from "next/app";
import { GlobalStyle } from "@/styles/globalStyle";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import wrapper from "@/store/configStore";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import ReactPlayerPortal from "@/components/Player/ReactPlayerPortal";

const resize = () => {
  console.log("흠2");
  let vh = window.innerHeight * 0.01;
  let vw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  document.documentElement.style.setProperty("--vw", `${vw}px`);
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  const persistor = persistStore(store);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GlobalStyle />
          <ReactPlayerPortal />
          <Component {...props} />
        </PersistGate>
      </Provider>
    </>
  );
};

export default wrapper.withRedux(MyApp);
