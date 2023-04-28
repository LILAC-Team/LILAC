import React from "react";
import Header from "../Header";
import styled from "styled-components";
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
    <>
      <Header />
      <ChildrenWrap>{children}</ChildrenWrap>
      <MusicPlayerBar data={data} />
      <NavigationBar />
    </>
  );
};

export default Layout;

const ContainerWrap = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 5rem calc(var(--vh, 1vh) * 100 - 12rem) 3.5rem 3.5rem;
`;

const ChildrenWrap = styled.div`
  height: calc(var(--vh, 1vh) * 100 - 12rem);
  padding: 0 1rem 0 1rem;
  ::-webkit-scrollbar {
    display: none;
  }
  overflow-y: hidden;
`;
