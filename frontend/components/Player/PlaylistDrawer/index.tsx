import * as S from "./style";
import { useState, useEffect, useCallback } from "react";
import BasicText from "@/components/common/BasicText";
import CustomTextButton from "@/components/common/CustomTextButton";
import DragAndDrop from "@/components/Container/DragAndDrop";
import { useSelector, useDispatch } from "react-redux";
import MusicCard from "../MusicCard";
import { CLOUD_FRONT } from "@/api/index";
import { playlistApi } from "@/api/utils/playlist";
import { setPlayList } from "@/store/modules/playList";

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
  playList: PlayList;
}

const PlaylistDrawer = () => {
  // Edit 여부
  const [isEdit, setIsEdit] = useState(false);
  // OnClick 여부
  const [isOnClick, setIsOnClick] = useState(false);
  // GET PlayList from Redux
  const nowPlayList = useSelector((state: AppState) => state.playList);
  const dispatch = useDispatch();
  // UPDATE PlayList 담는 list
  const [list, setList] = useState(nowPlayList.musicList);

  // UPDATE PlayList with api
  const setNewPlayListHandler = async () => {
    try {
      const musicList = [...list];
      const req = {};
      req["musicList"] = musicList;
      await playlistApi.putPlayList(req);
    } catch (error) {
      console.log(error);
    }
  };

  // RELOAD PlayList
  const reloadPlayListHandler = useCallback(async () => {
    try {
      const response = await playlistApi.getPlayList();
      dispatch(setPlayList(response.data));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  // EDIT Click
  const handleEditClick = async () => {
    setIsEdit((props) => !props);
    await setNewPlayListHandler();
    setIsOnClick(!isOnClick);
    reloadPlayListHandler();
    setList(nowPlayList.musicList);
  };

  // BUTTON Click -> RELOAD PlayList
  useEffect(() => {
    reloadPlayListHandler();
  }, [isOnClick, reloadPlayListHandler]);

  return (
    <S.Playlist>
      <S.Top>
        <S.Bar />
        <BasicText text="PlayList" size="125%" font="NotoSansKR500" />
      </S.Top>
      <S.TextWrapper>
        <BasicText text={nowPlayList.listSize + "곡"} size="0.85rem" />
        <div />
        {isEdit ? (
          <CustomTextButton
            text="완료"
            handleOnClickButton={() => {
              handleEditClick();
            }}
            fontColor="#FFFFFF"
            font="Ridibatang"
            isBackground={false}
            size="0.85rem"
          />
        ) : (
          <CustomTextButton
            text="편집"
            handleOnClickButton={() => {
              handleEditClick();
            }}
            fontColor="#FFFFFF"
            font="Ridibatang"
            isBackground={false}
            size="0.85rem"
          />
        )}
      </S.TextWrapper>
      {isEdit ? (
        <DragAndDrop list={list} setList={setList} />
      ) : (
        <S.CardsWrapper>
          {nowPlayList.musicList.map(
            ({ code, name, albumImage, artistName, playtime }, index) => (
              <S.OneMusicCard key={index}>
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
          )}
        </S.CardsWrapper>
      )}
    </S.Playlist>
  );
};

export default PlaylistDrawer;
