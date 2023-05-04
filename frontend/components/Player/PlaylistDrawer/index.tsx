import * as S from "./style";
import { useState } from "react";
import BasicText from "@/components/common/BasicText";
import CustomTextButton from "@/components/common/CustomTextButton";
import DragAndDrop from "@/components/Container/DragAndDrop";
import MusicList from "../../../pages/musicList.json";
import MusicCard from "../MusicCard";

const PlaylistDrawer = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [list, setList] = useState(MusicList.musicList);

  const handleEditClick = () => {
    setIsEdit((props) => !props);
  };

  return (
    <S.Playlist>
      <S.Top>
        <S.Bar />
        <BasicText text="PlayList" size="125%" font="NotoSansKR500" />
      </S.Top>
      <S.TextWrapper>
        <BasicText text={list.length + "곡"} size="0.85rem" />
        <div />
        {isEdit ? (
          <CustomTextButton
            text="완료"
            handleOnClickButton={handleEditClick}
            fontColor="#FFFFFF"
            font="Ridibatang"
            isBackground={false}
            size="0.85rem"
          />
        ) : (
          <CustomTextButton
            text="편집"
            handleOnClickButton={handleEditClick}
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
          {list.map(({ code, name, albumImage, artistName, playtime }) => (
            <MusicCard
              key={code}
              data={{ code, name, albumImage, artistName, playtime }}
              isEditable={false}
            />
          ))}
        </S.CardsWrapper>
      )}
    </S.Playlist>
  );
};

export default PlaylistDrawer;
