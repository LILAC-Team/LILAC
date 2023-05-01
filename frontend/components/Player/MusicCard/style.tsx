import styled from "styled-components";

export const MusicCard = styled.div`
  display: flex;
  width: 100%;
  max-height: 5rem;
  justify-content: center;
  justify-content: space-between;
  height: calc((var(--vw, 1vw) * 18));
  padding: calc((var(--vw, 1vw) * 2));
`;

export const LeftWrapper = styled.div`
  display: flex;
  width: 100%;
  height: calc(var(--vw, 1vw) * 14);
  max-height: calc(5rem - (var(--vw, 1vw) * 2));
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
  justify-content: center;
  margin-left: calc((var(--vw, 1vw) * 5));
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
  align-items: center;
  justify-content: center;
`;
