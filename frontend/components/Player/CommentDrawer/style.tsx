import styled from "styled-components";

export const Comment = styled.div`
  background-color: #4e4e4e;
  height: 95vh;
  width: calc(var(--vw, 1vw) * 100);
  max-width: 900px;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Top = styled.div`
  padding-top: 1.5vh;
  padding-bottom: calc((var(--vh, 1vh) * 2));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Bar = styled.div`
  background-color: #9c9c9c;
  width: calc((var(--vw, 1vw) * 10));
  border-radius: 5rem;
  height: 0.25rem;
  margin: 0rem 0.5rem 1rem 0.5rem;
`;

export const InputAllWrap = styled.div`
  width: 100%;
`;
export const CommentAllWrap = styled.div`
  width: 100%;
  height: 72.5vh;
  padding: 0 calc((var(--vw, 1vw) * 5)) 0 calc((var(--vw, 1vw) * 5));
  margin: 1vh 0 2.5vh 0;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
