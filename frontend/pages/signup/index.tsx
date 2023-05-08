import { useState, useEffect } from "react";
import CircularJSON from "circular-json";
import * as S from "./style";
import BasicText from "@/components/common/BasicText";
import ProfileImg from "@/components/common/ProfileImg";
import BasicInput from "@/components/common/BasicInput";
import CustomTextButton from "@/components/common/CustomTextButton";
import { useSelector } from "react-redux";
import { memberApi } from "@/api/utils/member";
import { useCookies } from "react-cookie";

interface ProfileState {
  previewImgUrl: any;
  file: File | {};
}

const SignUp = () => {
  const [cookies, setCookies] = useCookies(["refreshToken", "accessToken"]);
  const [nickName, setNickName] = useState("");
  const [profile, setProfile] = useState<ProfileState>({
    previewImgUrl: "",
    file: {},
  });
  const userInfo = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      setProfile({ previewImgUrl: userInfo.profileImagePath, file: {} });
    }
    console.log("userInfo: ", userInfo);
  }, []);

  const handleNicknameChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNickName(e.target.value);
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

  const signUp = () => {
    memberApi
      .checkDuplicateNickName(nickName)
      .then((res) => {
        if (res.status === 200) {
          const formData = new FormData();
          // formData.append();
          // formData.append();
          return memberApi.signUp(formData);
        } else {
          console.log("첫번째 res: ", res);
          alert("닉네임 중복");
        }
      })
      .then((res) => {
        alert("회원가입 성공");
        setCookies("refreshToken", res.refreshToken, { path: "/" });
        setCookies("accessToken", res.accessToken, { path: "/" });
      })
      .catch((error) => {
        console.log("흠");
        console.log("error: ", error);
      });
  };

  return (
    <S.SignUpContainer>
      <S.LogoWrap>
        <BasicText
          text='LILAC'
          size='3rem'
          background='linear-gradient(180deg, #BC8AC2 0%, rgba(188, 138, 194, 0) 100%)'
          color='transparent'
          clipText={true}
        />
      </S.LogoWrap>
      <S.ImageWrap>
        <ProfileImg
          src={profile.previewImgUrl}
          onClickEvent={handleProfileChange}
          isEditable={true}
        />
      </S.ImageWrap>
      <S.UserNameInputWrap>
        <BasicInput
          id='nickname'
          type='text'
          value={nickName}
          handleOnChangeValue={handleNicknameChange}
        />
      </S.UserNameInputWrap>
      <S.SubmitButtonWrap onClick={signUp}>시작하기</S.SubmitButtonWrap>
    </S.SignUpContainer>
  );
};

export async function getServerSideProps({ req }) {
  const serializedReq = CircularJSON.stringify(req);
  return {
    props: {
      req: serializedReq,
    },
  };
}

export default SignUp;
