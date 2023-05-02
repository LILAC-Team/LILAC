import styled from "styled-components";

export const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

export const ModalContentWrap = styled.div`
  width: 100%;
  height: 100%;
  min-width: 280px;
  max-width: 900px;

  @media (min-width: 900px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

export const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
  min-height: 20rem;
  background-color: red;
  border-radius: 1.25rem;
  box-sizing: border-box;
  overflow: auto;
`;
