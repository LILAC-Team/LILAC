import styled from "styled-components";

interface ButtonProps {
  color?: string;
  size?: string;
  border?: string;
  isDisabled?: boolean;
}

export const CustomIconButton = styled.button<ButtonProps>`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.size || "100%"};
  height: ${(props) => props.size || "100%"};
  border: ${(props) => props.border || "none"};
  border-radius: 100%;
  padding: 0rem;
  background-color: ${(props) => props.color};
  pointer-events: ${(props) => (props.isDisabled ? "none" : "auto")};
  cursor: ${(props) => (props.isDisabled ? "default" : "pointer")};
  &:active {
    border-radius: 100%;
    background: rgba(255, 255, 255, 0.15);
  }
`;
