import { Fragment, useEffect, useState } from "react";
import SmallModal from "@/components/common/CommonModal/SmallModal";
import BasicInput from "@/components/common/BasicInput";
import BasicSlider from "@/components/Home/BasicSlider";
import DragAndDropWithClientOnly from "@/components/Container/DragAndDrop";
import LargeModal from "@/components/common/CommonModal/LargeModal";
import CircularJSON from "circular-json";

interface HomeProps {
  initValues?: boolean;
  initInput?: string;
  req?: any;
}

const Home = ({ initValues = false, initInput = "", req }: HomeProps) => {
  const [isModalOpen, setIsModalOpen] = useState(initValues);
  const [inputValue, setInputValue] = useState(initInput);
  const [isLoggIn, setLoggIn] = useState(false);
  useEffect(() => {
    if (req) {
      const { cookies } = req;
      console.log(
        "과연: ",
        cookies !== undefined && cookies.isLoggIn !== undefined ? true : false
      );
      setLoggIn(
        cookies !== undefined && cookies.isLoggIn !== undefined ? true : false
      );

      console.log("req: ", JSON.parse(req));
    }
  }, [req]);
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

  return isLoggIn ? (
    isModalOpen ? (
      <LargeModal handleSetShowModal={handleModal}>
        <div>이번 프로젝트 두렵다</div>
        <BasicInput
          id="input"
          type="text"
          value={inputValue}
          handleOnChangeValue={handleOnChangeValue}
          placeholder=""
          isReadOnly={false}
        />
      </LargeModal>
    ) : (
      <Fragment>
        <button onClick={handleModal}>버튼</button>
        <BasicSlider />
        <DragAndDropWithClientOnly list={list} setList={setList} />
      </Fragment>
    )
  ) : (
    <div>로그인해라</div>
  );
};

export async function getServerSideProps({ req, res }) {
  const serializedReq = CircularJSON.stringify(req);
  return {
    props: {
      req: serializedReq,
    },
  };
}

export default Home;
