import styled from "styled-components";

export const Player = styled.div`
  background-color: #4e4e4e;
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
  height: calc((var(--vh, 1vh) * 95) - 10rem);
  padding-bottom: 1rem;
  overflow-y: scroll;
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
  height: 0.25rem;
  margin-bottom: 0.25rem;
`;

export const AlbumCover = styled.div`
  padding: 1.5rem calc((var(--vw, 1vw) * 2.5)) 1.5rem
    calc((var(--vw, 1vw) * 2.5));
`;

export const Title = styled.div`
  height: 3.5rem;
  padding: 0.25rem;
  justify-content: center;
  display: flex;
`;

export const Artist = styled.div`
  height: 2.5rem;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
`;

export const Comment = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
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
  align-items: center;
  justify-content: center;
  bottom: calc((var(--vh, 1vh) * 12.5));
`;

export const PlayerBarWrap = styled.div`
  width: 100%;
  height: 4rem;
  padding: 0.5rem 10% 0.25rem 10%;
  align-items: center;
  justify-content: center;
  bottom: calc((var(--vh, 1vh) * 22.5));
`;

interface PlayerBarProps {
  progress: number;
}

export const PlayerBar = styled.input<PlayerBarProps>`
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
5;
export const PlayerBarTimeInfo = styled.div`
  display: flex;
  width: 100%;
  color: white;
  padding: 0.25rem 0rem 0rem 0.25rem;
  justify-content: space-between;
`;

// export const MenuBarDiv = styled.div`
//   height: 4.5rem;
//   position: absolute;
//   display: flex;
//   bottom: 0;
// `;
