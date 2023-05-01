import Image from "next/image";
import CircularJSON from "circular-json";
import * as S from "./style";
import BasicText from "@/components/common/BasicText";
const LogIn = () => {
  return (
    <S.LogInContainer>
      <S.LogoWrapper>
        <BasicText
          text="LILAC"
          size="4rem"
          background="linear-gradient(0deg, rgba(61,58,75,1) 0%, rgba(204,164,252,1) 65%, rgba(216,194,254,1) 100%)"
          color="transparent"
          clipText={true}
        />
      </S.LogoWrapper>

      {/* <S.LogInButton href="http://localhost:8080/oauth2/authorization/kakao"> */}
      <S.LogInButton href="/">
        <Image
          src="/logIn/kakao-login.png"
          alt="logIn"
          width={328}
          height={50}
        />
      </S.LogInButton>
    </S.LogInContainer>
  );
};

// export async function getServerSideProps({ req }) {
//   const serializedReq = CircularJSON.stringify(req);
//   return {
//     props: {
//       req: serializedReq,
//     },
//   };
// }

export default LogIn;
