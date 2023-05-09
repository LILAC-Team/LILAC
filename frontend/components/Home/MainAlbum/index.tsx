import * as S from "./style";
import ProfileImg from "@/components/common/ProfileImg";
import BasicText from "@/components/common/BasicText";
import { RiAddLine } from "react-icons/ri";
import Link from "next/link";
import BasicImage from "@/components/common/BasicImage";
import { useAppSelector } from "@/store/configStore.hooks";

const MainAlbum = () => {
  // const userInfo = useSelector((state: RootState) => {
  //   return state.user;
  // });

  const userInfo = useAppSelector((state) => state.user);

  console.log("사용자 데이터: ", userInfo);

  return (
    <S.MainContainer>
      <S.AlbumDataWrapper>
        <S.ProfileWrapper>
          <ProfileImg isEditable={false} />
        </S.ProfileWrapper>
        <S.TextWrapper>
          <BasicText
            text={userInfo.nickName}
            color="#000000"
            font="NotoSansKR700"
          />
        </S.TextWrapper>
        <S.CdContainer>
          <S.CdBox>
            <S.CdWrapper>
              <BasicImage
                src="/album.png"
                size="100%"
                radius={0}
                isRotate={true}
              />
              <S.InnerCd>
                <S.InnerText>
                  <BasicText text="2" size="80%" />
                </S.InnerText>
              </S.InnerCd>
            </S.CdWrapper>
            <S.InnerText>
              <BasicText text="My" color="black" />
            </S.InnerText>
          </S.CdBox>
          <S.CdBox>
            <S.CdWrapper>
              <BasicImage
                src="/album.png"
                size="100%"
                radius={0}
                isRotate={true}
              />
              <S.InnerCd>
                <S.InnerText>
                  <BasicText text="8" size="80%" />
                </S.InnerText>
              </S.InnerCd>
            </S.CdWrapper>
            <S.InnerText>
              <BasicText text="Own" color="black" />
            </S.InnerText>
          </S.CdBox>
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
