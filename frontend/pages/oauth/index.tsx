import { useEffect } from "react";
import { useSelector } from "react-redux";
import wrapper from "@/store/configStore";
import { useRouter } from "next/router";
import CircularJSON from "circular-json";
import * as S from "./style";
import BasicText from "@/components/common/BasicText";
import { setLogIn } from "@/store/modules/user";
import { useCookies } from "react-cookie";

interface OauthProps {
  query: object;
}

const Oauth = ({ query }) => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies();
  useEffect(() => {
    console.log("query: ", query);
    console.log("cookies:", cookies);
    if (cookies.refreshToken) {
      router.push("/");
    } else {
      router.push("/signup");
    }
    // const value = JSON.parse(req);
    // console.log("typeof: ", typeof query);
    // const val = {
    //   nickname: query.nickname,
    //   profileImage: query.profileImage,
    //   registrationId: query.registrationId,
    // };
  }, []);
  // const router = useRouter();

  // useEffect(() => {
  //   const params = new URL(window.location.href).searchParams;
  //   const nickname = decodeURIComponent(params.get("nickname"));
  //   const email = params.get("email");
  //   const registrationId = params.get("registrationId");

  //   if (nickname === "null") {
  //     dispatch(setPendingLogin({ email, registrationId }));
  //     navigate("/signup");
  //   } else {
  //     dispatch(setLogin({ nickname, email, registrationId }));
  //     const accessToken = params.get("access");
  //     const refreshToken = params.get("refresh");
  //     sessionStorage.setItem("accessToken", accessToken);
  //     setCookie("refreshToken", refreshToken);
  //     navigate("/");
  //   }
  // }, []);

  return (
    <S.OauthContainer>
      <BasicText
        text='LILAC'
        size='2.3rem'
        background='linear-gradient(0deg, rgba(61,58,75,1) 0%, rgba(204,164,252,1) 65%, rgba(216,194,254,1) 100%)'
        color='transparent'
        clipText={true}
      />
    </S.OauthContainer>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req, res }) => {
      const {
        nickname,
        profileImage,
        registrationId,
        accessToken,
        refreshToken,
      } = query;
      if (accessToken) {
        res.setHeader("Set-Cookie", "isLogIn=true");
        res.setHeader("Set-Cookie", `accessToken=${accessToken}`);
        res.setHeader("Set-Cookie", `refreshToken=${refreshToken}`);
      } else {
        res.setHeader("Set-Cookie", "isLogIn=false");
      }
      store.dispatch(
        setLogIn({
          isLogIn: true,
          nickName: decodeURI(nickname),
          profileImagePath: profileImage,
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
