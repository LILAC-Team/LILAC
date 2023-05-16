import styled from "styled-components";

interface AlbumCardProps {
  showAlbumDetail: boolean;
}

export const AlbumCard = styled.div<AlbumCardProps>`
  border: 2px solid yellow;

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
  border: 2px solid black;

  display: flex;
  width: 80%;
  aspect-ratio: 1 / 1;
  align-items: center;
  justify-content: center;
`;

export const AlbumCardDiv = styled.div`
  border: 2px solid white;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-height: 4rem;
`;

export const AlbumCardTitle = styled.div`
  border: 2px solid green;

  display: flex;
  margin: 0.5rem 0rem 0.75rem 0rem;
  justify-content: center;
  width: 100%;
  max-width: 14.375rem;
`;

export const AlbumTitleText = styled.p`
  border: 2px solid red;

  width: 100%;
  max-width: 21.5vw;
  word-wrap: break-word;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #ffffff;
`;

export const AlbumCardDetail = styled.div`
  display: flex;
  justify-content: center;
`;
