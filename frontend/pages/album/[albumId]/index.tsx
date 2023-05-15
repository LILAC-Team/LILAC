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
import { useSelector, useDispatch } from "react-redux";
import { setPlayList } from "@/store/modules/playList";

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

interface AppState {
  playList: PlayList;
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
  // SET Router
  const router = useRouter();
  const { albumId } = router.query;
  // GET albumDetailData
  const [albumDetailData, setAlbumDetailData] = useState<Album>(
    initialAlbumDetailData
  );
  // ADD PlayList
  const [addMusic, setAddMusic] = useState("");
  // isRealCollect Modal
  const [isCollectModalOpen, setIsCollectModalOpen] = useState(false);
  // CopyAddress Modal
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
  // After AddAlbum
  const [changeNext, setChangeNext] = useState(false);
  // OnClick 여부
  const [isOnClick, setIsOnClick] = useState(false);
  // GET PlayList from Redux
  const nowPlayList = useSelector((state: AppState) => state.playList);
  const dispatch = useDispatch();

  // COPY ClipBoard
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopyModalOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  // SET albumDetailData
  const albumDetailHandler = useCallback(async () => {
    try {
      const { data } = await albumApi.getAlbumInfo(albumId);
      setAlbumDetailData(data);
      console.log(data);
    } catch (error) {
      console.log("error: ", error);
    }
  }, [albumId]);

  // CHANGE albumId or albumDetailHandler -> SET albumDetailData
  useEffect(() => {
    albumDetailHandler();
  }, [albumId, albumDetailHandler]);

  // ADD albumToCollectAlbum
  const addOwnAlbumHandler = async () => {
    try {
      await albumApi.addAlbumToCollectedAlbum(albumId);
      albumDetailHandler();
      setChangeNext(true);
      setTimeout(() => setIsCollectModalOpen(false), 1000);
    } catch (error) {
      console.log(error);
    }
  };

  // Change MusicCode
  const changeHandler = (code) => {
    setAddMusic(code);
  };

  // ADD to PlayList
  const addPlayListHandler = useCallback(async () => {
    try {
      console.log(addMusic);
      const req = {};
      req["code"] = addMusic;
      await playlistApi.addMusicToPlayList(req);
      await playlistApi.getPlayList().then(({ data }) => {
        try {
          dispatch(setPlayList(data));
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [addMusic, dispatch]);

  // BUTTON Click -> ADD to PlayList
  useEffect(() => {
    if (addMusic !== "") {
      addPlayListHandler();
    }
  }, [isOnClick, addPlayListHandler, addMusic]);

  return (
    <Layout>
      <S.AlbumDetail>
        <S.AlbumCover>
          <BasicImage
            src={
              albumDetailData?.albumImage !== ""
                ? CLOUD_FRONT + albumDetailData?.albumImage
                : ""
            }
          />
          {albumDetailData.albumStatus === "NOT_COLLECTED" && (
            <S.AlbumCoverDiv onClick={() => setIsCollectModalOpen(true)}>
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
          {isCollectModalOpen && (
            <SmallModal
              handleSetShowModal={() => {
                setIsCollectModalOpen(false);
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
            <>
              <S.AlbumTitleLink
                onClick={() =>
                  handleCopyClipBoard(
                    `https://lilac-music.net/album/${albumId}`
                  )
                }
              >
                <CustomIconButton>
                  <BiLink color="#e3dfff" size="2rem" />
                </CustomIconButton>
              </S.AlbumTitleLink>
              {isCopyModalOpen && (
                <SmallModal
                  handleSetShowModal={() => {
                    setIsCopyModalOpen(false);
                  }}
                >
                  <S.ModalContainer>
                    <S.ModalLine>
                      <S.ModalText>
                        <BasicText
                          text="링크가 복사되었습니다"
                          size="1.5rem"
                          color="black"
                        />
                      </S.ModalText>
                    </S.ModalLine>
                    <S.ModalBtn>
                      <CustomTextButton
                        text="닫기"
                        handleOnClickButton={() => {
                          setIsCopyModalOpen(false);
                        }}
                        font="Ridibatang"
                      />
                    </S.ModalBtn>
                  </S.ModalContainer>
                </SmallModal>
              )}
            </>
          )}
        </S.AlbumTitle>
        <S.ContentTitleWrap>
          <BasicText text="음원목록" size="1.5rem" font="NotoSansKR700" />
        </S.ContentTitleWrap>
        <S.MusicList>
          {albumDetailData.musicList.map(
            ({ code, name, artistName, playtime, isTitle }, index) => (
              <S.OneMusicCard key={index}>
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
                  onClickEvent={() => {
                    if (
                      albumDetailData.albumStatus === "RELEASED" ||
                      albumDetailData.albumStatus === "COLLECTED"
                    ) {
                      changeHandler(code);
                      setIsOnClick(!isOnClick);
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

// export async function getServerSideProps({ req }) {
//   const serializedReq = CircularJSON.stringify(req);
//   return {
//     props: {
//       req: serializedReq,
//     },
//   };
// }
