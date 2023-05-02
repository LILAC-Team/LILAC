import styled from "styled-components";

export const ContainerWrap = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 4rem calc(var(--vh, 1vh) * 100 - 13rem) 4.5rem 4.5rem;
  ::-webkit-scrollbar {
    display: none;
  }
  overflow-y: hidden;
`;

export const ChildrenWrap = styled.div`
  height: calc(var(--vh, 1vh) * 100 - 17rem);
  padding: 0 1rem 0 1rem;
  ::-webkit-scrollbar {
    display: none;
  }
  overflow-y: auto;
`;
