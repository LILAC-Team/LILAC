import styled, { css } from "styled-components";
import { keyframes } from "styled-components";

interface ImageProps {
  size: string;
  radius?: number;
  isRotate?: boolean;
}

export const BasicImage = styled.img<ImageProps>`
  width: ${(props) => props.size || "100%"};
  height: ${(props) => props.size || "100%"};
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
