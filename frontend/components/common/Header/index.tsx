import Link from "next/link";
import BasicText from "../BasicText";
import ProfileImg from "../ProfileImg";
import * as S from "./style";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SmallModal from "../CommonModal/SmallModal";
import BasicInput from "../BasicInput";
import CustomTextButton from "../CustomTextButton";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

interface ProfileState {
  previewImgUrl: any;
  file: any;
}

interface userState {
  user: any;
}

interface HeaderProps {
  isShown?: boolean;
}

const Header = ({ isShown = true }: HeaderProps) => {
  const userInfo = useSelector((state: userState) => state.user);
  const router = useRouter();

  const [cookies, setCookies, removeCookies] = useCookies([
    "isLogIn",
    "accessToken",
    "refreshToken",
  ]);
  const [profileImage, setProfileImage] = useState(userInfo.profileImage);
  const [isDropdown, setIsDropdown] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [isLogoutModal, setIsLogoutModal] = useState(false);
  const [nickName, setNickName] = useState(userInfo.nickName);
  const [profile, setProfile] = useState<ProfileState>({
    previewImgUrl: userInfo.profileImage,
    file: {},
  });

  const handleEdit = () => {
    console.log("정보수정");
    setIsDropdown(false);
    setIsEditModal(true);
  };

  const finishEdit = () => {
    console.log("편집 완료");
    setIsEditModal(false);
  };

  const handleLogout = () => {
    console.log("로그아웃");
    setIsDropdown(false);
    setIsLogoutModal(true);
  };

  const handleLogoutAPI = () => {
    console.log("Cookie, Storage 비우기");
    setIsLogoutModal(false);
    removeCookies("accessToken");
    removeCookies("refreshToken");
    removeCookies("isLogIn");
    router.push("/login");
  };

  const handleProfileClick = () => {
    setIsDropdown(true);
  };

  const handleProfileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { files },
    } = e;

    if (e.target.value === "") {
      setProfile({ previewImgUrl: "", file: {} });
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        setProfile({ previewImgUrl: reader.result, file: files[0] });
      };
    }
  };

  const handleNicknameChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNickName(e.target.value);
  };

  useEffect(() => {
    if (userInfo) {
      setProfile({ previewImgUrl: userInfo.profileImage, file: {} });
    }
  }, [userInfo]);

  return (
    <>
      <S.HeaderWrapper>
        <Link href={"/"}>
          <S.LogoWrapper>
            <BasicText
              text="LILAC"
              size="2.3rem"
              background="linear-gradient(0deg, rgba(61,58,75,1) 0%, rgba(204,164,252,1) 65%, rgba(216,194,254,1) 100%)"
              color="transparent"
              clipText={true}
              font="HSBomBaram"
            />
          </S.LogoWrapper>
        </Link>
        {isShown && (
          <>
            <S.ProfileWrapper onClick={handleProfileClick}>
              <ProfileImg size="4rem" src={profileImage} />
            </S.ProfileWrapper>
            {isDropdown && (
              <S.Wrapper>
                <S.LabelWrapper>
                  <S.Label onClick={handleEdit}>
                    <BasicText text="정보수정" color="black" />
                  </S.Label>
                  <S.Label onClick={handleLogout}>
                    <BasicText text="로그아웃" color="black" />
                  </S.Label>
                </S.LabelWrapper>
              </S.Wrapper>
            )}
          </>
        )}
      </S.HeaderWrapper>
      {isEditModal && (
        <SmallModal
          handleSetShowModal={() => {
            setIsEditModal(false);
          }}
        >
          <S.EditWrapper>
            <S.ImageWrapper>
              <ProfileImg
                src={userInfo.profileImage}
                onClickEvent={handleProfileChange}
                isEditable={true}
              />
            </S.ImageWrapper>
            <S.InputWrapper>
              <BasicInput
                id="nickname"
                type="text"
                value={nickName}
                handleOnChangeValue={handleNicknameChange}
              />
            </S.InputWrapper>
            <S.SubmitButtonWrap>
              <CustomTextButton text="수정" handleOnClickButton={finishEdit} />
            </S.SubmitButtonWrap>
          </S.EditWrapper>
        </SmallModal>
      )}
      {isLogoutModal && (
        <SmallModal
          handleSetShowModal={() => {
            setIsLogoutModal(false);
          }}
        >
          <S.EditWrapper>
            <BasicText text="로그아웃 하시겠습니까?" size="120%" />
            <S.LogoutWrapper>
              <S.SmallButtonWrap>
                <CustomTextButton
                  text="확인"
                  handleOnClickButton={handleLogoutAPI}
                />
              </S.SmallButtonWrap>
              <S.SmallButtonWrap>
                <CustomTextButton
                  text="취소"
                  handleOnClickButton={() => {
                    setIsLogoutModal(false);
                  }}
                />
              </S.SmallButtonWrap>
            </S.LogoutWrapper>
          </S.EditWrapper>
        </SmallModal>
      )}
    </>
  );
};

export default Header;
