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
  padding: calc((var(--vh, 1vh) * 2)) 0;
  display: flex;
  justify-content: center;
`;

export const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
