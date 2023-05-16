import styled from "styled-components";

interface AlbumCardProps {
  showAlbumDetail: boolean;
}

export const AlbumCard = styled.div<AlbumCardProps>`
  width: 100%;
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
  display: flex;
  width: 100%;
  aspect-ratio: 1 / 1;
  align-items: center;
  justify-content: center;
`;

export const AlbumCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const AlbumCardTitle = styled.div`
  display: flex;
  margin: 0.5rem 0rem 0.75rem 0rem;
  justify-content: center;
`;

export const AlbumTitleText = styled.p`
  max-width: 15vw;
  word-wrap: break-word;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const AlbumCardDetail = styled.div`
  display: flex;
  justify-content: center;
`;
