import styled from "styled-components";

export const MainContainer = styled.div`
  border: 2px solid white;

  display: flex;
  width: 100%;
  max-width: 900px;
  justify-content: space-between;
`;

export const ContentWrapper = styled.div`
  border: 2px solid red;

  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;

  width: 48%;
  height: 15rem;
`;

export const AddAlbum = styled.div`
  border: 2px solid yellow;

  width: 100%;
  height: 47%;
  margin-bottom: 5%;
  border-radius: 10px;
`;

export const CatchPhrase = styled.div`
  border: 2px solid yellow;

  width: 100%;
  height: 47%;
  margin-top: 5%;
  border-radius: 10px;
`;

export const ProfileWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  margin: 0.5rem;
`;

export const TextWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 0.25rem 0;
  justify-content: center;
`;

export const CdContainer = styled.div`
  border: 2px solid green;

  width: 90%;
  height: 10rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const CdWrapper = styled.div`
  border: 2px solid blue;

  width: 45%;
  height: 5rem;

  display: flex;
  flex-direction: column;
`;
