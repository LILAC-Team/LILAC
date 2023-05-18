import styled from "styled-components";

export const Comment = styled.div`
  background-color: #4e4e4e;
  height: calc((var(--vh, 1vh) * 95));
  width: calc(var(--vw, 1vw) * 100);
  max-width: 900px;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
`;

export const Top = styled.div`
  padding-top: calc((var(--vh, 1vh) * 1.5));
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
  height: calc((var(--vh, 1vh) * 72.5));
  padding: 0 calc((var(--vw, 1vw) * 5)) 0 calc((var(--vw, 1vw) * 5));
  margin: calc((var(--vh, 1vh) * 1)) 0 calc((var(--vh, 1vh) * 2.5)) 0;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
