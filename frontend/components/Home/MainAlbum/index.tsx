import * as S from "./style";
import ProfileImg from "@/components/common/ProfileImg";
import BasicText from "@/components/common/BasicText";
import { RiAddLine } from "react-icons/ri";
import Link from "next/link";

const MainAlbum = () => {
  return (
    <S.MainContainer>
      <S.AlbumDataWrapper>
        <S.ProfileWrapper>
          <ProfileImg isEditable={false} />
        </S.ProfileWrapper>
        <S.TextWrapper>
          <BasicText text="봄윤식스" color="#000000" font="NotoSansKR700" />
        </S.TextWrapper>
        <S.CdContainer>
          <S.CdWrapper>My</S.CdWrapper>
          <S.CdWrapper>Own</S.CdWrapper>
        </S.CdContainer>
      </S.AlbumDataWrapper>
      <S.ContentWrapper>
        <S.AddAlbum>
          <Link href={"/form"}>
            <S.TextWrapper>
              <RiAddLine size="1.25rem" color="#000000" />
              <BasicText text="앨범등록" size="80%" color="#000000" />
            </S.TextWrapper>
          </Link>
        </S.AddAlbum>
        <S.CatchPhrase>
          <S.TextWrapper>
            <BasicText text="LILAC에서" size="80%" color="#000000" />
            <BasicText text="나만의 앨범을" size="80%" color="#000000" />
            <BasicText text="만들어보세요" size="80%" color="#000000" />
          </S.TextWrapper>
        </S.CatchPhrase>
      </S.ContentWrapper>
    </S.MainContainer>
  );
};

export default MainAlbum;
