import styled from "styled-components";

export const MenuWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: #676767;

  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);

  width: 100%;
  max-width: 900px;
  height: 4.5rem;
  align-items: center;
  justify-items: center;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;

  padding-bottom: 1rem;
`;