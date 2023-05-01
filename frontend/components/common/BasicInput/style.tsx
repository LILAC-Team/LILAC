import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  color: white;
  height: 2.75rem;
  font-size: 2rem;
  border: none;
  background-color: transparent;
  margin-bottom: 0.75rem;
  padding-bottom: 0.875rem;
  text-align: center;
  border-bottom: 2px solid white;
  &:focus {
    border-bottom: 3px solid white;
    outline: none;
  }
`;
