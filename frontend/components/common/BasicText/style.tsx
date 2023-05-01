import styled from "styled-components";

interface TextProps {
  color?: string;
  background?: string;
  clipText?: boolean;
  size?: string;
  font?: string;
}

export const Text = styled.div<TextProps>`
  color: ${(props) => props.color || "#ffffff"};
  font-size: ${(props) => props.size || "100%"};
  font-family: ${(props) => props.font};
  background: ${(props) => props.background || "transparent"};
  ${(props) => {
    if (props.clipText) {
      return `
        -webkit-background-clip: text;
      `;
    }
  }}
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
