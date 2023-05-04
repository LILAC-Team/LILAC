import styled from "styled-components";

export const AlbumDetail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AlbumCover = styled.div`
  margin-top: 1rem;
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
  background-color: #d9d9d9;
  border: 2px solid #e3dfff;
  position: relative;
  border-radius: 1rem;
  min-width: 13rem;
  max-width: 15rem;
`;

export const AlbumCoverDiv = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  border-radius: 1rem;
  background-color: #ffffffb2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const HaveBtn = styled.div`
  width: 100%;
  /* height: 20%; */
  padding: 1rem;
`;

export const HaveDiv = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const AlbumTitle = styled.div`
  width: 100%;
  height: 100%;
  padding: 1.5rem 0 0.75rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AlbumTitleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AlbumTitleLink = styled.div`
  display: flex;
  justify-content: left;
  padding-left: 0.5rem;
`;
export const ContentTitleWrap = styled.div`
  display: flex;
  width: 100%;
  min-width: 15.5rem;
  max-width: 25rem;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const MusicList = styled.div`
  width: 100%;
  padding: 0rem 1rem 1rem 1rem;
`;