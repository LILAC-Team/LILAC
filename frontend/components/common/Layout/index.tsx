import React, { useState, useEffect } from "react";
import Header from "../Header";
import * as S from "./style";
import NavigationBar from "../NavigationBar";
import MusicPlayerBar from "@/components/Player/MusicPlayerBar";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const data = {
    name: "Hype Boy",
    albumImage:
      "https://i.namu.wiki/i/m60BZ35BZRrbiqpurjIPB7GAs74I2LPNXe0MuHeEemha3ksZzGJo21PfgIdXn6JXZV0Wnps6xiAMPCVb_BYIwMeDwGEtL1R9Sxe5lmGUb4ZlPMyUO-vxTNG-6RMTR23h-myh5DqQk0h38DUi-wxiUA.jpg",
    code: "bbbb",
    releasedDate: "2023-04-24T01:00:00",
    nickname: "봄윤식스",
  };

  return (
    <S.ContainerWrap>
      <Header />
      <S.ChildrenWrap>{children}</S.ChildrenWrap>
      <MusicPlayerBar data={data} />
      <NavigationBar />
    </S.ContainerWrap>
  );
};

export default Layout;
