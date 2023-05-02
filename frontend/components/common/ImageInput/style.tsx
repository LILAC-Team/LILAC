import styled from "styled-components";

export const ImageWrap = styled.div`
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
  background-color: #d9d9d9;
  border: 2px dashed black;
  position: relative;
  border-radius: 1rem;
  min-width: 13rem;
  max-width: 15rem;
`;
export const InputWrap = styled.input`
  display: none;
`;

export const IconWrap = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const textWrap = styled.div`
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -20%);
  width: 100%;
  text-align: center;
`;
