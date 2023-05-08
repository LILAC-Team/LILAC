import { useEffect, useState } from "react";
import styled from "styled-components";
import BasicSlider from "@/components/Home/BasicSlider";
import CircularJSON from "circular-json";
import { useRouter } from "next/router";
import Layout from "@/components/common/Layout";
import MainAlbum from "@/components/Home/MainAlbum";
import BasicText from "@/components/common/BasicText";
import dummy1 from "../pages/test.json";
import dummy2 from "../pages/test2.json";

interface HomeProps {
  initValues?: boolean;
  initInput?: string;
  req?: any;
}

export interface AlbumDataProps {
  name: string;
  albumImage: string;
  code: string;
  releasedDate: string;
  nickname: string;
}

const Home = ({ initValues = false, initInput = "", req }: HomeProps) => {
  const [isModalOpen, setIsModalOpen] = useState(initValues);
  const [inputValue, setInputValue] = useState(initInput);
  const router = useRouter();

  const isLogIn = JSON.parse(req).cookies.isLogIn === undefined ? false : true;

  useEffect(() => {
    if (!isLogIn) {
      const timer = setTimeout(() => {
        // router.push("/login");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleOnChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // return isLogIn ? (
  //   <Layout>
  //     <button onClick={handleModal}>버튼</button>
  //     <BasicSlider />
  //     <DragAndDropWithClientOnly list={list} setList={setList} />
  //   </Layout>
  // ) : (
  //   <div>잠시 후 로그인 페이지로 이동합니다.</div>
  // );

  return (
    <Layout>
      <MainAlbum />
      <SliderWrapper>
        <BasicText text="나의 앨범" size="1.125rem" font="NotoSansKR700" />
        <BasicSlider data={dummy1.releasedAlbumList} />
      </SliderWrapper>
      <SliderWrapper>
        <BasicText
          text="내가 소장한 앨범"
          size="1.125rem"
          font="NotoSansKR700"
        />
        <BasicSlider data={dummy2.releasedAlbumList} />
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

export const SliderWrapper = styled.div`
  margin: 1.125rem 0;
`;

export default Home;
