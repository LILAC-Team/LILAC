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

export const AlbumCover = styled.div`
  /* padding: 2rem; */
`;

export const Title = styled.div`
  padding: 1rem;
  justify-content: center;
  align-items: center;
`;

export const Artist = styled.div`
  padding: 0.5rem;
`;

export const MusicBar = styled.div`
  padding: 0.5rem;
`;

export const ControllBar = styled.div`
  width: 100%;
  padding: 0.5rem;
  position: absolute;
  bottom: 5rem;
`;
