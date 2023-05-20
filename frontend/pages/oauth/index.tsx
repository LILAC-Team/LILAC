import { useEffect } from "react";
import wrapper from "@/store/configStore";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { setPlayList } from "@/store/modules/playList";
import * as S from "./style";
import BasicText from "@/components/common/BasicText";
import { setLogIn } from "@/store/modules/user";
import { resize } from "@/api/func/resize";
import axios from "axios";
interface OauthProps {
  query: object;
  userData: object;
  playListData: object;
}
import { useDispatch } from "react-redux";

const Oauth = ({ query, userData, playListData }: OauthProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [cookies, setCookie] = useCookies();

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const { asPath } = router;
    console.log("asPath", asPath);
    console.log("저를 복사해주세요: ", window.location.href);
    console.log("typeof ", typeof playListData);
    dispatch(setPlayList(playListData));
    dispatch(setLogIn(userData));
    if (cookies.refreshToken) {
      router.replace("/");
    } else {
      router.push("/signup");
    }
  }, []);

  return (
    <S.OauthContainer>
      <BasicText
        text="LILAC"
        size="2.3rem"
        background="linear-gradient(0deg, rgba(61,58,75,1) 0%, rgba(204,164,252,1) 65%, rgba(216,194,254,1) 100%)"
        color="transparent"
        clipText={true}
        font="HSBomBaram"
      />
    </S.OauthContainer>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req, res }) => {
      const { email, nickname, profileImage, accessToken, refreshToken } =
        query;
      let playListData = { musicList: [], listSize: 0 };
      if (accessToken) {
        res.setHeader("Set-Cookie", [
          "isLogIn=true",
          `accessToken=${accessToken}`,
          `refreshToken=${refreshToken}`,
        ]);
        try {
          const response = await axios.get(
            "https://lilac-music.net/api/v1/playlists",
            {
              headers: {
                Authorization: `${accessToken}`,
              },
            }
          );
          console.info("------------data-------------- : ", response.data);
          playListData["musicList"] = response.data.musicList;
          playListData["listSize"] = response.data.listSize;
        } catch (error) {
          console.info("error: ", error);
        }
      } else {
        res.setHeader("Set-Cookie", "isLogIn=false");
      }
      const userData = {
        email: email,
        isLogIn: true,
        nickName: typeof nickname === "string" ? decodeURI(nickname) : nickname,
        profileImage: profileImage,
      };

      return {
        props: {
          initialReduxState: store.getState(),
          query,
          userData,
          playListData,
        },
      };
    }
);

export default Oauth;
