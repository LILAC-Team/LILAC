import styled from "styled-components";

export const Player = styled.div`
  background-color: #4e4e4e;
  height: calc(var(--vh, 1vh) * 95);
  /* display: flex; */
  /* flex-direction: column; */
  width: 100%;
  max-width: 900px;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  /* justify-content: center; */
  /* align-items: center; */
  text-align: center;
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
export const AlbumCover = styled.div`
  padding: calc((var(--vh, 1vh) * 2.5)) calc((var(--vw, 1vw) * 2.5))
    calc((var(--vh, 1vh) * 2.5)) calc((var(--vw, 1vw) * 2.5));
`;

export const Title = styled.div`
  padding: 0.25rem;
  justify-content: center;
  display: flex;
`;

export const Artist = styled.div`
  padding: 0.75rem;
  display: flex;
  justify-content: center;
`;

export const Comment = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  position: absolute;
  bottom: calc((var(--vh, 1vh) * 30));
`;

export const CommentWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CommentImg = styled.div`
  display: flex;
  padding: 0.25rem;
  align-items: center;
`;

export const CommentDiv = styled.div`
  display: flex;
  padding: 0.25rem 0.25rem 0.375rem 0.25rem;
  align-items: center;
`;

export const MusicBar = styled.div`
  display: flex;
  padding: 0.5rem;
  position: absolute;
  justify-content: center;
  width: 100%;
  bottom: calc((var(--vh, 1vh) * 25));
`;

export const ControllBar = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem;
  position: absolute;
  align-items: center;
  justify-content: center;
  bottom: calc((var(--vh, 1vh) * 12.5));
`;
