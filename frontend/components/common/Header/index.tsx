import { useState } from "react";
import BasicText from "../BasicText";
import ProfileImg from "../ProfileImg";
import * as S from "./style";

const Header = () => {
  const [isUser, setIsUser] = useState<boolean>(true);

  const handleProfileClick = () => {
    if (isUser) {
      console.log("Navigate to User Profile Page");
    } else {
      console.log("Navigate to Landing Page");
    }
  };
  const handleLogoClick = () => {
    console.log("Navigate to Main Page");
  };

  return (
    <S.HeaderWrapper>
      <S.LogoWrapper onClick={handleLogoClick}>
        <BasicText
          text="LILAC"
          size="5rem"
          font=""
          color="linear-gradient(0deg, rgba(216,194,254,1) 0%, rgba(204,164,252,1) 35%, rgba(61,58,75,1) 100%)"
        />
      </S.LogoWrapper>
      <ProfileImg size="10%" onClickEvent={handleProfileClick} />
      {/* <S.ProfileWrapper></S.ProfileWrapper> */}
    </S.HeaderWrapper>
  );
};

export default Header;
