import styled from "styled-components";

export const DragDropWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(var(--vh, 1vh) * 80);
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const OneMusicCard = styled.div`
  padding: 0.5rem 0.5rem 0.5rem 0rem;
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  overflow: hidden;
`;

export const DeleteBtn = styled.div`
  width: 2rem;
  height: 2rem;
  padding-left: 0.375rem;
`;

export const MusicCardContent = styled.div`
  width: 100%;
`;
