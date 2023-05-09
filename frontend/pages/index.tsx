import { useEffect, useState } from "react";
import React from "react";
import styled from "styled-components";
import BasicSlider from "@/components/Home/BasicSlider";
import CircularJSON from "circular-json";
import { useRouter } from "next/router";
import Layout from "@/components/common/Layout";
import MainAlbum from "@/components/Home/MainAlbum";
import BasicText from "@/components/common/BasicText";
import dummy1 from "../pages/test.json";
import dummy2 from "../pages/test2.json";
import { memberApi } from "@/api/utils/member";
import { albumApi } from "@/api/utils/album";

interface HomeProps {
  initValues?: boolean;
  initInput?: string;
  req?: any;
}

const Home = ({ initValues = false, initInput = "", req }: HomeProps) => {
  const [nickname, setNickName] = useState("");
  const [profileImage, setProfileImage] = useState("/defaultProfile.svg");
  const [myList, setMyList] = useState([]);
  const [ownList, setOwnList] = useState([]);
  const [myListNum, setMyListNum] = useState(0);
  const [ownListNum, setOwnListNum] = useState(0);

  // const [isModalOpen, setIsModalOpen] = useState(initValues);
  // const [inputValue, setInputValue] = useState(initInput);
  // const router = useRouter();

  const isLogIn = JSON.parse(req).cookies.isLogIn === undefined ? false : true;

  const getUserInfo = async () => {
    try {
      const res = await memberApi.getUserInfo();
      setNickName(res.data.result.nickname);
      setProfileImage(res.data.result.profileImage);
    } catch (error) {
      console.log("error: ", error);
    }
  };

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
    getUserInfo();
    myAlbumList();
    ownAlbumList();
  }, []);

  // const handleModal = () => {
  //   setIsModalOpen((prev) => !prev);
  // };

  // const handleOnChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(e.target.value);
  // };

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
          // <BasicSlider data={dummy1.releasedAlbumList} />
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
          // <BasicSlider data={dummy2.collectedAlbumList} />
          <BasicSlider data={ownList} />
        )}
      </SliderWrapper>
    </Layout>
  );
};

export async function getServerSideProps({ req }) {
  const serializedReq = CircularJSON.stringify(req);
  return {
    props: {
      req: serializedReq,
    },
  };
}

const SliderWrapper = styled.div`
  margin: 1.125rem 0;
`;

const EmptyWrapper = styled.div`
  display: flex;
  height: 8rem;
  justify-content: center;
`;

export default Home;
