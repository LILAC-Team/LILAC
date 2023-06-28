import styled, { keyframes, css } from "styled-components";

export const spinEarth = keyframes`
  100% {
    transform: rotate(-360deg);
  }
`;

export const moveAstronaut = keyframes`
  100% {
    transform: translate(-160px, -160px);
  }
`;

export const moveLilac = keyframes`
  100% {
    transform: translate(-80px, 80px);
  }
`;

export const rotateAstronaut = keyframes`
  100% {
    transform: rotate(-720deg);
  }
`;
export const rotateLilac = keyframes`
  100% {
    transform: rotate(720deg);
  }
`;

export const ErrorPage = styled.div`
  width: calc(var(--vw, 1vw) * 100);
  height: calc(var(--vh, 1vh) * 100);
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.div`
  width: 100%;
  /* height: 100%; */
  position: absolute;
  top: calc(var(--vh, 1vh) * 20);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100%;
  /* height: 100%; */
  position: absolute;
  top: calc(var(--vh, 1vh) * 40);
  display: flex;
  z-index: 1999;
  align-items: center;
  justify-content: center;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 4rem;
  position: absolute;
  top: 0px;
  padding: 1rem 1rem;
  align-items: center;
  justify-content: space-between;
`;

export const LogoWrapper = styled.div`
  height: 3rem;
`;

export const Lilac = styled.img`
  animation: ${rotateLilac} 25s infinite linear both alternate;
`;

export const LilacBox = styled.div`
  z-index: 110;
  position: absolute;
  top: 60%;
  left: 30%;
  will-change: transform;
  animation: ${moveLilac} 10s infinite linear both alternate;
`;

export const Objects = styled.div`
  img {
    z-index: 90;
    pointer-events: none;
  }
`;

export const Earth = styled.img`
  position: absolute;
  bottom: 20%;
  right: 30%;
  z-index: 90;
  animation: ${spinEarth} 200s infinite;
`;

export const Moon = styled.img`
  position: absolute;
  bottom: 12%;
  right: 25%;
`;

export const Astronaut = styled.img`
  animation: ${rotateAstronaut} 200s infinite linear both alternate;
`;

export const AstronautBox = styled.div`
  z-index: 110;
  position: absolute;
  top: 70%;
  right: 20%;
  will-change: transform;
  animation: ${moveAstronaut} 50s infinite linear both alternate;
`;

export const glowStar = keyframes`
  40% {
    opacity: 0.3;
    transform: scale(1.2);
    border-radius: 999999px;
  }
  90%, 100% {
    opacity: 1;
    transform: scale(1.2);
    border-radius: 999999px;
  }
`;
export const Star = styled.div`
  width: 100%;
  height: 100%;
  opacity: 0.3;
  will-change: opacity;
`;

export const Star1 = styled.div`
  position: absolute;
  border-radius: 100%;
  background-color: #fff;
  width: 3px;
  height: 3px;
  top: 80%;
  left: 25%;
  animation: ${glowStar} 2s infinite ease-in-out alternate 1s;
`;

export const Star2 = styled.div`
  position: absolute;
  border-radius: 100%;
  background-color: #fff;
  width: 3px;
  height: 3px;
  top: 20%;
  left: 40%;
  animation: ${glowStar} 2s infinite ease-in-out alternate 1s;
`;

export const Star3 = styled.div`
  position: absolute;
  border-radius: 100%;
  background-color: #fff;
  width: 3px;
  height: 3px;
  top: 25%;
  left: 25%;
  animation: ${glowStar} 2s infinite ease-in-out alternate 1s;
`;

export const Star4 = styled.div`
  position: absolute;
  border-radius: 100%;
  background-color: #fff;
  width: 3px;
  height: 3px;
  top: 75%;
  left: 80%;
  animation: ${glowStar} 2s infinite ease-in-out alternate 1s;
`;

export const Star5 = styled.div`
  position: absolute;
  border-radius: 100%;
  background-color: #fff;
  width: 3px;
  height: 3px;
  top: 90%;
  left: 50%;
  animation: ${glowStar} 2s infinite ease-in-out alternate 1s;
`;
export const Star6 = styled.div`
  position: absolute;
  border-radius: 100%;
  background-color: #fff;
  width: 3px;
  height: 3px;
  top: 30%;
  left: 40%;
  animation: ${glowStar} 2s infinite ease-in-out alternate 1s;
`;
export const Star7 = styled.div`
  position: absolute;
  border-radius: 100%;
  background-color: #fff;
  width: 3px;
  height: 3px;
  top: 50%;
  left: 90%;
  animation: ${glowStar} 2s infinite ease-in-out alternate 1s;
`;
export const Star8 = styled.div`
  position: absolute;
  border-radius: 100%;
  background-color: #fff;
  width: 3px;
  height: 3px;
  top: 60%;
  left: 50%;
  animation: ${glowStar} 2s infinite ease-in-out alternate 1s;
`;
export const Star9 = styled.div`
  position: absolute;
  border-radius: 100%;
  background-color: #fff;
  width: 3px;
  height: 3px;
  top: 90%;
  left: 95%;
  animation: ${glowStar} 2s infinite ease-in-out alternate 1s;
`;
export const Star10 = styled.div`
  position: absolute;
  border-radius: 100%;
  background-color: #fff;
  width: 3px;
  height: 3px;
  top: 10%;
  left: 20%;
  animation: ${glowStar} 2s infinite ease-in-out alternate 1s;
`;
