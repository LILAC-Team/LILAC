import styled from "styled-components";

export const DragDropWrap = styled.div`
  width: 100%;
  /* list-style: none;
  margin: 0;
  padding: 0; */

  display: flex;
  flex-direction: column;
  height: calc(var(--vh, 1vh) * 80);
  overflow-y: scroll;
`;
