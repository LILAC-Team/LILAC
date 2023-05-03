import styled from "styled-components";

export const CommentCard = styled.div`
  width: 100%;
  height: calc((var(--vh, 1vh) * 9));
  display: flex;
  padding: calc((var(--vw, 1vw) * 2.5));
  align-items: center;
`;

export const CommentImg = styled.div`
  width: calc((var(--vh, 1vh) * 7.5));
  margin-top: 0.125rem;
  margin-right: calc((var(--vw, 1vw) * 2.5));
`;

export const CommentDivWrap = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  padding-bottom: 0.25rem;
`;

export const CommentDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CommentInfoTop = styled.div`
  width: 100%;
  display: flex;
  /* margin-bottom: 0.5rem; */
`;

export const CommentNick = styled.div`
  margin-right: 1rem;
`;

export const CommentTime = styled.div``;

export const CommentInfoBottom = styled.div`
  width: 100%;
`;

export const CommentContent = styled.div`
  width: 100%;
`;

export const CommentDelete = styled.div`
  /* display: flex; */
  /* position: absolute; */
  /* right:  */
  width: 3rem;
  max-width: calc((var(--vw, 1vw) * 10));
`;
