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
  height: 11rem;
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
  height: 11rem;
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
  border: 2px solid green;

  width: 90%;
  height: 4.5rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const CdWrapper = styled.div`
  border: 2px solid blue;

  width: 45%;
  height: 4rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
