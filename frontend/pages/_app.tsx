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

MyApp.getInitialProps = async ({ ctx, Component }) => {
  console.info("req: ", ctx.req.url);
  const pathname = ctx.req.url;
  const confirmUrl = ["/", "/album", "/form"];
  console.log("pathname: ", pathname);
  const isLogin = ctx.req.cookies.isLogIn;
  console.info("타입: ", typeof isLogin);
  console.info("쿠키에는 어떤값이 들어있나요?: ", ctx.req.cookies);
  if (isLogin !== "true" && confirmUrl.includes(pathname)) {
    ctx.res.setHeader("Location", "/login");
    ctx.res.statusCode = 302;
    ctx.res.end();
    return {};
  }
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};
export default MyApp;
