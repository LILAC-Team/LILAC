import styled from "styled-components";

export const Player = styled.div`
  background-color: #191919;
  height: calc(var(--vh, 1vh) * 95);
  width: 100%;
  max-width: 900px;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  text-align: center;
`;

export const PlayerWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(var(--vh, 1vh) * 95 - 10rem);
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
  padding: 0.5rem;
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
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  padding: 0.5rem;
  bottom: calc((var(--vh, 1vh) * 27.5));
`;

export const CommentWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  &:active {
    padding-left: 0.125rem;
    padding-right: 0.125rem;
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.15);
  }
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
  bottom: calc((var(--vh, 1vh) * 10));
`;

export const PlayerBarWrap = styled.div`
  width: 100%;
  padding: 0.5rem 10% 0.5rem 10%;
  position: absolute;
  align-items: center;
  justify-content: center;
  bottom: calc((var(--vh, 1vh) * 20));
`;

export const PlayerBar = styled.input`
  width: 100%;
  height: 0.5rem;
  border-radius: 0;
  appearance: none;
  -webkit-appearance: none;
  background-color: transparent;
  cursor: pointer;

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 0.5rem;
    background: #808080;
    border-radius: 1rem;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0.5rem;
    height: 0.5rem;
    background: #d3d3d3;
    border-radius: 1rem;
    cursor: pointer;
  }
`;

export const PlayerBarTimeInfo = styled.div`
  display: flex;
  width: 100%;
  color: white;
  justify-content: space-between;
  padding: 0.25rem 0rem 0rem 0.25rem;
`;
