import styled from "styled-components";

interface CardProps {
  active: boolean;
}

export const Playlist = styled.div`
  opacity: 95%;
  background-color: #4e4e4e;
  background-color: var(--color-background);
  height: calc((var(--vh, 1vh) * 95));
  width: calc(var(--vw, 1vw) * 100);
  max-width: 900px;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Top = styled.div`
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  height: 5.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Bar = styled.div`
  background-color: #9c9c9c;
  width: calc((var(--vw, 1vw) * 10));
  border-radius: 5rem;
  height: 0.275rem;
  margin-bottom: 0.25rem;
`;

export const TextWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  padding-bottom: 0.5rem;
  height: 2.5rem;
  align-items: center;
  justify-items: center;
`;

export const ContentWrap = styled.div`
  width: 100%;
  height: calc((var(--vh, 1vh) * 95) - 8rem);
  display: flex;
  flex-direction: column;
  padding-bottom: 2rem;
  overflow-y: auto;
  padding: 0rem 1.5rem 0rem 1.5rem;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const OneMusicCard = styled.div<CardProps>`
  width: 100%;
  padding: 0.5rem;
  background-color: ${(props) => props.active && "#7a7a7a"};
  border-radius: ${(props) => props.active && "10px"};
`;
