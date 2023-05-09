import { useEffect } from "react";
import { useSelector } from "react-redux";
import wrapper from "@/store/configStore";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import CircularJSON from "circular-json";

import * as S from "./style";
import BasicText from "@/components/common/BasicText";
import { setLogIn } from "@/store/modules/user";

interface OauthProps {
  query: object;
}

const Oauth = ({ query }) => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies();
  useEffect(() => {
    console.log("저를 복사해주세요: ", window.location.href);
    if (cookies.refreshToken) {
      router.push("/");
    } else {
      router.push("/signup");
    }
  }, []);

  return (
    <S.OauthContainer>
      <BasicText
        text='LILAC'
        size='2.3rem'
        background='linear-gradient(0deg, rgba(61,58,75,1) 0%, rgba(204,164,252,1) 65%, rgba(216,194,254,1) 100%)'
        color='transparent'
        clipText={true}
        font='HSBomBaram'
      />
    </S.OauthContainer>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req, res }) => {
      const { email, nickname, profileImage, accessToken, refreshToken } =
        query;
      if (accessToken) {
        res.setHeader("Set-Cookie", [
          "isLogIn=true",
          `accessToken=${accessToken}`,
          `refreshToken=${refreshToken}`,
        ]);
      } else {
        res.setHeader("Set-Cookie", "isLogIn=false");
      }
      store.dispatch(
        setLogIn({
          email: email,
          isLogIn: true,
          nickName:
            typeof nickname === "string" ? decodeURI(nickname) : nickname,
          profileImage: profileImage,
        })
      );
      return {
        props: {
          initialReduxState: store.getState(),
          query,
        },
      };
    }
);

export default Oauth;
