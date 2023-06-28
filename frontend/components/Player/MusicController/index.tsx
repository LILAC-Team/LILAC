import * as S from './style';
import { useSelector, useDispatch } from 'react-redux';
import CustomIconButton from '@/components/common/CustomIconButton';
import { TbRepeat, TbRepeatOnce, TbArrowsShuffle } from 'react-icons/tb';
import { IoPlay, IoPause, IoPlayBack, IoPlayForward } from 'react-icons/io5';
import { nextTrack, playListState, prevTrack } from '@/store/modules/playList';
import {
  setLoop,
  setShuffle,
  togglePlay,
  PutStartingPointToZero,
} from '@/store/modules/playList';

interface playerState {
  playList: playListState;
}
const MusicController = ({}) => {
  const dispatch = useDispatch();
  const { loop, playing, shuffle, OnSeekToZero, currPlayingMusicInfo } =
    useSelector((state: playerState) => state.playList);

  const handleClickShuffle = () => {
    if (currPlayingMusicInfo && currPlayingMusicInfo.index !== -1) {
      dispatch(setShuffle());
    }
  };

  const handleClickBackward = () => {
    if (currPlayingMusicInfo && currPlayingMusicInfo.index !== -1) {
      dispatch(PutStartingPointToZero(true));
      dispatch(prevTrack());
    }
  };

  const handleClickPlay = () => {
    if (currPlayingMusicInfo && currPlayingMusicInfo.index !== -1) {
      dispatch(togglePlay());
    }
  };

  const handleClickForward = () => {
    if (currPlayingMusicInfo && currPlayingMusicInfo.index !== -1) {
      dispatch(PutStartingPointToZero(true));
      dispatch(nextTrack());
    }
  };

  const handleClickRepeat = () => {
    if (currPlayingMusicInfo && currPlayingMusicInfo.index !== -1) {
      dispatch(setLoop());
    }
  };

  return (
    <S.ControllerWrapper>
      <S.ButtonWrapper>
        <CustomIconButton
          size='2.75rem'
          handleOnClickButton={handleClickShuffle}
        >
          {shuffle ? (
            <TbArrowsShuffle size='2rem' color='#CCA4FC' />
          ) : (
            <TbArrowsShuffle size='2rem' color='#FFFFFF' />
          )}
        </CustomIconButton>
      </S.ButtonWrapper>
      <S.ButtonWrapper>
        <CustomIconButton
          size='2.75rem'
          handleOnClickButton={handleClickBackward}
        >
          <IoPlayBack size='2rem' color='#FFFFFF' />
        </CustomIconButton>
      </S.ButtonWrapper>
      <S.ButtonWrapper>
        <CustomIconButton size='4.25rem' handleOnClickButton={handleClickPlay}>
          {playing ? (
            <IoPause size='3.5rem' color='#FFFFFF' />
          ) : (
            <IoPlay size='3.5rem' color='#FFFFFF' />
          )}
        </CustomIconButton>
      </S.ButtonWrapper>
      <S.ButtonWrapper>
        <CustomIconButton
          size='2.75rem'
          handleOnClickButton={handleClickForward}
        >
          <IoPlayForward size='2rem' color='#FFFFFF' />
        </CustomIconButton>
      </S.ButtonWrapper>
      <S.ButtonWrapper>
        <CustomIconButton
          size='2.75rem'
          handleOnClickButton={handleClickRepeat}
        >
          {loop ? (
            <TbRepeatOnce size='2rem' color='#CCA4FC' />
          ) : (
            <TbRepeat size='2rem' color='#CCA4FC' />
          )}
        </CustomIconButton>
      </S.ButtonWrapper>
    </S.ControllerWrapper>
  );
};

export default MusicController;
