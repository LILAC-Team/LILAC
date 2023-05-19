import styled from "styled-components";

interface InputProps {
  color: string;
}

export const Input = styled.input<InputProps>`
  width: 100%;
  color: ${(props) => props.color};
  height: 2.75rem;
  font-size: 1.75rem;
  border: none;
  background-color: transparent;
  margin-bottom: 0.75rem;
  padding-bottom: 0.875rem;
  text-align: center;
  border-bottom: ${(props) => `2px solid ${props.color}`};
  &:focus {
    border-bottom: ${(props) => `3px solid ${props.color}`};
    outline: none;
  }
`;
