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

// MyApp.getInitialProps = async ({ ctx }) => {
//   console.info("req: ", ctx.req.url);
//   const pathname = ctx.req.url;
//   const confirmUrl = ["/", "/album", "/form"];
//   console.log("pathname: ", pathname);
//   if (confirmUrl.includes(pathname)) {
//     ctx.res.setHeader("Location", "/login");
//     ctx.res.statusCode = 302;
//     ctx.res.end();
//   } else {
//   }
// };
export default MyApp;
