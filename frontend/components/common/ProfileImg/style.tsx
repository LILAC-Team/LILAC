import styled from "styled-components";

interface ProfileProps {
  src: string;
  size: number;
  to?: string;
}

export const ProfileImage = styled.div<ProfileProps>`
  width: ${(props) => props.size}rem;
  height: ${(props) => props.size}rem;
  border-radius: 50%;

  background-size: cover;
  background-image: url(${(props) => props.src});
  background-position: center center;

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .editable {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
`;

export const EditIconWrapper = styled.div`
  /* position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0; */
  /* position: relative; */
  /* z-index: 2; */
`;

export const EditIcon = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;
