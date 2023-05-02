import Link from "next/link";
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

  return (
    <div>
      <S.HeaderWrapper>
        <Link href={"/"}>
          <S.LogoWrapper>
            <BasicText
              text="LILAC"
              size="2.3rem"
              background="linear-gradient(0deg, rgba(61,58,75,1) 0%, rgba(204,164,252,1) 65%, rgba(216,194,254,1) 100%)"
              color="transparent"
              clipText={true}
            />
          </S.LogoWrapper>
        </Link>
        <S.ProfileWrapper>
          {isShown && (
            <Link href={"/"}>
              <ProfileImg onClickEvent={handleProfileClick} />
            </Link>
          )}
        </S.ProfileWrapper>
      </S.HeaderWrapper>
    </div>
  );
};

export default Header;
