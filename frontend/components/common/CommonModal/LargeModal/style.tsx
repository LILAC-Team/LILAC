import styled from "styled-components";

export const Modal = styled.div`
  height: 100%;
  width: 100%;
  z-index: 10;
  flex: 1;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(-color-background);
`;

export const ModalContent = styled.div`
  width: 100%;
  min-height: 20rem;
  background-color: transparent;
  border-radius: 1.25rem;
  box-sizing: border-box;
  overflow-y: auto;
`;
