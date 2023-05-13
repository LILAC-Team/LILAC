import type { AppProps } from "next/app";
import { GlobalStyle } from "@/styles/globalStyle";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import wrapper, { RootState, makeStore } from "@/store/configStore";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Context, createWrapper } from "next-redux-wrapper";
import { Store, AnyAction } from "redux";
const MyApp = ({ Component, pageProps }: AppProps) => {
  // const { store, props } = wrapper.useWrappedStore(pageProps);
  // const { store, props } = wrappe
  // const persistor = persistStore(store);

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
      {/* // <Provider store={wrapper.store}> */}
      {/* // <PersistGate loading={null} persistor={wrapper.persistor}> */}
      <GlobalStyle />
      <Component {...pageProps} />
      {/* // </PersistGate> */}
      {/* // </Provider> */}
    </>
  );
};

// MyApp.getInitialProps = async ({ ctx, Component }) => {
//   console.info("req: ", ctx.req.url);
//   const pathname = ctx.req.url;
//   const confirmUrl = ["/", "/album", "/form"];
//   console.log("pathname: ", pathname);
//   const isLogin = ctx.req.cookies.isLogIn;
//   if (confirmUrl.includes(pathname)) {
//     try {
//       const data = await memberApi.getUserInfo();
//     } catch (error) {
//       console.info("---error----", error);
//       ctx.res.setHeader("Location", "/login");
//       ctx.res.statusCode = 302;
//       ctx.res.end();
//       return {};
//     }
//   }

//   let pageProps = {};
//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx);
//   }

//   return { pageProps };
// };

export default wrapper.withRedux(MyApp);
