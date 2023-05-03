import styled from "styled-components";

export const CommentInput = styled.div`
  width: calc((var(--vw, 1vw) * 100));
  height: calc((var(--vh, 1vh) * 10));
  padding: calc((var(--vh, 1vh) * 2)) calc((var(--vw, 1vw) * 7.5))
    calc((var(--vh, 1vh) * 2)) calc((var(--vw, 1vw) * 7.5));
  display: flex;
  align-items: center;
`;

export const InputImg = styled.div`
  width: calc((var(--vh, 1vh) * 7.5));
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
  font-family: "RidiBatang";
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
  width: 3rem;
`;
