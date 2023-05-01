import { useState, useEffect } from "react";
import CircularJSON from "circular-json";
import * as S from "./style";
import BasicText from "@/components/common/BasicText";
import ProfileImg from "@/components/common/ProfileImg";
import BasicInput from "@/components/common/BasicInput";
import CustomTextButton from "@/components/common/CustomTextButton";

interface ProfileState {
  previewImgUrl: string | ArrayBuffer;
  file: File | {};
}

const SignUp = () => {
  const [nickName, setNickName] = useState("");
  const [profile, setProfile] = useState<ProfileState>({
    previewImgUrl: "",
    file: {},
  });

  const { previewImgUrl } = profile;

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

  return (
    <S.SignUpContainer>
      <S.LogoWrap>
        <BasicText
          text="LILAC"
          size="3rem"
          background="linear-gradient(180deg, #BC8AC2 0%, rgba(188, 138, 194, 0) 100%)"
          color="transparent"
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
          id="nickname"
          type="text"
          value={nickName}
          handleOnChangeValue={handleNicknameChange}
        />
      </S.UserNameInputWrap>
      <S.SubmitButtonWrap>시작하기</S.SubmitButtonWrap>
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
