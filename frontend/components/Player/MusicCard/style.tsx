import styled from "styled-components";

export const MusicCard = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
`;

export const LeftWrapper = styled.div`
  display: flex;
  height: 4rem;
`;

export const CoverImg = styled.div`
  width: 4rem;
  height: 4rem;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 1rem;
  padding-bottom: 0.25rem;
  width: 80%;
`;

export const TopWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-bottom: 0.25rem;
`;

export const Title = styled.div`
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
  margin-left: 0.75rem;
  padding-top: 0.25rem;
  display: flex;
  align-items: center;
`;

export const Hamberger = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
