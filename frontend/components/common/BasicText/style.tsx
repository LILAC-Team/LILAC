import styled from "styled-components";

interface TextProps {
  color?: string;
  background?: string;
  clip?: boolean;
  size?: string;
  font: string;
}

export const Text = styled.div<TextProps>`
  color: ${(props) => props.color || "#ffffff"};
  font-size: ${(props) => props.size || "100%"};
  font-family: ${(props) => props.font};
  background: ${(props) => props.background || "transparent"};
  ${(props) => {
    if (props.clip) {
      return `
        -webkit-background-clip: text;
      `;
    }
  }}
  width: 100%;
  height: 100%;
  text-align: center;
`;
