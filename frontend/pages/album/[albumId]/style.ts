import styled from "styled-components";
import LILAC_Icon_src from "/LILAC_Icon.png";

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
  /* background-color: #d9d9d9; */
  /* border: 2px solid #e3dfff; */
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
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const MusicList = styled.div`
  width: 100%;
  padding: 0rem 1rem 1rem 1rem;
`;

export const OneMusicCard = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem 0rem 0.5rem 0rem;
`;

export const ModalContainer = styled.div`
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

export const ModalText = styled.div`
  /* width: 100%; */
  align-items: center;
  justify-content: center;
  display: flex;
  margin-bottom: 2rem;
`;

export const ModalBtn = styled.div`
  width: 50%;
  align-items: center;
  justify-content: center;
  display: flex;
  margin: 1rem;
  height: 2.25rem;
`;

export const ModalIcon = styled.div`
  width: 1rem;
  height: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 2rem;
`;
export const ModalLine = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
