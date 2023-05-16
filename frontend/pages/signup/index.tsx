import * as S from "./style";
import React, { useState, useEffect } from "react";
import BasicText from "@/components/common/BasicText";
import ProfileImg from "@/components/common/ProfileImg";
import BasicInput from "@/components/common/BasicInput";
import { useSelector, useDispatch } from "react-redux";
import { memberApi } from "@/api/utils/member";
import { useCookies } from "react-cookie";
import { setLogIn } from "@/store/modules/user";
import { useRouter } from "next/router";
import { setPlayList } from "@/store/modules/playList";
import axios from "axios";
import { resize } from "@/api/func/resize";
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
  let userInfo = useSelector((state: AppState) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  console.log("userInfo!!!!: ", userInfo);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    if (userInfo) {
      setProfile({ previewImgUrl: userInfo.profileImage, file: {} });
    }
    console.log("userInfo: ", userInfo);
  }, [userInfo]);

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
    formData.append("memberInfo", JSON.stringify(data));

    const promise = new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const blob = new Blob([reader.result], { type: profile.file.type });
        formData.append("profileImage", blob);
        resolve();
      };
      reader.onerror = reject;
      profile;
      reader.readAsArrayBuffer(profile.file);
    });
    // 사진이 없을 수도 있으니까 수정필요!!!!
    /////////////////////////////////////
    ///////////////////////////////
    ////////////////
    promise
      .then(() => {
        return memberApi.signUp(formData);
      })
      .then((res) => {
        alert("회원가입 성공");
        const { email, nickname, profileImage, accessToken, refreshToken } =
          res.data.result;
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

        return axios.get("https://lilac-music.net/api/v1/playlists", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`,
          },
        });
      })
      .then((res) => {
        dispatch(setPlayList(res.data));
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
          text='LILAC'
          size='3rem'
          background='linear-gradient(180deg, #BC8AC2 0%, rgba(188, 138, 194, 0) 100%)'
          color='transparent'
          clipText={true}
          font='HSBomBaram'
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

export default SignUp;
