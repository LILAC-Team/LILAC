import styled from "styled-components";

export const DocsContainer = styled.div`
  width: 100%;
  height: calc(var(--vh, 1 * vh) * 100 - 4rem);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AllWrapper = styled.div`
  width: 100%;
  height: calc(var(--vh, 1 * vh) * 25);
  background-color: #e3dfff;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin: 1rem;
  box-shadow: inset 8px 8px 8px 0px rgba(255, 255, 255, 0.5),
    28px 28px 80px 0px rgba(0, 0, 0, 0.1), 16px 16px 20px 0px rgba(0, 0, 0, 0.1);
`;

export const ImageWrapper = styled.div`
  width: 100%;
  max-width: 8rem;
`;
export const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 1rem;
`;
export const TopTextWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem 0.5rem 1rem;
  /* justify-content: center; */
`;
export const BottomTextWrapper = styled.div`
  width: 100%;
  padding: 0.5rem 1rem 0rem 1rem;
`;

export const SliderWrap = styled.div`
  width: 100%;
  max-width: 900px;
  height: 65vh;
  display: flex;
`;

export const SliderButton = styled.div`
  width: 5rem;
`;

export const OneSlide = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ImageWrap = styled.img`
  /* width: 100%; */
  height: 50vh;
  padding: 0rem 1rem 0rem 1rem;
`;

export const RightWrap = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 2rem;
  padding: 0.5rem;
`;

export const OneDiv = styled.div``;

export const AllWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 17rem;
`;

export const LeftWrap = styled.div`
  height: 100%;
  padding: 0.5rem;
  margin: 0.5rem;
  background-color: #3d3a4b;
  border-radius: 0.5rem;
`;

export const GoogleWrap = styled.img`
  width: 15rem;
  height: 5rem;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
`;

export const PlayWrap = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
`;
