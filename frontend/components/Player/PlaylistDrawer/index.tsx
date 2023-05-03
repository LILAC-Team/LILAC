import * as S from "./style";
import BasicText from "@/components/common/BasicText";
import CustomTextButton from "@/components/common/CustomTextButton";
import { useState } from "react";

const PlaylistDrawer = () => {
  const [isEdit, setIsEdit] = useState(false);
  const handleEditClick = () => {
    setIsEdit((props) => !props);
  };

  return (
    <S.Playlist>
      <S.Top>
        <BasicText text="PlayList" size="125%" font="NotoSansKR500" />
      </S.Top>
      <S.TextWrapper>
        <BasicText text="13곡" />
        {isEdit ? (
          <CustomTextButton
            text="완료"
            handleOnClickButton={handleEditClick}
            fontColor="#FFFFFF"
          />
        ) : (
          <CustomTextButton
            text="편집"
            handleOnClickButton={handleEditClick}
            fontColor="#FFFFFF"
          />
        )}
      </S.TextWrapper>
    </S.Playlist>
  );
};

export default PlaylistDrawer;
