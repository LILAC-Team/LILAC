import React from "react";
import Header from "../Header";
import styled from "styled-components";
import NavigationBar from "../NavigationBar";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <ChildrenWrap>{children}</ChildrenWrap>
      <TempWrap>절 지워주세요.</TempWrap>
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

const TempWrap = styled.div`
  height: 3.5rem;
`;
