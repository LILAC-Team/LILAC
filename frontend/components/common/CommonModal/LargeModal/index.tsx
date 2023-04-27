import { useEffect } from "react";
import { createPortal } from "react-dom";
import * as S from "./style";

interface LargeModalProps {
  handleSetShowModal: Function;
  children: React.ReactNode;
}

/**
 *
 * handleSetShowModal을 내려줄때,
 * 반드시,
 * document.body.style.overflow = " auto";
 * 코드 포함.
 */

const LargeModal = ({ handleSetShowModal, children }: LargeModalProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return createPortal(
    <S.Modal>
      <S.ModalContent>{children}</S.ModalContent>
    </S.Modal>,
    document.body
  );
};

export default LargeModal;
