import styled from "styled-components";

export const Player = styled.div`
  background-color: #4e4e4e;
  height: calc(var(--vh, 1vh) * 95);
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Top = styled.div`
  padding-top: calc((var(--vh, 1vh) * 2));
  padding-bottom: calc((var(--vh, 1vh) * 2));
  display: flex;
  justify-content: center;
`;

export const AlbumCover = styled.div`
  padding: calc((var(--vh, 1vh) * 2.5)) calc((var(--vw, 1vw) * 5))
    calc((var(--vh, 1vh) * 2.5)) calc((var(--vw, 1vw) * 2.5));
`;

export const Title = styled.div`
  padding: 1rem;
  justify-content: center;
  display: flex;
`;

export const Artist = styled.div`
  padding: 0.5rem;
  display: flex;
  justify-content: center;
`;

export const Comment = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

export const CommentImg = styled.div`
  display: flex;
  padding: 0.25rem;
  align-items: center;
`;

export const CommentDiv = styled.div`
  display: flex;
  padding: 0.25rem;
  align-items: center;
`;

export const MusicBar = styled.div`
  display: flex;
  padding: 0.5rem;
  position: absolute;
  justify-content: center;
  width: 100%;
  bottom: calc((var(--vh, 1vh) * 22.5));
`;

export const ControllBar = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem;
  position: absolute;
  bottom: calc((var(--vh, 1vh) * 12.5));
`;
