import styled from "styled-components";

export const BarWrapper = styled.div`
  display: flex;
  background-color: var(--color-primary);
  height: 3.5rem;
  width: 100%;
  max-width: 900px;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.25rem;
`;

export const LeftWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-height: 3.5rem;
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
  margin-left: calc((var(--vw, 1vw) * 5));
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
