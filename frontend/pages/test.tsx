import BasicText from "@/components/common/BasicText";
import React, { useState } from "react";
import { useRouter } from "next/router";
import test from "./test.json";
import CustomTextButton from "@/components/common/CustomTextButton";
import CustomIconButton from "@/components/common/CustomIconButton";
import { AiOutlinePlus } from "react-icons/ai";
import AlbumCard from "@/components/common/AlbumCard";
import BasicImage from "@/components/common/BasicImage";
import styled, { css } from "styled-components";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import MusicPlayerDrawer from "@/components/Player/MusicPlayerDrawer";
import Layout from "@/components/common/Layout";
import Drawer from "@/components/common/Drawer";

type Anchor = "bottom";

const Test = () => {
  const router = useRouter();
  const tmpStyle = {
    display: "flex",
  };
  const btnStyle = {
    width: "50rem",
  };
  const tmpFunction = () => {
    router.push("/");
  };
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
    <Layout>
      <button onClick={toggleDrawer("bottom", true)}>test</button>
      <Drawer
        inner="player"
        toggleDrawer={toggleDrawer}
        state={{ ...state }}
        anchor={"bottom"}
      />
      {/* {(["bottom"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <button onClick={toggleDrawer(anchor, true)}>{anchor}</button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            PaperProps={{ style: { backgroundColor: "transparent" } }}
          >
            <MusicPlayerDrawer />
          </SwipeableDrawer>
        </React.Fragment>
      ))} */}
      {/* <BasicText text="테스트" size="2rem" /> */}
      {/* <BasicImage
        src="https://i.namu.wiki/i/m60BZ35BZRrbiqpurjIPB7GAs74I2LPNXe0MuHeEemha3ksZzGJo21PfgIdXn6JXZV0Wnps6xiAMPCVb_BYIwMeDwGEtL1R9Sxe5lmGUb4ZlPMyUO-vxTNG-6RMTR23h-myh5DqQk0h38DUi-wxiUA.jpg"
        size="15rem"
        radius={10}
        isRotate={true}
      /> */}

      {/* <div style={tmpStyle}>
        {test.releasedAlbumList.map((item) => {
          return (
            <AlbumCard
              key={item.code}
              onClickEvent={tmpFunction}
              data={item}
              showAlbumDetail={true}
            />
          );
        })}
      </div> */}
      {/* <div style={btnStyle}>
        <CustomTextButton
          text="생성"
          size="2rem"
          font=""
          fontColor="#ffffff"
          handleOnClickButton={tmpFunction}
        />
      </div> */}
      {/* <div style={btnStyle}>
        <CustomIconButton
          color="#d47a7a"
          size="5rem"
          handleOnClickButton={tmpFunction}
        >
          <AiOutlinePlus color="#ffffff" size="5rem" />
        </CustomIconButton>
      </div> */}
    </Layout>
  );
};

export default Test;

export const MyDiv = styled.div`
  width: calc(var(--vw, 1vw) * 100);
  height: calc(var(--vh, 1vh) * 95);
  background-color: white;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
