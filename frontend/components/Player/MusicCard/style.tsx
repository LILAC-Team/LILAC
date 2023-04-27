import styled from "styled-components";

export const MusicCard = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: calc((var(--vw, 1vw) * 18));
  max-height: 5rem;
  padding: calc((var(--vw, 1vw) * 2));
  justify-content: center;
`;

export const LeftWrapper = styled.div`
  width: 100%;
  height: calc(var(--vw, 1vw) * 14);
  max-height: calc(5rem - (var(--vw, 1vw) * 2));
  display: flex;
`;

export const CoverImg = styled.div`
  width: calc(var(--vw, 1vw) * 14);
  height: calc(var(--vw, 1vw) * 14);
  max-width: calc(5rem - (var(--vw, 1vw) * 2));
  max-height: calc(5rem - (var(--vw, 1vw) * 2));
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: calc((var(--vw, 1vw) * 5));
  justify-content: center;
`;

export const Title = styled.div`
  height: 100%;
  justify-content: center;
  padding-bottom: calc((var(--vw, 1vw) * 0.5));
`;

export const Singer = styled.div`
  height: 100%;
  justify-content: center;
  padding-top: calc((var(--vw, 1vw) * 0.5));
`;

export const Hamberger = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
