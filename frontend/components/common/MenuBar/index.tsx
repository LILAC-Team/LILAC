import * as S from "./style";
import CustomIconButton from "../CustomIconButton";
import React, { useState, useRef, useEffect } from "react";
import { BiCommentDetail } from "react-icons/bi";
import { RiPlayListFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import Drawer from "@/components/common/Drawer";
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
        time={nowTime}
      />
    </>
  );
};

export default MenuBar;
