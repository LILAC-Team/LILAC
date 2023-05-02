import BasicImage from "@/components/common/BasicImage";
import * as S from "./style";
import React, { useState, useRef } from "react";
import music from "../../../pages/music.json";
import MenuBar from "@/components/common/MenuBar";
import BasicText from "@/components/common/BasicText";
import MusicController from "../MusicController";
import styled, { css } from "styled-components";
import Drawer from "@/components/common/Drawer";

const MusicPlayerDrawer = () => {
  const [nowTime, setNowTime] = useState(5);
  const [isRotating, setIsRotating] = useState(false);

  const handleRotateClick = (state: boolean) => {
    setIsRotating(!state);
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
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <S.Player>
      <S.Top>
        <BasicText text="Now Playing" size="125%" font="NotoSansKR500" />
      </S.Top>
      <S.AlbumCover>
        <BasicImage
          src={music.albumImage}
          size="calc((var(--vh, 1vh) * 30))"
          radius={10}
          isRotate={isRotating}
        />
      </S.AlbumCover>
      <S.Title>
        <BasicText text={music.name} size="2rem" font="NotoSansKR700" />
      </S.Title>
      <S.Artist>
        <BasicText text={music.artistName} size="1rem" font="NotoSansKR400" />
      </S.Artist>
      <S.Comment>
        {music.recentCommentList.map((item, index) => {
          return (
            <>
              {item.present_time === nowTime && (
                <S.CommentWrap
                  key={index}
                  onClick={toggleDrawer("bottom", true)}
                >
                  <S.CommentImg>
                    <BasicImage
                      src={item.userInfo.profileImage}
                      size="1.5rem"
                      radius={100}
                    />
                  </S.CommentImg>
                  <S.CommentDiv>
                    <BasicText
                      text={item.content}
                      size="0.75rem"
                      font="NotoSansKR400"
                    />
                  </S.CommentDiv>
                </S.CommentWrap>
              )}
            </>
          );
        })}
      </S.Comment>
      <S.MusicBar>
        <div>tmp</div>
      </S.MusicBar>
      <S.ControllBar>
        <MusicController handleRotateClick={handleRotateClick} />
      </S.ControllBar>
      <MenuBar />
      <Drawer
        inner="comment"
        toggleDrawer={toggleDrawer}
        state={{ ...state }}
        anchor={"bottom"}
      />
    </S.Player>
  );
};

export default MusicPlayerDrawer;
