import styled from "styled-components";

interface WrapperProps {
  isDropdown: boolean;
}

export const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 4rem;
  padding: 1rem;
  align-items: center;
  justify-content: space-between;
`;

export const LogoWrapper = styled.div`
  display: flex;
  padding-top: 0.5rem;
  height: 4rem;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  width: 2.5rem;
  aspect-ratio: 1 /1;
`;

export const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.3rem 0.4rem;
  &:active {
    border-radius: 5px;
    background-color: #dccbfd;
  }
`;

export const Wrapper = styled.div<WrapperProps>`
  width: 6.75rem;
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 10%;
  border: 2px solid var(--color-primary);
  position: absolute;
  top: 3.75rem;
  right: 1rem;
  z-index: 2;
  animation: "openDropbox" 0.3s ease forwards;

  @keyframes openDropbox {
    0% {
      opacity: 0%;
      top: 2.75rem;
    }
    100% {
      top: 3.75rem;
    }
  }
`;

export const EditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LogoutWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-evenly;
  margin-top: 2rem;
`;

export const ImageWrapper = styled.div`
  width: 80%;
  aspect-ratio: 1 / 1;
`;

export const InputWrapper = styled.div`
  width: 80%;
  margin: 2.5rem 0 0 0;
`;

export const SubmitButtonWrap = styled.div`
  width: 100%;
  height: 3rem;
  margin: 2rem 0 0 0;
  min-width: 15.5rem;
  max-width: 19rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  cursor: pointer;
  color: white;
  font-family: "NotoSansKR700";
`;

export const SmallButtonWrap = styled.div`
  width: 30%;
  height: 2rem;
`;
