import styled from "styled-components";

export const MusicCard = styled.div`
  display: flex;
  width: 100%;
  max-height: 5rem;
  justify-content: center;
  justify-content: space-between;
  height: calc((var(--vw, 1vw) * 20.5));
  padding: calc((var(--vh, 1vh) * 2)) 0 calc((var(--vh, 1vh) * 2)) 0;
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
  width: 80%;
`;

export const TopWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const Title = styled.div`
  /* width: 100%; */
  height: 100%;
  justify-content: center;
  padding-bottom: calc((var(--vw, 1vw) * 0.5));
`;

export const isTitle = styled.div`
  background-color: #e3dfff;
  box-shadow: 3px 3px 3px black;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.75rem;
  width: 2.5rem;
  border-radius: 1rem;
`;

export const BottomWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const Singer = styled.div`
  height: 100%;
  justify-content: center;
  padding-top: calc((var(--vw, 1vw) * 0.5));
`;

export const Time = styled.div`
  /* width: 100%; */
  margin-left: 0.75rem;
  padding-top: 0.35rem;
`;

export const Hamberger = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
