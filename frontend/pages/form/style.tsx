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
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ContentTitleWrap = styled.div`
  display: flex;
  width: 100%;
  min-width: 15.5rem;
  max-width: 25rem;
  padding-top: 20px;
  padding-bottom: 28px;
`;
