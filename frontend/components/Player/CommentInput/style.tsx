import styled from "styled-components";

export const CommentInput = styled.div`
  width: 100%;
  height: 4.25rem;
  padding: 0.5rem calc((var(--vw, 1vw) * 7.5)) 0.5rem
    calc((var(--vw, 1vw) * 7.5));
  display: flex;
  align-items: center;
`;

export const InputImg = styled.div`
  width: 3.75rem;
  margin-left: calc((var(--vw, 1vw) * 0.5));
  margin-right: calc((var(--vw, 1vw) * 2.5));
`;

export const InputWrap = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  background-color: white;
  border-radius: 1rem;
  padding: 0 calc((var(--vw, 1vw) * 2.5)) 0 calc((var(--vw, 1vw) * 2.5));
`;

export const Input = styled.input`
  width: 100%;
  background-color: transparent;
  border: none;
  &:focus {
    outline: none;
  }
`;

export const InputTime = styled.div`
  width: 5rem;
  padding-bottom: 0.125rem;
  display: flex;
  justify-content: center;
`;

export const CommentBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
