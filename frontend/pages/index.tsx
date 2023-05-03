import { useEffect, useState } from "react";
import styled from "styled-components";
import BasicSlider from "@/components/Home/BasicSlider";
import DragAndDropWithClientOnly from "@/components/Container/DragAndDrop";
import CircularJSON from "circular-json";
import { useRouter } from "next/router";
import Layout from "@/components/common/Layout";
import MainAlbum from "@/components/Home/MainAlbum";
import BasicText from "@/components/common/BasicText";

interface HomeProps {
  initValues?: boolean;
  initInput?: string;
  req?: any;
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
  const [list, setList] = useState([
    { id: "1", content: "The Call Of Ktulu" },
    { id: "2", content: "For Whom The Bell Tolls" },
    { id: "3", content: "The Day That Never Comes" },
    { id: "4", content: "The Memory Remains" },
    { id: "5", content: "Confusion" },
    { id: "6", content: "Moth Into Flame" },
    { id: "7", content: "The Outlaw Torn" },
    { id: "8", content: "No Leaf Clover" },
    { id: "9", content: "Halo on Fire" },
  ]);

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
        <BasicText text="나의 앨범" size="1.125rem" />
        <BasicSlider />
      </SliderWrapper>
      <SliderWrapper>
        <BasicText text="내가 소장한 앨범" size="1.125rem" />
        <BasicSlider />
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
