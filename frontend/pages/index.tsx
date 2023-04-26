import { Fragment, useState } from "react";
import SmallModal from "@/components/common/CommonModal/SmallModal";
import BasicInput from "@/components/common/BasicInput";
import BasicSlider from "@/components/Home/BasicSlider";
import { DragAndDrop } from "@/components/Container/DragAndDrop";

const Home = ({ initValues = false, initInput = "" }) => {
  const [isModalOpen, setIsModalOpen] = useState(initValues);
  const [inputValue, setInputValue] = useState(initInput);

  const handleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleOnChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return isModalOpen ? (
    <SmallModal handleSetShowModal={handleModal}>
      <div>이번 프로젝트 두렵다</div>
      <BasicInput
        id="input"
        type="text"
        value={inputValue}
        handleOnChangeValue={handleOnChangeValue}
        placeholder=""
        isReadOnly={false}
      />
    </SmallModal>
  ) : (
    <Fragment>
      <button onClick={handleModal}>버튼</button>
      <BasicSlider />
      <DragAndDrop />
    </Fragment>
  );
};

export default Home;
