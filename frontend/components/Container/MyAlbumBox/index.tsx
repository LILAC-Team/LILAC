import * as S from "./style";
import AlbumCard from "@/components/common/AlbumCard";
import { useEffect, useState } from "react";
import Link from "next/link";
import { albumApi } from "@/api/utils/album";
import BasicText from "@/components/common/BasicText";

interface MyAlbumBoxProps {
  content: string;
}

const AlbumBox = ({ content }: MyAlbumBoxProps) => {
  const [myAlbum, setMyAlbum] = useState({ myList: [], myCount: 0, myPage: 1 });
  // ======================================
  const [mlist, setmlist] = useState([]);
  const [mcount, setmcount] = useState(1);
  const [mpage, setmpage] = useState(1);
  const [last, setlast] = useState(false);
  // ======================================

  const [ownAlbum, setOwnAlbum] = useState({
    ownList: [],
    ownCount: 0,
    ownPage: 1,
  });

  const myAlbumList = async () => {
    try {
      const res = await albumApi.getReleasedAlbum(1);
      // const res = await albumApi.getReleasedAlbum(mpage);
      console.log("내 앨범 목록: ", res.data);

      setMyAlbum({
        myList: res.data.releasedAlbumList,
        myCount: res.data.totalElements,
        myPage: res.data.number,
      });

      // ==================================
      setmlist((prev) => prev.concat(res.data.releasedAlbumList)); // 목록 갱신
      setmcount(res.data.totalElements);
      setmpage((prev) => prev + 1);
      setlast(res.data.last);
      // ==================================
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
        ownPage: res.data.number,
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
          ownAlbum.ownList.map((data, index) => (
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
