import styled, { css } from "styled-components";

interface ImageWrapProps {
  src?: string | ArrayBuffer;
}

export const ImageWrap = styled.div<ImageWrapProps>`
  margin-top: 1rem;
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
  background-color: #e6e6e6;
  /* border: 2px dashed black; */
  position: relative;
  border-radius: 1rem;
  min-width: 13rem;
  max-width: 15rem;
  background-image: ${(props) => `url(${props.src})`};

  ${(props) =>
    props.src !== undefined &&
    props.src !== "" &&
    css`
      border: 3px solid white;
    `}

  background-size: cover;
  background-position: center center;
  cursor: pointer;
  label {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
export const InputWrap = styled.input`
  display: none;
`;

interface IconWrap {
  src?: string | ArrayBuffer;
}

export const IconWrap = styled.div`
  position: absolute;
  text-align: center;
  font-size: 50px;
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
