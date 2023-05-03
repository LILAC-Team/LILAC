import styled from "styled-components";

export const DragDropWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(var(--vh, 1vh) * 80);
  overflow-y: scroll;
`;
