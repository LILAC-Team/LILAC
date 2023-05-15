import styled from "styled-components";

export const SelectBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 1rem;
  width: 100%;
  height: 100%;
  border-radius: 1.25rem;
  background-color: var(--color-primary);
  color: var(--color-background);
  cursor: pointer;
`;

export const Label = styled.label`
  width: 5rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 15%;
  border: 2px solid var(--color-primary);
  position: absolute;
  top: 2rem;
  right: 2rem;
`;

export const Icon = styled.div`
  display: inline-flex;
  align-items: center;
  margin-left: 0.3rem;
`;

export const SelectOptions = styled.ul`
  max-height: 300px;
  min-width: 11.5rem;
  z-index: 1;
  overflow-y: auto;
  position: absolute;
  top: 2.875rem;
  right: 0rem;
  font-family: RobotoMedium;
  font-size: 1.25rem;
  border-radius: 1.25rem;
  background-color: var(--color-background);
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.25);
  padding: 0.75rem;
`;

export const Option = styled.li`
  display: flex;
  align-items: center;
  padding-left: 0.75rem;
  font-family: "RobotoRegular";
  font-size: 1rem;
  color: var(--color-text);
  cursor: pointer;
  border-radius: 0.75rem;
  width: 100%;
  height: 3.25rem;

  &:hover {
    background-color: var(--color-background-secondary);
    font-family: "RobotoMedium";
  }
`;
