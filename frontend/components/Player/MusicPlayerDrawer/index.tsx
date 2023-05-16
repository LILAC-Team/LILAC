import * as S from "./style";
import React, { useState } from "react";
import Drawer from "@/components/common/Drawer";
import MenuBar from "@/components/common/MenuBar";
import MusicController from "../MusicController";
import BasicText from "@/components/common/BasicText";
import { useSelector, useDispatch } from "react-redux";
import BasicImage from "@/components/common/BasicImage";

import { playListState } from "@/store/modules/playList";
interface playerState {
  playList: playListState;
}

const MusicPlayerDrawer = () => {
  const [nowTime, setNowTime] = useState(5);
  const [isRotating, setIsRotating] = useState(false);
  const [state, setState] = useState({ bottom: false });
  const [nowOpen, setNowOpen] = useState("");

  const { playing, shuffle, OnSeekToZero, currPlayingMusicInfo } = useSelector(
    (state: playerState) => state.playList
  );

  const handleRotateClick = (state: boolean) => {
    setIsRotating(!state);
  };

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
    <S.Player>
      <S.Top>
        <S.Bar />
        <BasicText text='Now Playing' size='125%' font='NotoSansKR500' />
      </S.Top>
      <S.AlbumCover>
        <BasicImage
          src={currPlayingMusicInfo.albumImage}
          size='calc((var(--vh, 1vh) * 30))'
          radius={10}
          isRotate={isRotating}
        />
      </S.AlbumCover>
      <S.Title>
        <BasicText
          text={currPlayingMusicInfo.name}
          size='2rem'
          font='NotoSansKR700'
        />
      </S.Title>
      <S.Artist>
        <BasicText text={currPlayingMusicInfo.artistName} size='1rem' />
      </S.Artist>
      {/* <S.Comment>
        {currPlayingMusicInfo.recentCommentList.map((item, index) => {
          return (
            <React.Fragment key={index}>
              {item.present_time === nowTime && (
                <S.CommentWrap
                  onClick={(e) => {
                    toggleDrawer("bottom", true)(e);
                    setNowOpen("comment");
                  }}
                >
                  <S.CommentImg>
                    <BasicImage
                      src={item.userInfo.profileImage}
                      size='1.5rem'
                      radius={100}
                    />
                  </S.CommentImg>
                  <S.CommentDiv>
                    <BasicText text={item.content} size='0.75rem' />
                  </S.CommentDiv>
                </S.CommentWrap>
              )}
            </React.Fragment>
          );
        })}
      </S.Comment> */}
      <S.MusicBar>
        <div>tmp</div>
      </S.MusicBar>
      <S.ControllBar>
        <MusicController handleRotateClick={handleRotateClick} />
      </S.ControllBar>
      <MenuBar />
      <Drawer
        inner={nowOpen}
        toggleDrawer={toggleDrawer}
        state={{ ...state }}
        anchor={"bottom"}
      />
    </S.Player>
  );
};

export default MusicPlayerDrawer;
