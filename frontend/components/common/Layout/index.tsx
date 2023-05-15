import React, { useState, useEffect } from "react";
import Header from "../Header";
import * as S from "./style";
import NavigationBar from "../NavigationBar";
import MusicPlayerBar from "@/components/Player/MusicPlayerBar";
import Drawer from "@/components/common/Drawer";
import ReactPlayerPortal from "@/components/Player/ReactPlayerPortal";

interface LayoutProps {
  children: React.ReactNode;
}

const data = {
  name: "Hype Boy",
  albumImage:
    "https://i.namu.wiki/i/cytHwWVRppd9XseMtP5NN5K9wxAdwHAUCEqRivJ5rxaAR-XEqGoCBPzpBLFyyberN-c57qlxi--sOltC7uLqwl6yVtZcGxpbWxtqNR7tmTZNYKg13ePEZ0-tqiPqPVXT3KAASlW5UkHlto3MLdZQYg.jpg",
  code: "bbbb",
  releasedDate: "2023-04-24T01:00:00",
  nickname: "봄윤식스",
};
const Layout: React.FC<LayoutProps> = React.memo(({ children }) => {
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
  return (
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
  );
});

Layout.displayName = "Layout";

export default Layout;
