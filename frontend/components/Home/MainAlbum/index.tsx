import ProfileImg from "@/components/common/ProfileImg";
import * as S from "./style";
import BasicText from "@/components/common/BasicText";

const MainAlbum = () => {
  return (
    <S.MainContainer>
      <S.ContentWrapper>
        <S.ProfileWrapper>
          <ProfileImg isEditable={false} />
        </S.ProfileWrapper>
        <S.TextWrapper>
          <BasicText text="봄윤식스" />
        </S.TextWrapper>
        <S.CdContainer>
          <S.CdWrapper></S.CdWrapper>
          <S.CdWrapper></S.CdWrapper>
        </S.CdContainer>
      </S.ContentWrapper>
      <S.ContentWrapper>
        <S.AddAlbum></S.AddAlbum>
        <S.CatchPhrase></S.CatchPhrase>
      </S.ContentWrapper>
    </S.MainContainer>
  );
};

export default MainAlbum;
