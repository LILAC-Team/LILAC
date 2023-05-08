import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import CircularJSON from "circular-json";

import * as S from "./style";
import BasicText from "@/components/common/BasicText";
interface OauthProps {
  query: object;
}

const Oauth = ({ query }) => {
  const router = useRouter();

  useEffect(() => {
    // const value = JSON.parse(req);
    console.log("typeof: ", typeof query);
    console.log("query: ", query);

    // accessToken이 존재 경우 로직
    if (query.accessToken) {
      // accessToken이 존재하지 않을 경우의 로직
    } else {
      router.push("/signup");
    }
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

  return (
    <S.OauthContainer>
      <BasicText
        text="LILAC"
        size="2.3rem"
        background="linear-gradient(0deg, rgba(61,58,75,1) 0%, rgba(204,164,252,1) 65%, rgba(216,194,254,1) 100%)"
        color="transparent"
        clipText={true}
      />
    </S.OauthContainer>
  );
};

export async function getServerSideProps(context) {
  const query = context.query;

  return {
    props: {
      query,
    },
  };
}

export default Oauth;
