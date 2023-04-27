import styled from "styled-components";

export const TabWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  margin-top: 1.25rem;
  margin-bottom: 2.5rem;
`;

export const Tabs = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: center;
`;

interface TabItemProps {
  isCurrent: boolean;
}

export const TabItem = styled.li<TabItemProps>`
  position: relative;
  display: inline-block;
  padding-bottom: 0.625rem;
  margin: 0 1.25rem;
  border: none;
  cursor: pointer;
  border-bottom: ${(props) => (props.isCurrent ? "2px solid white" : "")};
`;
