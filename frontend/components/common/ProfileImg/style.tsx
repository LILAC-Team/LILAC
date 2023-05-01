import styled from "styled-components";

interface ProfileProps {
  src?: string | ArrayBuffer;
  size: string;
  to?: string;
}

export const ProfileImage = styled.div<ProfileProps>`
  width: ${(props) => props.size};
  border-radius: 50%;
  border: 0.125rem solid var(--color-primary);
  aspect-ratio: 1 / 1;

  background-size: cover;
  background-image: ${(props) => `url(${props.src})`};
  background-position: center center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const EditIconWrapper = styled.div`
  display: flex;
  position: absolute;
  width: 2.5rem;
  height: 2.5rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  align-items: center;
  justify-content: center;
`;

export const EditIcon = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  display: none;
  border: 0;
`;
