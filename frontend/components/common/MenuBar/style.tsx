import styled from "styled-components";

export const MenuWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: #676767;

  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);

  width: 100%;
  max-width: 900px;
  height: 4.5rem;
  align-items: center;
  justify-items: center;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;

  padding-bottom: 1rem;
`;

export const Comment = styled.div`
  width: 100%;
`;

export const PlayList = styled.div`
  width: 100%;
`;

export const ButtonWrapper = styled.div`
  /* aspect-ratio: 1 / 1; */
  display: flex;
  align-items: center;
  justify-content: center;
`;
