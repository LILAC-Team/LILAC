import { useEffect } from "react";
import * as S from "./style";
import { FiX } from "@react-icons/all-files/fi/FiX";
import { createPortal } from "react-dom";

const SmallModal = ({
  handleSetShowModal,
  children,
  width,
}: {
  handleSetShowModal: any;
  children: any;
  width: any;
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = () => {
    document.body.style.overflow = "auto";
    handleSetShowModal();
  };

  return createPortal(
    <S.Container>
      <S.BackgroundBlur />
      <S.ModalContainer onClick={closeModal}>
        <S.ModalWrapper>
          <S.Modal
            width={width}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <S.CloseContainer>
              <FiX
                size="26"
                color="white"
                onClick={closeModal}
                style={{ cursor: "pointer" }}
              />
            </S.CloseContainer>
            <S.Content>{children}</S.Content>
          </S.Modal>
        </S.ModalWrapper>
      </S.ModalContainer>
    </S.Container>,
    document.body
  );
};

export default SmallModal;
