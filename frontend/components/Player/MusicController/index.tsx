import * as S from "./style";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomIconButton from "@/components/common/CustomIconButton";
import { TbRepeat, TbRepeatOnce, TbArrowsShuffle } from "react-icons/tb";
import { IoPlay, IoPause, IoPlayBack, IoPlayForward } from "react-icons/io5";
import { nextTrack, playListState, prevTrack } from "@/store/modules/playList";
import {
  setPlayList,
  setTrack,
  setLoop,
  setShuffle,
  togglePlay,
  PutStartingPointToZero,
} from "@/store/modules/playList";

interface playerState {
  playList: playListState;
}
const MusicController = ({}) => {
  const [shuffleState, setShuffleState] = useState(false);
  const [playState, setPlayState] = useState(false);
  const [repeatState, setRepeatState] = useState(0);
  const dispatch = useDispatch();
  const { loop, playing, shuffle, OnSeekToZero, currPlayingMusicInfo } =
    useSelector((state: playerState) => state.playList);

  const handleClickShuffle = () => {
    dispatch(setShuffle());
  };

  const handleClickBackward = () => {
    dispatch(PutStartingPointToZero(true));
    dispatch(prevTrack());
  };

  const handleClickPlay = () => {
    dispatch(togglePlay());
  };

  const handleClickForward = () => {
    dispatch(PutStartingPointToZero(true));
    dispatch(nextTrack());
  };

  const handleClickRepeat = () => {
    dispatch(setLoop());
  };

  return (
    <S.ControllerWrapper>
      <CustomIconButton handleOnClickButton={handleClickShuffle}>
        {shuffle ? (
          <TbArrowsShuffle size="2rem" color="#CCA4FC" />
        ) : (
          <TbArrowsShuffle size="2rem" color="#FFFFFF" />
        )}
      </CustomIconButton>
      <CustomIconButton handleOnClickButton={handleClickBackward}>
        <IoPlayBack size="2rem" color="#FFFFFF" />
      </CustomIconButton>
      <CustomIconButton handleOnClickButton={handleClickPlay}>
        {playing ? (
          <IoPause size="3.5rem" color="#FFFFFF" />
        ) : (
          <IoPlay size="3.5rem" color="#FFFFFF" />
        )}
      </CustomIconButton>
      <CustomIconButton handleOnClickButton={handleClickForward}>
        <IoPlayForward size="2rem" color="#FFFFFF" />
      </CustomIconButton>
      <CustomIconButton handleOnClickButton={handleClickRepeat}>
        {loop ? (
          <TbRepeatOnce size="2rem" color="#CCA4FC" />
        ) : (
          <TbRepeat size="2rem" color="#CCA4FC" />
        )}
      </CustomIconButton>
    </S.ControllerWrapper>
  );
};

export default MusicController;
