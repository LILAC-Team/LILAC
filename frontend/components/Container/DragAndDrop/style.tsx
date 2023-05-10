import styled from "styled-components";

export const DragDropWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0rem 1.5rem 0rem 1.5rem;
  height: calc(var(--vh, 1vh) * 80);
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const OneMusicCard = styled.div`
  width: 100%;
  padding: 0.5rem;
`;
