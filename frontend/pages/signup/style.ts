import styled, { css } from "styled-components";

export const SignUpContainer = styled.div`
  width: 100%;
  height: calc() (var() (--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
`;

export const LogoWrap = styled.div`
  width: 100%;
  height: 4rem;
`;

export const ImageWrap = styled.div`
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 12rem;
  max-width: 13rem;
  width: 100%;
`;

export const UserNameInputWrap = styled.div`
  width: 100%;
  margin: 2.5rem 0 0 0;
  min-width: 9rem;
  max-width: 9rem;
`;

interface SubmitButtonWrapState {
  disabled: boolean;
}

export const SubmitButtonWrap = styled.div<SubmitButtonWrapState>`
  width: 100%;
  height: 3.5rem;
  margin: 8rem 0 0 0;
  min-width: 15.5rem;
  max-width: 19rem;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: linear-gradient(180deg, #bc8ac2 0%, rgba(188, 138, 194, 0) 100%); */
  border: 0.125rem solid var(--color-primary);
  border-radius: 1rem;
  cursor: pointer;
  color: white;
  letter-spacing: 5px;
  font-family: "NotoSansKR700";
  font-weight: 700;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}
`;
