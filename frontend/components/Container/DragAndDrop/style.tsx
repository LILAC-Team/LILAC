import styled from "styled-components";

interface CardProps {
  active: boolean;
}

export const DragDropWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(var(--vh, 1vh) * 80);
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const OneMusicCard = styled.div<CardProps>`
  padding: 0.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.active && "#7a7981"};
  border-radius: ${(props) => props.active && "10px"};
`;

export const DeleteBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

export const MusicCardContent = styled.div`
  width: 100%;
`;
