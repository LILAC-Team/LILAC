import { useEffect } from "react";
import { createPortal } from "react-dom";
import * as S from "./style";

interface LargeModalProps {
  handleSetShowModal: Function;
  children: React.ReactNode;
}

const LargeModal = ({ handleSetShowModal, children }: LargeModalProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = () => {
    document.body.style.overflow = " auto";
    handleSetShowModal();
  };

  return createPortal(
    <S.Modal>
      <S.ModalContent>{children}</S.ModalContent>
    </S.Modal>,
    document.body
  );
};

export default LargeModal;
