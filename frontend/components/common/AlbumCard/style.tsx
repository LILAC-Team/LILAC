import styled from "styled-components";

interface AlbumCardProps {
  showAlbumDetail: boolean;
}

export const AlbumCard = styled.div<AlbumCardProps>`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 0.4fr;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  &:active {
    color: white;
  }
`;

export const AlbumCardImg = styled.div`
  max-width: 7rem;
  max-height: 7rem;
  aspect-ratio: 1/1;
`;

export const AlbumCardDiv = styled.div`
  width: 100%;
  height: 100%;
`;
export const AlbumCardTitle = styled.div`
  margin: 0.5rem 0rem 0.75rem 0rem;
  display: flex;
  justify-content: center;
`;
export const AlbumCardDetail = styled.div`
  display: flex;
  justify-content: center;
`;
