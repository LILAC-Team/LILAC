import { useRouter } from "next/router";
import * as S from "./style";
import AlbumDetailData from "@/pages/AlbumDetail.json";
import User from "@/pages/user.json";
import Layout from "@/components/common/Layout";
import BasicImage from "@/components/common/BasicImage";
import BasicText from "@/components/common/BasicText";
import CustomIconButton from "@/components/common/CustomIconButton";
import MusicCard from "@/components/Player/MusicCard";
import { BiLink } from "react-icons/bi";
import { BiDownload } from "react-icons/bi";
import { Fragment } from "react";

const AlbumDetail = () => {
  const router = useRouter();
  const { albumId } = router.query;
  console.log(router);

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 링크가 복사되었어요.");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <S.AlbumDetail>
        <S.AlbumCover>
          <BasicImage src={AlbumDetailData.albumImage} />
          {AlbumDetailData.albumStatus === "NOT_COLLECTED" && (
            <S.AlbumCoverDiv>
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
        </S.AlbumCover>
        <S.AlbumTitle>
          <S.AlbumTitleDiv>
            <BasicText
              text={AlbumDetailData.name}
              size="2rem"
              font="NotoSansKR700"
            />
          </S.AlbumTitleDiv>
          {AlbumDetailData.albumStatus === "RELEASED" && (
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
          {AlbumDetailData.musicList.map(
            ({ code, name, artistName, playtime, isTitle }) => (
              <S.OneMusicCard key={code}>
                <MusicCard
                  data={{
                    code: code,
                    name: name,
                    albumImage: AlbumDetailData.albumImage,
                    artistName: artistName,
                    playtime: playtime,
                  }}
                  isEditable={false}
                  isTitle={isTitle}
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
