import BasicText from "@/components/common/BasicText";
import * as S from "./style";

const NotFound = () => {
  const data = {
    name: "hi",
  };

  return (
    <S.ErrorPage>
      <S.HeaderWrapper>
        <S.LogoWrapper>
          <BasicText
            text="LILAC"
            size="2.3rem"
            background="linear-gradient(0deg, rgba(61,58,75,1) 0%, rgba(204,164,252,1) 65%, rgba(216,194,254,1) 100%)"
            color="transparent"
            clipText={true}
            font="HSBomBaram"
          />
        </S.LogoWrapper>
      </S.HeaderWrapper>
      <S.Title>
        <BasicText
          text="404"
          size="9rem"
          background="linear-gradient(0deg, rgba(61,58,75,1) 0%, rgba(204,164,252,1) 65%, rgba(216,194,254,1) 100%)"
          color="transparent"
          clipText={true}
          font="HSBomBaram"
        />
      </S.Title>
      <S.Content>
        <BasicText
          text="Page Not Found"
          size="2.3rem"
          // background="#e3dfff"
          // color="transparent"
          clipText={true}
        />
      </S.Content>
      <S.Objects>
        {/* <S.Rocket
          src="http://salehriaz.com/404Page/img/rocket.svg"
          width="40px"
        /> */}
        <S.Earth
          src="http://salehriaz.com/404Page/img/earth.svg"
          width="100px"
        />
        <S.Moon src="http://salehriaz.com/404Page/img/moon.svg" width="80px" />
        <S.AstronautBox>
          <S.Astronaut
            src="http://salehriaz.com/404Page/img/astronaut.svg"
            width="140px"
          />
        </S.AstronautBox>
        <S.LilacBox>
          <S.Lilac src="/icons/favicon-32x32.png" />
        </S.LilacBox>
      </S.Objects>
      <S.Star>
        <S.Star1 />
        <S.Star2 />
        <S.Star3 />
        <S.Star4 />
        <S.Star5 />
        <S.Star6 />
        <S.Star7 />
        <S.Star8 />
        <S.Star9 />
        <S.Star10 />
      </S.Star>
    </S.ErrorPage>
  );
};

export default NotFound;
