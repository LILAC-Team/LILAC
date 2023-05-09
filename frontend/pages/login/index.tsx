import Image from "next/image";
import React from "react";
import * as S from "./style";
import BasicText from "@/components/common/BasicText";
const LogIn = () => {
  return (
    <S.LogInContainer>
      <S.LogoWrapper>
        <BasicText
          text="LILAC"
          size="4rem"
          background="linear-gradient(0deg, rgba(61,58,75,1) 0%, rgba(204,164,252,1) 65%, rgba(216,194,254,1) 100%)"
          color="transparent"
          clipText={true}
          font="HSBomBaram"
        />
      </S.LogoWrapper>

      <S.LogInButton href="https://lilac-music.net/api/oauth/kakao">
        {/* <S.LogInButton href="/"> */}
        <Image
          src="/logIn/kakao-login.png"
          alt="logIn"
          width={328}
          height={50}
        />
      </S.LogInButton>
    </S.LogInContainer>
  );
};

export default LogIn;
