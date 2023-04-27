import styled from "styled-components";

export const AlbumContainer = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100 - 14.5rem);
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  @media (min-width: 43.75rem) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  justify-content: center;
  text-align: center;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
