import * as S from "./style";
import React, { useState } from "react";
import Drawer from "@/components/common/Drawer";
import MenuBar from "@/components/common/MenuBar";
import MusicController from "../MusicController";
import BasicText from "@/components/common/BasicText";
import { useSelector, useDispatch } from "react-redux";
import BasicImage from "@/components/common/BasicImage";
import { playListState } from "@/store/modules/playList";
import {
  setTime,
  commentListState,
  setOnChange,
} from "@/store/modules/commentList";

interface playerState {
  playList: playListState;
}
interface commentState {
  commentList: commentListState;
}
const MusicPlayerDrawer = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({ bottom: false });
  const [nowOpen, setNowOpen] = useState("");

  const { time, recentCommentList } = useSelector(
    (state: commentState) => state.commentList
  );
  const { playing, shuffle, OnSeekToZero, currPlayingMusicInfo } = useSelector(
    (state: playerState) => state.playList
  );

  console.log("rerendering!!");

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

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("timeChange!!");
    const changeTime = parseInt(e.target.value);
    dispatch(setTime({ time: changeTime }));
    dispatch(setOnChange({onChangeValue: true}));
  };

  return (
    <>
      <S.Player>
        <S.Top>
          <S.Bar />
          <BasicText text="Now Playing" size="125%" font="NotoSansKR500" />
        </S.Top>
        <S.PlayerWrap>
          <S.AlbumCover>
            <BasicImage
              src={
                currPlayingMusicInfo.index !== -1
                  ? currPlayingMusicInfo.albumImage
                  : "/defaultProfile.svg"
              }
              size="calc((var(--vh, 1vh) * 30))"
              radius={10}
              isRotate={playing}
            />
          </S.AlbumCover>
          <S.Title>
            <BasicText
              text={
                currPlayingMusicInfo.index !== -1
                  ? currPlayingMusicInfo.name
                  : "LILAC"
              }
              size="2rem"
              font="NotoSansKR700"
            />
          </S.Title>
          <S.Artist>
            <BasicText
              text={
                currPlayingMusicInfo.index !== -1
                  ? currPlayingMusicInfo.artistName
                  : "나만의 플레이리스트를 생성해보세요"
              }
              size="1rem"
            />
          </S.Artist>
          <S.Comment>
            {currPlayingMusicInfo &&
              recentCommentList.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    {item.presentTime === time && (
                      <S.CommentWrap
                        onClick={(e) => {
                          toggleDrawer("bottom", true)(e);
                          setNowOpen("comment");
                        }}
                      >
                        <S.CommentImg>
                          <BasicImage
                            src={item.memberInfo.profileImage}
                            size="1.5rem"
                            radius={100}
                          />
                        </S.CommentImg>
                        <S.CommentDiv>
                          <BasicText text={item.content} size="0.75rem" />
                        </S.CommentDiv>
                      </S.CommentWrap>
                    )}
                  </React.Fragment>
                );
              })}
          </S.Comment>
          <S.PlayerBarWrap>
            {
              <S.PlayerBar
                type="range"
                min={0}
                max={currPlayingMusicInfo.playtime}
                // step={1}
                value={time}
                onChange={handleTimeChange}
              />
            }
            <S.PlayerBarTimeInfo>
              <BasicText
                text={
                  Math.floor(time / 60) +
                  " : " +
                  (time % 60 >= 10 ? time % 60 : "0" + (time % 60))
                }
                font="NotoSansKR400"
                size="75%"
              />
              <BasicText
                text={`${Math.floor(currPlayingMusicInfo.playtime / 60)} : ${
                  currPlayingMusicInfo.playtime % 60 >= 10
                    ? currPlayingMusicInfo.playtime % 60
                    : "0" + (currPlayingMusicInfo.playtime % 60)
                }`}
                font="NotoSansKR400"
                size="75%"
              />
            </S.PlayerBarTimeInfo>
          </S.PlayerBarWrap>
          <S.ControllBar>
            <MusicController />
          </S.ControllBar>
          {/* <S.MenuBarDiv /> */}
          <MenuBar />
        </S.PlayerWrap>
        <Drawer
          inner={nowOpen}
          toggleDrawer={toggleDrawer}
          state={{ ...state }}
          anchor={"bottom"}
        />
      </S.Player>
    </>
  );
};

export default MusicPlayerDrawer;
