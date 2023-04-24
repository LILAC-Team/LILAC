import styled from "styled-components";

interface ImageProps {
  size: number;
  radius?: number;
}

export const BasicImage = styled.img<ImageProps>`
  width: ${(props) => props.size}rem;
  height: ${(props) => props.size}rem;
  border-radius: ${(props) => props.radius || "1"}rem;
  object-fit: cover;
`;
