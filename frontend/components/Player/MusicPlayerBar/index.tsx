import React, { useState } from "react";
import * as S from "./style";
import CustomIconButton from "@/components/common/CustomIconButton";
import BasicImage from "@/components/common/BasicImage";
import BasicText from "@/components/common/BasicText";
import { IoPlay, IoPause, IoPlayForward } from "react-icons/io5";
import { RiPlayListFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import {
  togglePlay,
  PutStartingPointToZero,
  nextTrack,
} from "@/store/modules/playList";
import Drawer from "@/components/common/Drawer";
import { useRouter } from "next/router";
import { playListState } from "@/store/modules/playList";

interface MusicPlayerBarProps {
  onClickEvent: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

interface MusicControllerState {
  playList: playListState;
}

const MusicPlayerBar: React.FC<MusicPlayerBarProps> = React.memo(
  ({ onClickEvent }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { playing, currPlayingMusicInfo } = useSelector(
      (state: MusicControllerState) => state.playList
    );

    const handleClickPlay = () => {
      dispatch(togglePlay());
    };

    const handleClickForward = () => {
      dispatch(PutStartingPointToZero(true));
      dispatch(nextTrack());
    };

    const [state, setState] = useState({ bottom: false });
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
        <S.BarWrapper>
          <S.LeftWrapper onClick={onClickEvent}>
            <S.AlbumImg>
              <BasicImage
                isAlbumPage={true}
                src={
                  currPlayingMusicInfo && currPlayingMusicInfo.index !== -1
                    ? process.env.CLOUDFRONT_URL +
                      currPlayingMusicInfo.albumImage
                    : "/icons/favicon-512x512.png"
                }
                radius={0.15}
              />
            </S.AlbumImg>
            <S.TextWrapper>
              <S.Title>
                <BasicText
                  text={
                    currPlayingMusicInfo && currPlayingMusicInfo.index !== -1
                      ? currPlayingMusicInfo.name
                      : "LILAC"
                  }
                  size='1.125rem'
                  font='NotoSansKR700'
                />
              </S.Title>
              <S.Artist>
                <BasicText
                  text={
                    currPlayingMusicInfo && currPlayingMusicInfo.index !== -1
                      ? currPlayingMusicInfo.artistName
                      : "나만의 앨범을 등록해보세요"
                  }
                  size='0.75rem'
                  font='NotoSansKR400'
                />
              </S.Artist>
            </S.TextWrapper>
          </S.LeftWrapper>
          <S.RightWrapper>
            <CustomIconButton
              size='3.25rem'
              handleOnClickButton={handleClickPlay}
            >
              {!playing ? (
                <IoPlay size='2.5rem' color='#FFFFFF' />
              ) : (
                <IoPause size='2.5rem' color='#FFFFFF' />
              )}
            </CustomIconButton>
            <CustomIconButton
              size='2.25rem'
              handleOnClickButton={handleClickForward}
            >
              <IoPlayForward size='1.5rem' color='#FFFFFF' />
            </CustomIconButton>
            <CustomIconButton
              size='2.25rem'
              handleOnClickButton={(e) => {
                toggleDrawer("bottom", true)(e);
                setNowOpen("playlist");
              }}
            >
              <RiPlayListFill size='1.5rem' color='#FFFFFF' />
            </CustomIconButton>
          </S.RightWrapper>
        </S.BarWrapper>
        <Drawer
          inner={nowOpen}
          toggleDrawer={toggleDrawer}
          state={{ ...state }}
          anchor={"bottom"}
        />
      </>
    );
  }
);
MusicPlayerBar.displayName = "MusicPlayerBar";

export default MusicPlayerBar;
