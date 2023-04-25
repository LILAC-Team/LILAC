import styled from "styled-components";
// import defalutProfile from "../../../assets/img/common/defaultProfile.svg";
interface ProfileProps {
  src?: string;
  size: number;
  to?: string;
}

export const ProfileImage = styled.div<ProfileProps>`
  width: ${(props) => props.size}rem;
  height: ${(props) => props.size}rem;
  border-radius: 50%;
  border: 0.125rem solid #d7aedc;
  background-color: var(--color-primary);

  background-size: cover;
  background-image: url(${(props) => `${props.src}`});
  /* background-image: ${(props) => `url(${props.src})` || ""}; */
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
