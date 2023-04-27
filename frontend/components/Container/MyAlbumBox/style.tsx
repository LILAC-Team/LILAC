import styled from "styled-components";

export const AlbumContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  @media (min-width: 43.75rem) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  justify-content: center;
  text-align: center;
`;
