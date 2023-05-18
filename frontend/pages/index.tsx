import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BasicSlider from "@/components/Home/BasicSlider";
import Layout from "@/components/common/Layout";
import MainAlbum from "@/components/Home/MainAlbum";
import BasicText from "@/components/common/BasicText";
import { albumApi } from "@/api/utils/album";

const Home = () => {
  const [nickname, setNickName] = useState("");
  const [profileImage, setProfileImage] = useState("/defaultProfile.svg");
  const [myList, setMyList] = useState([]);
  const [ownList, setOwnList] = useState([]);
  const [myListNum, setMyListNum] = useState(0);
  const [ownListNum, setOwnListNum] = useState(0);

  const myAlbumList = async () => {
    try {
      const res = await albumApi.getReleasedAlbum(1);
      setMyList(res.data.releasedAlbumList);
      setMyListNum(res.data.totalElements);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const ownAlbumList = async () => {
    try {
      const res = await albumApi.getCollectedAlbum(1);
      setOwnList(res.data.collectedAlbumList);
      setOwnListNum(res.data.totalElements);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    myAlbumList();
    ownAlbumList();
  }, []);

  return (
    <Layout>
      <MainAlbum
        nickname={nickname}
        profileImage={profileImage}
        myAlbum={myListNum.toString()}
        ownAlbum={ownListNum.toString()}
      />
      <SliderWrapper>
        <BasicText text="나의 앨범" size="1.125rem" font="NotoSansKR700" />
        {myListNum === 0 ? (
          <EmptyWrapper>
            <BasicText text="나만의 앨범을 발매해보세요" />
          </EmptyWrapper>
        ) : (
          <BasicSlider data={myList} />
        )}
      </SliderWrapper>
      <SliderWrapper>
        <BasicText
          text="내가 소장한 앨범"
          size="1.125rem"
          font="NotoSansKR700"
        />
        {ownListNum === 0 ? (
          <EmptyWrapper>
            <BasicText text="친구의 앨범을 등록해보세요" />
          </EmptyWrapper>
        ) : (
          <BasicSlider data={ownList} />
        )}
      </SliderWrapper>
    </Layout>
  );
};

const SliderWrapper = styled.div`
  margin: 1.125rem 0;
`;

const EmptyWrapper = styled.div`
  display: flex;
  height: 8rem;
  justify-content: center;
`;

export default Home;
