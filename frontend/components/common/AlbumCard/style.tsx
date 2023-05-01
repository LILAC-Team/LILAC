import styled, { css } from "styled-components";

interface AlbumCardProps {
  showAlbumDetail: boolean;
}

export const AlbumCard = styled.div<AlbumCardProps>`
  width: 100%;
  display: grid;

  ${(props) =>
    props.showAlbumDetail
      ? css`
          grid-template-rows: 2fr 1fr 1fr;
        `
      : css`
          grid-template-rows: 2fr 1fr;
        `}
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
  cursor: pointer;
  &:active {
    color: white;
  }
`;

export const AlbumCardImg = styled.div``;
export const AlbumCardTitle = styled.div`
  margin: 0.5rem;
  display: flex;
  justify-content: center;
`;
export const AlbumCardDetail = styled.div``;
