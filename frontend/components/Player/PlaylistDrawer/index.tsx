import * as S from "./style";
import { useState, useEffect, useCallback } from "react";
import BasicText from "@/components/common/BasicText";
import CustomTextButton from "@/components/common/CustomTextButton";
import DragAndDrop from "@/components/Container/DragAndDrop";
import { useSelector, useDispatch } from "react-redux";
import MusicCard from "../MusicCard";
import { playlistApi } from "@/api/utils/playlist";
import { playListState } from "@/store/modules/playList";
import {
  setPlayList,
  updatePlayList,
  setTrack,
  togglePlay,
  PutStartingPointToZero,
} from "@/store/modules/playList";

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

const PlaylistDrawer = () => {
  const dispatch = useDispatch();
  const nowPlayList = useSelector((state: AppState) => state.playList);
  // Edit 여부
  const { playing, musicList, currentTrackIndex } = useSelector(
    // GET PlayList from Redux
    (state: AppState) => state.playList
  );
  const [isEdit, setIsEdit] = useState(false);

  // UPDATE PlayList 담는 list
  const [list, setList] = useState(Object.values(musicList));

  // UPDATE list Size
  const [listSize, setListSize] = useState(Object.keys(musicList).length);

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
        updatePlayList({
          musicList: [...list],
          listSize: list.length,
        })
      );
      setIsEdit((prevIsEdit) => !prevIsEdit);
      setListSize(list.length);
      if (!playing) {
        dispatch(togglePlay());
      }
    } catch (error) {
      console.log(error);
    }
  };

  // PLAY Music of Playlist
  const playMusicHandler = (index: number) => {
    try {
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

  useEffect(() => {
    setList(Object.values(musicList));
    setListSize(Object.keys(musicList).length);
  }, [musicList]);

  return (
    <S.Playlist>
      <S.Top>
        <S.Bar />
        <BasicText text='PlayList' size='125%' font='NotoSansKR500' />
      </S.Top>
      <S.TextWrapper>
        <BasicText text={(listSize ? listSize : 0) + "곡"} size='0.85rem' />
        <div />
        {isEdit ? (
          <CustomTextButton
            text='완료'
            handleOnClickButton={handleEditClick}
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
      <S.ContentWrap>
        {isEdit ? (
          <DragAndDrop
            list={list}
            setList={setList}
            nowPlayList={nowPlayList}
          />
        ) : (
          <>
            {musicList &&
              Object.keys(musicList).length > 0 &&
              Object.keys(musicList).map((data, index) => (
                <S.OneMusicCard
                  key={index}
                  onClick={() => playMusicHandler(index)}
                  active={index === currentTrackIndex}
                >
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
          </>
        )}
      </S.ContentWrap>
    </S.Playlist>
  );
};

export default PlaylistDrawer;
