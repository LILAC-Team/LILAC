import styled, { css } from "styled-components";
import { keyframes } from "styled-components";

interface ImageProps {
  size?: string;
  radius?: number;
  isRotate?: boolean;
}

export const rotate = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;

export const BasicImage = styled.img<ImageProps>`
  width: ${(props) => props.size || "100%"};
  height: ${(props) => props.size || "100%"};
  border-radius: ${(props) => props.radius || "1"}rem;
  object-fit: cover;
  animation: ${rotate} 10s linear infinite;
  animation-play-state: ${(props) => (props.isRotate ? "running" : "paused")};
  animation-fill-mode: forwards;
`;
