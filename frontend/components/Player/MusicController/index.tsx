import * as S from "./style";
import CustomIconButton from "@/components/common/CustomIconButton";
import { TbRepeat, TbRepeatOnce, TbArrowsShuffle } from "react-icons/tb";
import { FaPlay, FaPause, FaBackward, FaForward } from "react-icons/fa";
import { useState } from "react";

const MusicController = () => {
  const [shuffleState, setShuffleState] = useState(false);
  const [playState, setPlayState] = useState(false);
  const [repeatState, setRepeatState] = useState(0);

  const handleClickShuffle = () => {
    if (shuffleState) {
      setShuffleState((props) => !props);
      console.log("Shuffle Off");
    } else {
      setShuffleState((props) => !props);
      console.log("Shuffle On");
    }
  };

  const handleClickBackward = () => {};

  const handleClickPlay = () => {
    if (playState) {
      setPlayState((props) => !props);
      console.log("Play");
    } else {
      setPlayState((props) => !props);
      console.log("Pause");
    }
  };

  const handleClickForward = () => {};

  const handleClickRepeat = () => {
    if (repeatState === 0) {
      setRepeatState(1);
    } else if (repeatState === 1) {
      setRepeatState(2);
    } else {
      setRepeatState(0);
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
        <FaBackward size="2rem" color="#FFFFFF" />
      </CustomIconButton>
      <CustomIconButton handleOnClickButton={handleClickPlay}>
        {playState ? (
          <FaPlay size="2.5rem" color="#FFFFFF" />
        ) : (
          <FaPause size="2.5rem" color="#FFFFFF" />
        )}
      </CustomIconButton>
      <CustomIconButton handleOnClickButton={handleClickForward}>
        <FaForward size="2rem" color="#FFFFFF" />
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
