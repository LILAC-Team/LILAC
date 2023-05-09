import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const AlbumDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;

  width: 48%;
  height: 13rem;
  background-color: #8e8ac2;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.25rem 0;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;

  width: 48%;
  height: 13rem;
`;

export const AddAlbum = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 47%;
  background-color: #856fa4;
  margin-bottom: 3%;
  border-radius: 10px;
`;

export const CatchPhrase = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 47%;
  background-color: #c28a97;
  margin-top: 3%;
  border-radius: 10px;
`;

export const ProfileWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  margin: 0.3rem;
`;

export const CdContainer = styled.div`
  width: 90%;
  height: 6rem;

  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-evenly;
  margin-top: 0.25rem;
`;

export const CdBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const CdWrapper = styled.div`
  height: 4rem;
  aspect-ratio: 1 / 1;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.25rem;
`;

export const InnerCd = styled.div`
  position: relative;
  left: 1.15rem;
  bottom: 3.05rem;

  border: 2px solid darkgray;
  background-color: gray;
  width: 1.65rem;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
`;

export const InnerText = styled.div`
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
