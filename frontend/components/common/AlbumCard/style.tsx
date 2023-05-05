import styled, { css } from "styled-components";

interface AlbumCardProps {
  showAlbumDetail: boolean;
}

export const AlbumCard = styled.div<AlbumCardProps>`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 2fr 0.4fr;
  /* ${(props) =>
    props.showAlbumDetail
      ? css`
          grid-template-rows: 2fr 0.5fr 0.5fr;
        `
      : css`
          grid-template-rows: 2fr 1fr;
        `} */
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

export const AlbumCardDiv = styled.div`
  width: 100%;
  height: 100%;
`;
export const AlbumCardTitle = styled.div`
  margin: 1rem 0rem 0.75rem 0rem;
  display: flex;
  justify-content: center;
`;
export const AlbumCardDetail = styled.div`
  /* margin: 0.25rem; */
  display: flex;
  justify-content: center;
`;
