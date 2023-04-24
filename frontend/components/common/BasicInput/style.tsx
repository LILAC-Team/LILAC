import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  height: 2.75rem;
  font-size: 20px;
  border: none;
  background-color: transparent;
  margin-bottom: 0.75rem;
  border-bottom: 2px solid black;
  &:focus {
    border-bottom: 3px solid black;
    outline: none;
  }
`;
