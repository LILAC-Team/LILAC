import * as S from "./style";
import AlbumCard from "@/components/common/AlbumCard";
import { Fragment, useEffect, useState } from "react";
import MyAlbum from "@/pages/test.json";
import OwnAlbum from "@/pages/test2.json";
import Link from "next/link";
import { albumApi } from "@/api/utils/album";
import BasicText from "@/components/common/BasicText";

interface MyAlbumBoxProps {
  content: string;
}

const AlbumBox = ({ content }: MyAlbumBoxProps) => {
  const [myAlbum, setMyAlbum] = useState({ myList: [], myCount: 0 });
  const [ownAlbum, setOwnAlbum] = useState({ ownList: [], ownCount: 0 });

  const myAlbumList = async () => {
    try {
      const res = await albumApi.getReleasedAlbum(1);
      setMyAlbum({
        myList: res.data.releasedAlbumList,
        myCount: res.data.totalElements,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const ownAlbumList = async () => {
    try {
      const res = await albumApi.getCollectedAlbum(1);
      setOwnAlbum({
        ownList: res.data.collectedAlbumList,
        ownCount: res.data.totalElements,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    myAlbumList();
    ownAlbumList();
  }, []);

  return (
    <S.AlbumContainer>
      {content === "My" &&
        (myAlbum.myCount !== 0 ? (
          myAlbum.myList.map((data, index) => (
            <Link key={data.code} href={`/album/${data.code}`}>
              <S.OneAlbumCard>
                <AlbumCard
                  data={data}
                  showAlbumDetail={true}
                  albumSize="85%"
                  titleSize="125%"
                />
              </S.OneAlbumCard>
            </Link>
          ))
        ) : (
          <S.EmptyContainer>
            <BasicText text="나만의 앨범을 발매해보세요" size="120%" />
          </S.EmptyContainer>
        ))}
      {content === "Own" &&
        (ownAlbum.ownCount !== 0 ? (
          OwnAlbum.collectedAlbumList.map((data, index) => (
            <Link key={data.code} href={`/album/${data.code}`}>
              <S.OneAlbumCard>
                <AlbumCard
                  data={data}
                  showAlbumDetail={true}
                  albumSize="85%"
                  titleSize="125%"
                />
              </S.OneAlbumCard>
            </Link>
          ))
        ) : (
          <S.EmptyContainer>
            <BasicText text="친구의 앨범을 등록해보세요" size="120%" />
          </S.EmptyContainer>
        ))}
    </S.AlbumContainer>
  );
};

export default AlbumBox;
