import styled from "styled-components";

interface ButtonProps {
  border?: string;
  isBackground?: boolean;
  isDisabled?: boolean;
  radius?: string;
}

export const CustomTextButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: ${(props) => props.border || "none"};
  border-radius: ${(props) => props.radius || "1rem"};
  background-color: ${(props) =>
    props.isBackground === false
      ? "transparent"
      : props.isDisabled === true
      ? "#a9a9be"
      : "#CCA4FC"};
  /* pointer-events: ${(props) => (props.isDisabled ? "none" : "auto")}; */
  /* cursor: ${(props) => (props.isDisabled ? "default" : "pointer")}; */
`;

export const TextDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const IconImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 0.3rem;
`;
