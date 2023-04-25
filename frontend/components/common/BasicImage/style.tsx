import styled, { css } from "styled-components";
import { keyframes } from "styled-components";

interface ImageProps {
  size: number;
  radius?: number;
  isRotate?: boolean;
}

export const BasicImage = styled.img<ImageProps>`
  width: ${(props) => props.size}rem;
  height: ${(props) => props.size}rem;
  border-radius: ${(props) => props.radius || "1"}rem;
  object-fit: cover;
  ${(props) => {
    if (props.isRotate) {
      return css`
        animation: ${rotate} 6s linear infinite;
      `;
    }
  }}
`;

export const rotate = keyframes`
  100% {
      transform: rotate(360deg);
  }
`;
