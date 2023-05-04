import Link from "next/link";
import BasicText from "../BasicText";
import ProfileImg from "../ProfileImg";
import * as S from "./style";
import SelectBox from "../SelectBox";

interface HeaderProps {
  isShown?: boolean;
}

const list = ["수정", "로그아웃"];
const funcArr = [() => console.log("수정"), () => console.log("로그아웃")];

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
            // <SelectBox list={list} funcArr={funcArr}>
            //   <ProfileImg />
            // </SelectBox>
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
