import styled from "styled-components";

export const CommentCard = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  padding: calc((var(--vw, 1vw) * 2.5));
  align-items: center;
`;

export const CommentImg = styled.div`
  width: 3.75rem;
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
  width: 3rem;
  /* max-width: calc((var(--vw, 1vw) * 10)); */
`;

export const ModalContainer = styled.div`
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  z-index: 999999;
`;

export const ModalText = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  margin-bottom: 2rem;
`;

export const ModalBtn = styled.div`
  width: 50%;
  align-items: center;
  justify-content: center;
  display: flex;
  margin: 1rem;
  height: 2.25rem;
`;

export const ModalIcon = styled.div`
  width: 1rem;
  height: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 2rem;
`;
export const ModalLine = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
