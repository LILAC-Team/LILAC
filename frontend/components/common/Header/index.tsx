import ProfileImg from "../ProfileImg";
import * as S from "./style";

interface HeaderProps {
  onClickEvent: () => void;
}

const Header = ({ onClickEvent }: HeaderProps) => {
  const handleProfileClick = () => {
    console.log("Navigate to User Profile Page");
  };

  return (
    <S.LogoWrapper>
      <ProfileImg onClickEvent={handleProfileClick} />
    </S.LogoWrapper>
  );
};

export default Header;
