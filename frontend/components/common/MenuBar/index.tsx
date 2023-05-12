import * as S from "./style";
import CustomIconButton from "../CustomIconButton";
import React, { useState, useRef, useEffect } from "react";
import { BiCommentDetail } from "react-icons/bi";
import { RiPlayListFill } from "react-icons/ri";
import Drawer from "@/components/common/Drawer";

const MenuBar = () => {
  const [state, setState] = React.useState({ bottom: false });
  const [nowOpen, setNowOpen] = useState("");
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
    <>
      <S.MenuWrapper>
        <S.Comment
          onClick={(e) => {
            toggleDrawer("bottom", true)(e);
            setNowOpen("comment");
          }}
        >
          <CustomIconButton>
            <BiCommentDetail size="1.25rem" color="#FFFFFF" />
          </CustomIconButton>
        </S.Comment>
        <S.PlayList
          onClick={(e) => {
            toggleDrawer("bottom", true)(e);
            setNowOpen("playlist");
          }}
        >
          <CustomIconButton>
            <RiPlayListFill size="1.25rem" color="#FFFFFF" />
          </CustomIconButton>
        </S.PlayList>
      </S.MenuWrapper>
      <Drawer
        inner={nowOpen}
        toggleDrawer={toggleDrawer}
        state={{ ...state }}
        anchor={"bottom"}
      />
    </>
  );
};

export default MenuBar;
