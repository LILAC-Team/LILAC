// [삭제] 이 파일, 상위 폴더 모두 삭제

import React from "react";
import ProfileImg from "@/components/common/ProfileImg";
import * as S from "./style";

const ProfileTest = () => {
  return (
    <S.Container>
      <ProfileImg
        src="https://source.unsplash.com/user/c_v_r"
        size={15}
        isEditable={true}
      />
    </S.Container>
  );
};

export default ProfileTest;
