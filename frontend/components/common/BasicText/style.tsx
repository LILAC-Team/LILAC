import styled from "styled-components";

interface TextProps {
  color: string;
  size: number;
  font: string;
}

export const Text = styled.div<TextProps>`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size}rem;
  font-family: ${(props) => props.font};
  width: 100%;
  height: 100%;
  text-align: center;
`;
