import BasicImage from "@/components/common/BasicImage";
import * as S from "./style";
import React, { useState, useRef } from "react";
import music from "../../../pages/music.json";
import MenuBar from "@/components/common/MenuBar";
import BasicText from "@/components/common/BasicText";
import MusicController from "../MusicController";
import styled, { css } from "styled-components";

const MusicPlayerDrawer = () => {
  const [nowTime, setNowTime] = useState(5);
  const [isRotating, setIsRotating] = useState(false);

  const handleRotateClick = (state: boolean) => {
    setIsRotating(!state);
  };

  return (
    <S.Player>
      <S.Top>
        <BasicText text="Now Playing" size="125%" />
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
        <BasicText text={music.name} size="2rem" />
      </S.Title>
      <S.Artist>
        <BasicText text={music.artistName} size="1.25rem" />
      </S.Artist>
      <S.Comment>
        {music.recentCommentList.map((item, index) => {
          return (
            <>
              {item.present_time === nowTime && (
                <S.Comment key={index}>
                  <S.CommentImg>
                    <BasicImage
                      src={item.userInfo.profileImage}
                      size="2rem"
                      radius={100}
                    />
                  </S.CommentImg>
                  <S.CommentDiv>
                    <BasicText text={item.content} size="1rem" />
                  </S.CommentDiv>
                </S.Comment>
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
    </S.Player>
  );
};

export default MusicPlayerDrawer;
