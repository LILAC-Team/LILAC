import styled from "styled-components";

export const NavigationWrapper = styled.div`
  display: flex;
  background-color: black;
  width: 100%;
  max-width: 900px;
  height: 3.5rem;

  align-items: center;
  justify-content: space-around;

  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
`;

export const ButtonWrapper = styled.div`
  width: 3.5rem;
  margin: 0 0.125rem;
  aspect-ratio: 1 / 1;
`;
