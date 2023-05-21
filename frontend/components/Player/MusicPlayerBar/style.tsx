import styled from "styled-components";

export const ReactPlayerWrap = styled.div`
  width: 0;
  height: 0;
`;

export const BarWrapper = styled.div`
  display: flex;
  background: linear-gradient(45deg, #bc92f4, #dccbfd);
  height: 4.3rem;
  width: 100%;
  max-width: 900px;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.75rem;

  position: absolute;
  left: 50%;
  bottom: 4.5rem;
  transform: translateX(-50%);
`;

export const LeftWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
`;

export const AlbumImg = styled.div`
  display: flex;
  width: 3rem;
  aspect-ratio: 1 / 1;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 0.75rem;
  margin-bottom: 0.5rem;
`;

export const Title = styled.div`
  height: 100%;
  justify-content: center;
  padding-bottom: calc((var(--vw, 1vw) * 0.5));
`;

export const Artist = styled.div`
  height: 100%;
  justify-content: center;
  padding-top: calc((var(--vw, 1vw) * 0.5));
`;

export const RightWrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
