import { useEffect } from "react";
import { useRouter } from "next/router";
import CircularJSON from "circular-json";

interface OauthProps {
  req: any;
}

const Oauth = ({ req }) => {
  useEffect(() => {
    // const value = JSON.parse(req);
    console.log("value: ", req);
  }, []);
  // const router = useRouter();
  // const [cookies, setCookie] = useCookies(["refreshToken"]);

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

  return <div>로그인 중입니다.</div>;
};

export async function getServerSideProps(context) {
  const url = context.query;
  // email=이메일
  // profileimg=카카오프사url
  // registrationId=kakao
  // nickname=닉네임
  return {
    props: {
      req: url,
    },
  };
}

export default Oauth;
