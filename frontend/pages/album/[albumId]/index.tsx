import { useRouter } from "next/router";
import React, { useState, useEffect, useCallback } from "react";
import * as S from "./style";
import Layout from "@/components/common/Layout";
import BasicImage from "@/components/common/BasicImage";
import BasicText from "@/components/common/BasicText";
import CustomIconButton from "@/components/common/CustomIconButton";
import MusicCard from "@/components/Player/MusicCard";
import { BiLink } from "react-icons/bi";
import { BiDownload } from "react-icons/bi";
import { albumApi } from "@/api/utils/album";
import { playlistApi } from "@/api/utils/playlist";
import { CLOUD_FRONT } from "@/api/index";
import SmallModal from "@/components/common/CommonModal/SmallModal";
import CustomTextButton from "@/components/common/CustomTextButton";

interface Music {
  name: string;
  artistName: string;
  playtime: number;
  code: string;
  musicIndex: number;
  isTitle: boolean;
}

interface MemberInfo {
  nickname: string;
  profileImage: string;
  email: string;
}

interface Album {
  code: string;
  albumStatus: string;
  name: string;
  albumImage: string;
  releasedDate: string;
  musicList: Music[];
  memberInfo: MemberInfo;
}

interface PlayList {
  musicList: Music[];
  listSize: number;
}

const initialAlbumDetailData: Album = {
  code: "",
  albumStatus: "",
  name: "",
  albumImage: "",
  releasedDate: "",
  musicList: [
    {
      name: "",
      artistName: "",
      playtime: 0,
      code: "",
      musicIndex: 0,
      isTitle: false,
    },
  ],
  memberInfo: {
    nickname: "",
    profileImage: "",
    email: "",
  },
};

const AlbumDetail = () => {
  const router = useRouter();
  const { albumId } = router.query;

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 링크가 복사되었어요.");
    } catch (err) {
      console.log(err);
    }
  };

  // GET albumDetailData
  const [albumDetailData, setAlbumDetailData] = useState<Album>(
    initialAlbumDetailData
  );

  const albumDetailHandler = useCallback(async () => {
    try {
      const response = await albumApi.getAlbumInfo(albumId);
      setAlbumDetailData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [albumId]);

  useEffect(() => {
    albumDetailHandler();
  }, [albumId, albumDetailHandler]);

  // ADD albumToCollectAlbum
  const addOwnAlbumHandler = async () => {
    try {
      const response = await albumApi.addAlbumToCollectedAlbum(albumId);
      albumDetailHandler();
      setChangeNext(true);
      setTimeout(() => setIsModalOpen(false), 1000);
    } catch (error) {
      console.log(error);
    }
  };

  // const addOwnAlbumHandler = async () => {
  //   try {
  //     albumApi.addAlbumToCollectedAlbum(albumId)
  //     .then(() => {albumDetailHandler()})
  //     .then(() => {setChangeNext(true)});
  //     setTimeout(() => setIsModalOpen(false), 1000);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // ADD PlayList
  // 리덕스 반영한 수정필요. 추가 확인용 임시 코드.
  const [addMusic, setAddMusic] = useState("");
  const [tmpPlayList, setTmpPlayList] = useState<PlayList>(null);

  console.log("nowMusicCode", addMusic);
  const addPlayListHandler = async () => {
    try {
      await playlistApi.addMusicToPlayList(addMusic);
      const response = await playlistApi.getPlayList();
      setTmpPlayList(response.data);
      await console.log("playlist", tmpPlayList);
    } catch (error) {
      console.log(error);
    }
  };

  // isRealCollect Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // After AddAlbum
  const [changeNext, setChangeNext] = useState(false);

  return (
    <Layout>
      <S.AlbumDetail>
        <S.AlbumCover>
          <BasicImage src={CLOUD_FRONT + albumDetailData.albumImage} />
          {albumDetailData.albumStatus === "NOT_COLLECTED" && (
            <S.AlbumCoverDiv onClick={() => setIsModalOpen(true)}>
              <S.HaveBtn>
                <CustomIconButton>
                  <BiDownload size="3rem" />
                </CustomIconButton>
              </S.HaveBtn>
              <S.HaveDiv>
                <BasicText text="소장하기" size="2rem" color="black" />
              </S.HaveDiv>
            </S.AlbumCoverDiv>
          )}
          {isModalOpen && (
            <SmallModal
              handleSetShowModal={() => {
                setIsModalOpen(false);
              }}
            >
              <S.ModalContainer>
                {!changeNext ? (
                  <>
                    <S.ModalText>
                      <BasicText
                        text="소장하시겠습니까?"
                        size="1.5rem"
                        color="black"
                      />
                    </S.ModalText>
                    <S.ModalBtn>
                      <CustomTextButton
                        text="소장"
                        handleOnClickButton={() => {
                          addOwnAlbumHandler();
                          setChangeNext(true);
                        }}
                      />
                    </S.ModalBtn>
                  </>
                ) : (
                  <S.ModalLine>
                    <S.ModalIcon>
                      <BasicImage src="/icons/favicon-512x512.png" />
                    </S.ModalIcon>
                    <S.ModalText>
                      <BasicText text="소장완료" size="1.5rem" color="black" />
                    </S.ModalText>
                    <S.ModalIcon>
                      <BasicImage src="/icons/favicon-512x512.png" />
                    </S.ModalIcon>
                  </S.ModalLine>
                )}
              </S.ModalContainer>
            </SmallModal>
          )}
        </S.AlbumCover>
        <S.AlbumTitle>
          <S.AlbumTitleDiv>
            <BasicText
              text={albumDetailData.name}
              size="2rem"
              font="NotoSansKR700"
            />
          </S.AlbumTitleDiv>
          {albumDetailData.albumStatus === "RELEASED" && (
            <S.AlbumTitleLink
              onClick={
                () =>
                  handleCopyClipBoard(`https://localhost3000/album/${albumId}`)
                // handleCopyClipBoard(`https://lilac-music.net/album/${albumId}`)
              }
            >
              <CustomIconButton>
                <BiLink color="#e3dfff" size="2rem" />
              </CustomIconButton>
            </S.AlbumTitleLink>
          )}
        </S.AlbumTitle>
        <S.ContentTitleWrap>
          <BasicText text="음원목록" size="1.5rem" font="NotoSansKR700" />
        </S.ContentTitleWrap>
        <S.MusicList>
          {albumDetailData.musicList.map(
            ({ code, name, artistName, playtime, isTitle }) => (
              <S.OneMusicCard key={code}>
                <MusicCard
                  data={{
                    code: code,
                    name: name,
                    albumImage: CLOUD_FRONT + albumDetailData.albumImage,
                    artistName: artistName,
                    playtime: playtime,
                  }}
                  isEditable={false}
                  isTitle={isTitle}
                  onClickEvent={async () => {
                    if (
                      albumDetailData.albumStatus === "RELEASED" ||
                      albumDetailData.albumStatus === "COLLECTED"
                    ) {
                      setAddMusic(code);
                      await addPlayListHandler();
                    }
                  }}
                />
              </S.OneMusicCard>
            )
          )}
        </S.MusicList>
      </S.AlbumDetail>
    </Layout>
  );
};

export default AlbumDetail;
