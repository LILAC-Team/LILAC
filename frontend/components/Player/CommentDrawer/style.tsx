import styled from "styled-components";

export const Comment = styled.div`
  opacity: 95%;
  background-color: #4e4e4e;
  background-color: var(--color-background);
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
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  height: 5.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Bar = styled.div`
  background-color: #9c9c9c;
  width: calc((var(--vw, 1vw) * 10));
  border-radius: 5rem;
  height: 0.275rem;
  margin-bottom: 0.25rem;
`;

export const InputAllWrap = styled.div`
  width: 100%;
  height: 4.5rem;
`;
export const CommentAllWrap = styled.div`
  width: 100%;
  padding: 0 calc((var(--vw, 1vw) * 5)) 0 calc((var(--vw, 1vw) * 5));
  margin: 0.5rem 0 0.5rem 0;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ContentWrap = styled.div`
  width: 100%;
  height: calc((var(--vh, 1vh) * 95) - 10rem);
  padding-bottom: 1rem;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`;
