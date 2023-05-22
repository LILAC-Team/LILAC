import * as S from "./style";
import ProfileImg from "@/components/common/ProfileImg";
import BasicText from "@/components/common/BasicText";
import { RiAddLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import Link from "next/link";
import BasicImage from "@/components/common/BasicImage";
import CustomTextButton from "@/components/common/CustomTextButton";
import { useState } from "react";
import SmallModal from "@/components/common/CommonModal/SmallModal";
import { useRouter } from "next/router";
import BasicInput from "@/components/common/BasicInput";

interface userState {
  user: any;
}

interface MainAlbumProps {
  nickname: string;
  profileImage: string;
  myAlbum: string;
  ownAlbum: string;
}

const MainAlbum = ({
  nickname,
  profileImage,
  myAlbum,
  ownAlbum,
}: MainAlbumProps) => {
  const userInfo = useSelector((state: userState) => state.user);
  const router = useRouter();

  const [isModal, setIsModal] = useState(false);
  const [linkAddress, setLinkAddress] = useState("");

  const handleLinkChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkAddress(e.target.value);
  };

  const handleAddAlbum = () => {
    router.push(linkAddress);
    setIsModal(false);
  };

  return (
    <S.MainContainer>
      <S.AlbumDataWrapper>
        <S.ProfileWrapper>
          <ProfileImg isEditable={false} src={userInfo.profileImage} />
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
                isAlbumPage={true}
                src="/album.png"
                size="100%"
                radius={0}
                isRotate={true}
              />
              <S.InnerCd>
                <S.InnerText>
                  <BasicText text={myAlbum} size="80%" />
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
                isAlbumPage={true}
                src="/album.png"
                size="100%"
                radius={0}
                isRotate={true}
              />
              <S.InnerCd>
                <S.InnerText>
                  <BasicText text={ownAlbum} size="80%" />
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
              <RiAddLine size="1.5rem" color="#000000" />
              <BasicText text="앨범 발매" size="90%" color="#000000" />
            </S.TextWrapper>
          </Link>
        </S.AddAlbum>
        <S.CatchPhrase onClick={() => setIsModal(true)}>
          <Link href="">
            <S.TextWrapper>
              <RiAddLine size="1.5rem" color="#000000" />
              <BasicText text="공유 앨범 등록" size="90%" color="#000000" />
            </S.TextWrapper>
          </Link>
        </S.CatchPhrase>
      </S.ContentWrapper>
      {isModal && (
        <SmallModal handleSetShowModal={() => setIsModal(false)}>
          <S.ModalWrap>
            <BasicText text="등록하실 앨범의 링크를 입력해주세요" size="115%" />
          </S.ModalWrap>
          <BasicInput
            id="albumLink"
            type="text"
            value={linkAddress}
            handleOnChangeValue={handleLinkChange}
          />
          <S.ButtonWrap>
            <CustomTextButton
              text="이동"
              handleOnClickButton={handleAddAlbum}
              size="120%"
            />
          </S.ButtonWrap>
        </SmallModal>
      )}
    </S.MainContainer>
  );
};

export default MainAlbum;
