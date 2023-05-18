import type { AppProps } from "next/app";
import { GlobalStyle } from "@/styles/globalStyle";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import wrapper from "@/store/configStore";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import ReactPlayerPortal from "@/components/Player/ReactPlayerPortal";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  const persistor = persistStore(store);

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
