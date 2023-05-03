import styled from "styled-components";

export const Playlist = styled.div`
  background-color: #4e4e4e;
  height: calc(var(--vh, 1vh) * 95);
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
  border: 2px solid red;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonWrapper = styled.div`
  width: calc((var(--vw, 1vw) * 14));
`;

export const CardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(var(--vh, 1vh) * 80);
  overflow-y: scroll;
`;
