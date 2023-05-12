import Link from "next/link";
import BasicText from "../BasicText";
import ProfileImg from "../ProfileImg";
import * as S from "./style";
import SelectBox from "../SelectBox";
import { memberApi } from "@/api/utils/member";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";

interface userState {
  user: any;
}

interface HeaderProps {
  isShown?: boolean;
}

const list = ["수정", "로그아웃"];
const funcArr = [() => console.log("수정"), () => console.log("로그아웃")];

const Header = ({ isShown = true }: HeaderProps) => {
  const [profileImage, setProfileImage] = useState("/defaultProfile.svg");

  const userInfo = useSelector((state: userState) => state.user);

  const handleProfileClick = () => {
    console.log("Navigate to User Profile Page");
  };

  // const getProfileImage = async () => {
  //   try {
  //     // const res = await memberApi.getUserInfo();
  //     setProfileImage(userInfo.profileImage);
  //   } catch (error) {
  //     console.log("error: ", error);
  //   }
  // };

  useEffect(() => {
    if (userInfo) {
      setProfileImage(userInfo.profileImage);
    }
    // getProfileImage();
  }, [userInfo]);

  return (
    <div>
      <S.HeaderWrapper>
        <Link href={"/"}>
          <S.LogoWrapper>
            <BasicText
              text='LILAC'
              size='2.3rem'
              background='linear-gradient(0deg, rgba(61,58,75,1) 0%, rgba(204,164,252,1) 65%, rgba(216,194,254,1) 100%)'
              color='transparent'
              clipText={true}
              font='HSBomBaram'
            />
          </S.LogoWrapper>
        </Link>
        <S.ProfileWrapper>
          {isShown && (
            <SelectBox list={list} funcArr={funcArr}>
              <ProfileImg size='4rem' src={profileImage} />
            </SelectBox>
          )}
        </S.ProfileWrapper>
      </S.HeaderWrapper>
    </div>
  );
};

export default Header;
