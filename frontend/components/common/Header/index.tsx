import { useState } from "react";
import BasicText from "../BasicText";
import ProfileImg from "../ProfileImg";
import * as S from "./style";

interface HeaderProps {
  isShown?: boolean;
}

const Header = ({ isShown = true }: HeaderProps) => {
  const handleProfileClick = () => {
    console.log("Navigate to User Profile Page");
  };
  const handleLogoClick = () => {
    console.log("Navigate to Main Page");
  };

  return (
    <S.HeaderWrapper>
      <S.LogoWrapper onClick={handleLogoClick}>
        <BasicText
          text="LILAC"
          font=""
          background="linear-gradient(0deg, rgba(61,58,75,1) 0%, rgba(204,164,252,1) 55%, rgba(216,194,254,1) 100%)"
          color="transparent"
          clip={true}
        />
      </S.LogoWrapper>
      <S.ProfileWrapper>
        {isShown && <ProfileImg onClickEvent={handleProfileClick} />}
      </S.ProfileWrapper>
    </S.HeaderWrapper>
  );
};

export default Header;
