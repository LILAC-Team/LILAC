import React, { useEffect } from "react";
import Head from "next/head";
import Header from "../Header";
import * as S from "./style";
import NavigationBar from "../NavigationBar";
import MusicPlayerBar from "@/components/Player/MusicPlayerBar";
import Drawer from "@/components/common/Drawer";
import { resize } from "@/api/func/resize";
const Layout = ({ children }) => {
  const [state, setState] = React.useState({ bottom: false });
  const toggleDrawer =
    (anchor: string, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <S.ContainerWrap>
        <Header />
        <S.ChildrenWrap>{children}</S.ChildrenWrap>
        <>
          <MusicPlayerBar onClickEvent={toggleDrawer("bottom", true)} />
          <Drawer
            inner='player'
            toggleDrawer={toggleDrawer}
            state={{ ...state }}
            anchor={"bottom"}
          />
        </>
        <NavigationBar />
      </S.ContainerWrap>
    </>
  );
};

Layout.displayName = "Layout";

export default Layout;
