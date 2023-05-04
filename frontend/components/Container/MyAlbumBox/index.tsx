import * as S from "./style";
import AlbumCard from "@/components/common/AlbumCard";
import { Fragment, useState } from "react";
import MyAlbum from "@/pages/MyAlbum.json";
import OwnAlbum from "@/pages/OwnAlbum.json";
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
            <AlbumCard data={data} showAlbumDetail={true} />
          </Link>
        ))}
      {content === "Own" &&
        OwnAlbum.collectedAlbumList.map((data, index) => (
          <Link key={data.code} href={`/album/${data.code}`}>
            <AlbumCard data={data} showAlbumDetail={true} />
          </Link>
        ))}
    </S.AlbumContainer>
  );
};

export default AlbumBox;
