import Image from "next/image";
import React from "react";
import * as S from "./style";
import BasicText from "@/components/common/BasicText";
import Link from "next/link";
import CustomTextButton from "@/components/common/CustomTextButton";
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
      <S.ButtonWrap>
        <S.LogInButton href="https://lilac-music.net/api/oauth/kakao">
          <Image
            src="/logIn/kakao-login.png"
            alt="logIn"
            width={328}
            height={50}
          />
        </S.LogInButton>
        <S.DocsButton>
          <Link href={"/docs"}>
            <CustomTextButton
              text="LILAC 사용설명서"
              radius="0.5rem"
              font="NotoSansKR700"
            />
          </Link>
        </S.DocsButton>
      </S.ButtonWrap>
    </S.LogInContainer>
  );
};

export default LogIn;
