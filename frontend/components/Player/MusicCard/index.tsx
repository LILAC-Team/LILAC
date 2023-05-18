import * as S from "./style";
import BasicImage from "../../common/BasicImage";
import BasicText from "../../common/BasicText";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState } from "react";

interface MusicCardProps {
  onClickEvent?: () => void;
  data: {
    code: string;
    name: string;
    albumImage: string;
    artistName: string;
    playtime?: number;
  };
  isEditable: boolean;
  isTitle?: boolean;
  isUpload?: boolean;
}

const MusicCard = ({
  onClickEvent,
  data,
  isEditable = false,
  isTitle = false,
  isUpload = false,
}: MusicCardProps) => {
  const [convertTime, setConvertTime] = useState("");

  useEffect(() => {
    setConvertTime(
      (data.playtime - (data.playtime % 60)) / 60 +
        " : " +
        (data.playtime % 60 >= 10
          ? data.playtime % 60
          : "0" + (data.playtime % 60))
    );
  }, [data.playtime]);
  return (
    <S.MusicCard onClick={onClickEvent}>
      <S.LeftWrapper>
        <S.CoverImg>
          {isUpload ? (
            <BasicImage
              isAlbumPage={true}
              src={data.albumImage}
              radius={0.75}
              size="4rem"
            />
          ) : (
            <BasicImage src={data.albumImage} radius={0.75} size="4rem" />
          )}
        </S.CoverImg>
        <S.TextWrapper>
          <S.TopWrapper>
            <S.Title>
              <BasicText text={data.name} size="110%" font="NotoSansKR700" />
            </S.Title>
            {isTitle && (
              <S.isTitle>
                <BasicText
                  text="Title"
                  size="50%"
                  font="NotoSansKR400"
                  color="black"
                />
              </S.isTitle>
            )}
          </S.TopWrapper>
          <S.BottomWrapper>
            <S.Singer>
              <BasicText
                text={data.artistName}
                size="80%"
                font="NotoSansKR400"
              />
            </S.Singer>
            <S.Time>
              <BasicText text={convertTime} size="65%" font="NotoSansKR400" />
            </S.Time>
          </S.BottomWrapper>
        </S.TextWrapper>
      </S.LeftWrapper>
      {isEditable && (
        <S.Hamberger>
          <RxHamburgerMenu color="#ffffff" size="75%" />
        </S.Hamberger>
      )}
    </S.MusicCard>
  );
};

export default MusicCard;
