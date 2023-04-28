import BasicText from "@/components/common/BasicText";
import React, { useState } from "react";
import { useRouter } from "next/router";
import test from "./test.json";
import CustomTextButton from "@/components/common/CustomTextButton";
import CustomIconButton from "@/components/common/CustomIconButton";
import { AiOutlinePlus } from "react-icons/ai";
import { render } from "react-dom";
// import Drawer from "react-drag-drawer";
import AlbumCard from "@/components/common/AlbumCard";
import BasicImage from "@/components/common/BasicImage";
import styled, { css } from "styled-components";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

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
    (anchor: Anchor, open: boolean) =>
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
  const list = (anchor: Anchor) => <MyDiv>hello</MyDiv>;
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  // const [state, setState] = React.useState({
  //   regular: false,
  //   sidebarLeft: false,
  //   sidebarRight: false,
  //   asyncHeight: false,
  //   crazyStyle: false,
  // });

  // const toggle =
  //   (type: string, value: boolean) =>
  //   (event: React.KeyboardEvent | React.MouseEvent) => {
  //     setState({ ...state, [type]: value });
  //   };

  // const { regular, sidebarLeft, sidebarRight, asyncHeight, crazyStyle } = state;

  // const ModalElement = css`
  //   position: absolute;
  //   top: 30px;
  // `;
  return (
    <>
      {/* <BasicText
        text="테스트"
        // color="transparent"
        // background="linear-gradient(0deg, rgba(216,194,254,1) 0%, rgba(204,164,252,1) 35%, rgba(61,58,75,1) 100%)"
        font=""
        // clip={true}
        size="2rem"
      /> */}
      <BasicImage
        src="https://i.namu.wiki/i/m60BZ35BZRrbiqpurjIPB7GAs74I2LPNXe0MuHeEemha3ksZzGJo21PfgIdXn6JXZV0Wnps6xiAMPCVb_BYIwMeDwGEtL1R9Sxe5lmGUb4ZlPMyUO-vxTNG-6RMTR23h-myh5DqQk0h38DUi-wxiUA.jpg"
        size="15rem"
        radius={10}
        isRotate={true}
      />

      {/* <button onClick={toggle("regular", true)}>Open example</button>

      <Drawer
        open={regular}
        onRequestClose={toggle("regular", false)}
        // modalElementclass={ModalElement}
      >
        <Modaldiv>
          hey
          <button onClick={toggle("regular", false)}>Close drawer</button>
        </Modaldiv>
      </Drawer> */}
      {(["bottom"] as const).map((anchor) => (
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
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
      <div style={tmpStyle}>
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
      </div>
      <div style={btnStyle}>
        <CustomTextButton
          text="생성"
          size="2rem"
          font=""
          fontColor="#ffffff"
          // border="5px dashed green"
          // isBackground={false}
          // isDisabled={true}
          handleOnClickButton={tmpFunction}
        />
      </div>
      <div style={btnStyle}>
        <CustomIconButton
          color="#d47a7a"
          size="5rem"
          // border="5px dashed black"
          // isDisabled={true}
          handleOnClickButton={tmpFunction}
        >
          <AiOutlinePlus color="#ffffff" size="5rem" />
        </CustomIconButton>
      </div>
    </>
  );
};

export default Test;

const modal = css`
  position: absolute;
  top: 30px;
  background-color: white;
  width: 100%;
  max-width: 700px;
  min-height: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const Modaldiv = styled.div`
  /* position: absolute; */
  width: calc(var(--vw, 1vw) * 100);
  height: calc(var(--vh, 1vh) * 95);
  background-color: black;
  /* top: 30px; */
  /* top: -calc(var(--vh, 1vh) * 50); */
  /* bottom: 0px; */
`;

export const MyDiv = styled.div`
  width: calc(var(--vw, 1vw) * 100);
  height: calc(var(--vh, 1vh) * 95);
  background-color: white;
  border-top-left-radius: 5%;
  border-top-right-radius: 5%;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const modalItem = styled.div`
  position: absolute;
  top: 30px;
`;

// export const Container = styled.div`
//   .ModalElement {
//     position: absolute;
//     top: 30px;
//     text-align: center;
//   }
// `;
