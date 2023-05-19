import styled from "styled-components";

export const FormContainer = styled.div`
  width: 100%;
  height: calc(var(--vh, 1 * vh) * 100);
`;

export const ContentWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AlbumTitleWrap = styled.div`
  padding-top: 2rem;
  display: flex;
  width: 100%;
  max-width: 14.25rem;
`;

export const UploadButtonWrap = styled.div`
  display: flex;
  width: 100%;
  height: 3.5rem;
  align-items: center;
  justify-content: center;
  padding: 0rem 1.5rem 1rem 1.5rem;
`;

export const ContentTitleWrap = styled.div`
  display: flex;
  width: 100%;
  min-width: 15.5rem;
  padding: 1.5rem 1.5rem 1rem 1.5rem;
`;

export const AddMusicWrap = styled.div`
  width: 100%;
  padding: 0rem 1.5rem 1rem 1.5rem;
`;

export const ModalContainer = styled.div`
  display: grid;
  grid-template-rows: 0.5fr 0.5fr 0.5fr 0.5fr 0.5fr 0.75fr;
  padding: 0rem 2rem 0rem 2rem;
`;

export const CardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* height: calc(var(--vh, 1vh) * 80); */
  overflow-y: scroll;
  padding: 0rem 1.5rem 0rem 1.5rem;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const OneMusicCard = styled.div`
  width: 100%;
  padding: 0.5rem;
`;

export const TitleInput = styled.input`
  width: 2.5rem;
`;

export const TitleInputDiv = styled.div`
  width: 100%;
  display: flex;
  padding: 1rem 0rem 2rem 0rem;
`;

export const ModalAllContainer = styled.div`
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

export const ModalText = styled.div`
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

export const ModalSubject = styled.div`
  width: 100%;
`;

export const ModalInput = styled.div`
  /* width: 90%; */
  height: 50%;
`;
