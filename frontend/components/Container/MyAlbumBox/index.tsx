import * as S from "./style";
import AlbumCard from "@/components/common/AlbumCard";
import { Fragment, useState } from "react";
import MyAlbum from "@/pages/test.json";
import OwnAlbum from "@/pages/test2.json";
import Link from "next/link";

interface MyAlbumBoxProps {
  content: string;
}

const AlbumBox = ({ content }: MyAlbumBoxProps) => {
  return (
    <S.AlbumContainer>
      {content === "My" &&
        MyAlbum.releasedAlbumList.map((data, index) => (
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
        ))}
      {content === "Own" &&
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
        ))}
    </S.AlbumContainer>
  );
};

export default AlbumBox;
