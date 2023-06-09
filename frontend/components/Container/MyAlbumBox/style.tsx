import styled from "styled-components";

export const AlbumContainer = styled.div`
  width: 100%;
  padding-top: 0.5rem;
  height: calc(var(--vh, 1vh) * 100 - 16.3rem);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  @media (min-width: 43.75rem) {
    grid-template-columns: repeat(3, 1fr);
  }
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const EmptyContainer = styled.div`
  display: flex;
  width: 54rem;
  align-items: center;
  justify-content: center;
`;

export const OneAlbumCard = styled.div`
  width: 100%;
  padding: 1rem;
`;
