import styled from "styled-components";

export const ContainerWrap = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  display: grid;
  grid-template-rows: 4rem calc(var(--vh, 1vh) * 100 - 12.8rem) 4.3rem 4.5rem;
  ::-webkit-scrollbar {
    display: none;
  }
  overflow-y: hidden;
  overflow-x: hidden;
  touch-action: pan-x;
`;

export const ChildrenWrap = styled.div`
  height: calc(var(--vh, 1vh) * 100 - 12.8rem);
  padding: 0 1rem 0 1rem;
  ::-webkit-scrollbar {
    display: none;
  }
  overflow-y: auto;
`;
