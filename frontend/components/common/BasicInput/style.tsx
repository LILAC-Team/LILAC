import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  height: 2.75rem;
  padding-left: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  background-color: white;
  margin-bottom: 0.75rem;
  border: 1px solid transparent;
  &:focus {
    border-color: var(red);
  }
`;
