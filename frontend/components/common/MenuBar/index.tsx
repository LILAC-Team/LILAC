import * as S from "./style";
import CustomIconButton from "../CustomIconButton";
import Drawer from "@/components/common/Drawer";
import React, { useState, useEffect } from "react";
import { BiCommentDetail } from "react-icons/bi";
import { RiPlayListFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { commentListState } from "@/store/modules/commentList";
import { playListState } from "@/store/modules/playList";

interface commentState {
  commentList: commentListState;
}

interface playerState {
  playList: playListState;
}

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

  const [nowTime, setNowTime] = useState(0);
  const { time } = useSelector((state: commentState) => state.commentList);
  const { currPlayingMusicInfo } = useSelector(
    (state: playerState) => state.playList
  );

  useEffect(() => {
    setNowTime(0);
  }, [currPlayingMusicInfo]);

  return (
    <>
      <S.MenuWrapper>
        <S.Comment
          onClick={(e) => {
            toggleDrawer("bottom", true)(e);
            setNowOpen("comment");
            setNowTime(time);
          }}>
          <S.ButtonWrapper>
            <CustomIconButton size="2.5rem">
              <BiCommentDetail size="1.5rem" color="#CCA4FC" />
            </CustomIconButton>
          </S.ButtonWrapper>
        </S.Comment>
        <S.PlayList
          onClick={(e) => {
            toggleDrawer("bottom", true)(e);
            setNowOpen("playlist");
          }}>
          <S.ButtonWrapper>
            <CustomIconButton size="2.5rem">
              <RiPlayListFill size="1.5rem" color="#CCA4FC" />
            </CustomIconButton>
          </S.ButtonWrapper>
        </S.PlayList>
      </S.MenuWrapper>
      <Drawer
        inner={nowOpen}
        toggleDrawer={toggleDrawer}
        state={{ ...state }}
        anchor={"bottom"}
        time={nowTime}
      />
    </>
  );
};

export default MenuBar;
