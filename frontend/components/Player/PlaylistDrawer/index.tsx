import * as S from './style';
import { useState, useEffect, useCallback } from 'react';
import BasicText from '@/components/common/BasicText';
import CustomTextButton from '@/components/common/CustomTextButton';
import DragAndDrop from '@/components/Container/DragAndDrop';
import { useSelector, useDispatch } from 'react-redux';
import MusicCard from '../MusicCard';
import { playlistApi } from '@/api/utils/playlist';
import { playListState } from '@/store/modules/playList';
import {
  setPlayList,
  setTrack,
  togglePlay,
  PutStartingPointToZero,
} from '@/store/modules/playList';

interface Music {
  name: string;
  albumImage: string;
  artistName: string;
  playtime: number;
  code: string;
}

interface PlayList {
  musicList: Music[];
  listSize: number;
}

interface AppState {
  playList: playListState;
}

interface MusicControllerState {
  playList: {
    playing: boolean;
    currentTrackIndex: number;
    currSrc: string;
    musicList: MusicTrack[];
    listSize: number;
  };
}

interface MusicTrack {
  name: string;
  artistName: string;
  playtime: number;
  code: string;
  albumImage: string;
}

const PlaylistDrawer = () => {
  // Edit 여부
  const [isEdit, setIsEdit] = useState(false);

  // GET PlayList from Redux
  const nowPlayList = useSelector((state: AppState) => state.playList);
  const { musicList, musicListSize, shuffleArr } = useSelector(
    (state: AppState) => state.playList
  );

  const dispatch = useDispatch();

  // UPDATE PlayList 담는 list
  const [list, setList] = useState(Object.values(nowPlayList.musicList));
  // UPDATE list Size
  const [listSize, setListSize] = useState(nowPlayList.listSize);

  console.log('전체 플레이리스트', musicList);
  console.log('셔플된 index 번호', shuffleArr);
  console.log('Update된 플레이리스트', list);

  // RELOAD PlayList
  const reloadPlayListHandler = useCallback(async () => {
    try {
      const { data } = await playlistApi.getPlayList();
      dispatch(setPlayList(data));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  // EDIT Click
  const handleEditClick = async () => {
    try {
      const req = { musicList: list };
      await playlistApi.putPlayList(req);
      dispatch(
        setPlayList({ ...nowPlayList, musicList: list, listSize: list.length })
      );
      setIsEdit((prevIsEdit) => !prevIsEdit);
      setListSize(list.length);
    } catch (error) {
      console.log(error);
    }
  };

  // PLAY Music of Playlist
  const playMusicHandler = (index: number) => {
    try {
      console.log('nowIndex', index);
      console.log('nowPlayList', nowPlayList);
      dispatch(togglePlay());
      dispatch(PutStartingPointToZero(true));
      dispatch(
        setTrack({
          index,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  console.log(
    'nownownow',
    useSelector(
      (state: MusicControllerState) => state.playList.currentTrackIndex
    )
  );

  useEffect(() => {
    setList(Object.values(nowPlayList.musicList));
  }, [nowPlayList.musicList]);

  useEffect(() => {
    reloadPlayListHandler();
  }, [reloadPlayListHandler]);

  useEffect(() => {
    setListSize(nowPlayList.listSize);
  }, [nowPlayList.listSize]);

  return (
    <S.Playlist>
      <S.Top>
        <S.Bar />
        <BasicText text='PlayList' size='125%' font='NotoSansKR500' />
      </S.Top>
      <S.TextWrapper>
        <BasicText
          text={(listSize ? listSize : 0) + '곡'}
          //   (list.length === 0 && nowPlayList.listSize === 0
          //     ? listSize
          //     : list.length) + "곡"
          // }
          size='0.85rem'
        />
        <div />
        {isEdit ? (
          <CustomTextButton
            text='완료'
            handleOnClickButton={() => {
              handleEditClick();
            }}
            fontColor='#FFFFFF'
            isBackground={false}
            size='0.85rem'
          />
        ) : (
          <CustomTextButton
            text='편집'
            handleOnClickButton={() => {
              setIsEdit((prev) => !prev);
            }}
            fontColor='#FFFFFF'
            isBackground={false}
            size='0.85rem'
          />
        )}
      </S.TextWrapper>
      {isEdit ? (
        <DragAndDrop list={list} setList={setList} nowPlayList={nowPlayList} />
      ) : (
        <S.CardsWrapper>
          {shuffleArr &&
            shuffleArr.map((data, index) => (
              <S.OneMusicCard
                key={index}
                onClick={() => playMusicHandler(index)}>
                <MusicCard
                  data={{
                    code: musicList[`${data}`].code,
                    name: musicList[`${data}`].name,
                    albumImage: musicList[`${data}`].albumImage,
                    artistName: musicList[`${data}`].artistName,
                    playtime: musicList[`${data}`].playtime,
                  }}
                  isEditable={false}
                />
              </S.OneMusicCard>
            ))}
          {/* {nowPlayList.musicList.map(
            ({ code, name, albumImage, artistName, playtime }, index) => (
              <S.OneMusicCard
                key={index}
                onClick={() => playMusicHandler(index)}
              >
                <MusicCard
                  data={{
                    code,
                    name,
                    albumImage: CLOUD_FRONT + albumImage,
                    artistName,
                    playtime,
                  }}
                  isEditable={false}
                />
              </S.OneMusicCard>
            )
          )} */}
        </S.CardsWrapper>
      )}
    </S.Playlist>
  );
};

export default PlaylistDrawer;
