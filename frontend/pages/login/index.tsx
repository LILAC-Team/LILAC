import Image from "next/image";
import React from "react";
import * as S from "./style";
import BasicText from "@/components/common/BasicText";
import Link from "next/link";
import CustomTextButton from "@/components/common/CustomTextButton";
import { isMobile } from "react-device-detect";

const LogIn = () => {
  // TODO 로그인 되어있으면 홈으로 보낼것

  return (
    <S.LogInContainer>
      <S.LogoWrapper>
        <BasicText
          text="LILAC"
          size="4rem"
          background="linear-gradient(0deg, #b77bff 0%, rgba(204,164,252,1) 65%, rgba(216,194,254,1) 100%)"
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
        {!isMobile && (
          <S.DocsButton>
            <Link href={"/docs"}>
              <CustomTextButton
                text="앱으로 시작하기&nbsp;&nbsp;"
                fontColor="black"
                size="1rem"
                radius="0.5rem"
                font="NotoSansKR400"
                isImage={true}
                src="/icons/favicon-512x512.png"
              />
            </Link>
          </S.DocsButton>
        )}
      </S.ButtonWrap>
    </S.LogInContainer>
  );
};

export default LogIn;
