import * as S from "./style";
import CustomIconButton from "@/components/common/CustomIconButton";
import { TbRepeat, TbRepeatOnce, TbArrowsShuffle } from "react-icons/tb";
import { IoPlay, IoPause, IoPlayBack, IoPlayForward } from "react-icons/io5";
import { useState } from "react";

const MusicController = ({ handleRotateClick }) => {
  const [shuffleState, setShuffleState] = useState(false);
  const [playState, setPlayState] = useState(false);
  const [repeatState, setRepeatState] = useState(0);

  handleRotateClick(playState);

  const handleClickShuffle = () => {
    if (shuffleState) {
      setShuffleState((props) => !props);
      console.log("Shuffle Off");
    } else {
      setShuffleState((props) => !props);
      console.log("Shuffle On");
    }
  };

  const handleClickBackward = () => {
    console.log("Play previous music");
  };

  const handleClickPlay = () => {
    if (playState) {
      setPlayState((props) => !props);
      console.log("Play");
    } else {
      setPlayState((props) => !props);
      console.log("Pause");
    }
  };

  const handleClickForward = () => {
    console.log("Play next music");
  };

  const handleClickRepeat = () => {
    if (repeatState === 0) {
      console.log("Repeat all");
      setRepeatState(1);
    } else if (repeatState === 1) {
      setRepeatState(2);
      console.log("Repeat once");
    } else {
      setRepeatState(0);
      console.log("No repeat");
    }
  };

  return (
    <S.ControllerWrapper>
      <CustomIconButton handleOnClickButton={handleClickShuffle}>
        {shuffleState ? (
          <TbArrowsShuffle size="2rem" color="#CCA4FC" />
        ) : (
          <TbArrowsShuffle size="2rem" color="#FFFFFF" />
        )}
      </CustomIconButton>
      <CustomIconButton handleOnClickButton={handleClickBackward}>
        <IoPlayBack size="2rem" color="#FFFFFF" />
      </CustomIconButton>
      <CustomIconButton handleOnClickButton={handleClickPlay}>
        {playState ? (
          <IoPlay size="3.5rem" color="#FFFFFF" />
        ) : (
          <IoPause size="3.5rem" color="#FFFFFF" />
        )}
      </CustomIconButton>
      <CustomIconButton handleOnClickButton={handleClickForward}>
        <IoPlayForward size="2rem" color="#FFFFFF" />
      </CustomIconButton>
      <CustomIconButton handleOnClickButton={handleClickRepeat}>
        {repeatState === 0 ? (
          <TbRepeat size="2rem" color="#FFFFFF" />
        ) : repeatState === 1 ? (
          <TbRepeat size="2rem" color="#CCA4FC" />
        ) : (
          <TbRepeatOnce size="2rem" color="#CCA4FC" />
        )}
      </CustomIconButton>
    </S.ControllerWrapper>
  );
};

export default MusicController;
