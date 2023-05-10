import * as S from "./style";
import CircularJSON from "circular-json";
import React, { useState, useEffect } from "react";
import BasicText from "@/components/common/BasicText";
import ProfileImg from "@/components/common/ProfileImg";
import BasicInput from "@/components/common/BasicInput";
import CustomTextButton from "@/components/common/CustomTextButton";
import { useSelector, useDispatch } from "react-redux";
import { memberApi } from "@/api/utils/member";
import { useCookies } from "react-cookie";
import { setLogIn } from "@/store/modules/user";
import { useRouter } from "next/router";
import { playlistApi } from "@/api/utils/playlist";
import { setPlayList } from "@/store/modules/playList";
interface ProfileState {
  previewImgUrl: any;
  file: any;
}

interface AppState {
  user: any; // 사용자 상태에 대한 타입을 정의합니다.
  // ...
}

const SignUp = () => {
  const [cookies, setCookies] = useCookies(["refreshToken", "accessToken"]);
  const [nickName, setNickName] = useState("");
  const [profile, setProfile] = useState<ProfileState>({
    previewImgUrl: "",
    file: {},
  });
  const userInfo = useSelector((state: AppState) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo) {
      setProfile({ previewImgUrl: userInfo.profileImage, file: {} });
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

  const signUp = async () => {
    const formData = new FormData();
    const reader = new FileReader();
    const data = {
      email: userInfo.email,
      registrationId: "kakao",
      nickname: nickName,
    };

    if (profile.previewImgUrl === userInfo.profileImage) {
      data["profileImage"] = userInfo.profileImage;
    } else {
      await reader.readAsArrayBuffer(profile.file);
      const blob = new Blob([reader.result], {
        type: profile.file.type,
      });
      formData.append("profileImage", blob);
    }
    formData.append("memberInfo", JSON.stringify(data));
    console.log("data: ", data);
    memberApi
      .signUp(formData)
      .then((res) => {
        console.log("res: ", res);
        alert("회원가입 성공");
        const { email, nickname, profileImage, accessToken, refreshToken } =
          res.data;
        dispatch(
          setLogIn({
            isLogIn: true,
            email,
            nickName: nickname,
            profileImage: profileImage,
          })
        );
        setCookies("refreshToken", refreshToken, { path: "/" });
        setCookies("accessToken", accessToken, { path: "/" });
        return playlistApi.getPlayList();
      })
      .then(({ data }) => {
        try {
          dispatch(setPlayList(data));
        } catch (error) {
          console.log("error: ", error);
        }
        router.push("/");
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
          text="LILAC"
          size="3rem"
          background="linear-gradient(180deg, #BC8AC2 0%, rgba(188, 138, 194, 0) 100%)"
          color="transparent"
          clipText={true}
          font="HSBomBaram"
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
          id="nickname"
          type="text"
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
