import styled from "styled-components";

interface CardProps {
  active: any;
}

export const Playlist = styled.div`
  background-color: #4e4e4e;
  height: calc(var(--vh, 1vh) * 95);
  width: calc(var(--vw, 1vw) * 100);
  max-width: 900px;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Top = styled.div`
  padding-top: calc((var(--vh, 1vh) * 1.5));
  padding-bottom: calc((var(--vh, 1vh) * 2));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Bar = styled.div`
  background-color: #9c9c9c;
  width: calc((var(--vw, 1vw) * 10));
  border-radius: 5rem;
  height: 0.25rem;
  margin: 0rem 0.5rem 1rem 0.5rem;
`;

export const TextWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  margin-bottom: 0.5rem;

  align-items: center;
  justify-items: center;
`;

export const DragAndDropWrap = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 80);
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const CardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(var(--vh, 1vh) * 80);
  overflow-y: scroll;
  padding: 0rem 1.5rem 0rem 1.5rem;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const OneMusicCard = styled.div<CardProps>`
  width: 100%;
  padding: 0.5rem;
  background-color: ${(props) => props.active && "#7a7981"};
  border-radius: ${(props) => props.active && "10px"};
`;
