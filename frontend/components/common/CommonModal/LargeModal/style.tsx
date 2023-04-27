import styled from "styled-components";

export const Modal = styled.div`
  height: 100%;
  width: 100vw;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
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
  /* padding: 2rem 1.5rem; */
  /* margin: 0.75rem; */
  box-sizing: border-box;
  overflow-y: auto;
`;
