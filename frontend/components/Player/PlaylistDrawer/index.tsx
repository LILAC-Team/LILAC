import * as S from "./style";
import { useState, useEffect } from "react";
import BasicText from "@/components/common/BasicText";
import CustomTextButton from "@/components/common/CustomTextButton";
import DragAndDrop from "@/components/Container/DragAndDrop";
import MusicList from "../../../pages/musicList.json";
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

const initialMusicListData: Music[] = [];

const PlaylistDrawer = () => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEditClick = () => {
    setIsEdit((props) => !props);
    setList(nowPlayList.musicList);
  };

  // GET PlayList from Redux
  const nowPlayList = useSelector((state: AppState) => state.playList);
  const [list, setList] = useState(nowPlayList.musicList);

  // SET NewPlayList
  const dispatch = useDispatch();

  const setNewPlayListHandler = async () => {
    try {
      const musicList = [...list];
      const req = {};
      req["musicList"] = musicList;
      console.log("list", list);
      console.log("this?", req);
      console.log("!!!!!!", musicList);
      setList(musicList);
      await playlistApi.putPlayList(req);
      // setList(list);
    } catch (error) {
      console.log(error);
    }
  };

  // RELOAD PlayList
  const reloadPlayListHandler = async () => {
    try {
      const response = await playlistApi.getPlayList();
      dispatch(setPlayList(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    reloadPlayListHandler();
  }, [isEdit, list]);

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
              setNewPlayListHandler();
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
              setList(list);
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
