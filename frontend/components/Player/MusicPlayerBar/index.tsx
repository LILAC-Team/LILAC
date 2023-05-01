import { useState } from "react";
import * as S from "./style";
import CustomIconButton from "@/components/common/CustomIconButton";
import BasicImage from "@/components/common/BasicImage";
import BasicText from "@/components/common/BasicText";
import { FaPlay, FaPause, FaForward } from "react-icons/fa";
import { RiPlayListFill } from "react-icons/ri";

interface MusicPlayerBarProps {
  data: {
    name: string;
    albumImage: string;
    nickname: string;
  };
}

const MusicPlayerBar = ({ data }: MusicPlayerBarProps) => {
  const [playState, setPlayState] = useState(false);

  const handleClickPlay = () => {
    if (playState) {
      setPlayState((props) => !props);
      console.log("Play");
    } else {
      setPlayState((props) => !props);
      console.log("Pause");
    }
  };

  const handleClickForward = () => {
    console.log("Play next music");
  };

  const handleClickList = () => {
    console.log("Show Music List Modal");
  };

  return (
    <S.BarWrapper>
      <S.LeftWrapper>
        <S.AlbumImg>
          <BasicImage src={data.albumImage} radius={0.75} />
        </S.AlbumImg>
        <S.TextWrapper>
          <S.Title>
            <BasicText text={data.name} size="1.125rem" />
          </S.Title>
          <S.Artist>
            <BasicText text={data.nickname} size="0.75rem" />
          </S.Artist>
        </S.TextWrapper>
      </S.LeftWrapper>
      <S.RightWrapper>
        <CustomIconButton handleOnClickButton={handleClickPlay}>
          {playState ? (
            <FaPlay size="2rem" color="#FFFFFF" />
          ) : (
            <FaPause size="2rem" color="#FFFFFF" />
          )}
        </CustomIconButton>
        <CustomIconButton handleOnClickButton={handleClickForward}>
          <FaForward size="1.5rem" color="#FFFFFF" />
        </CustomIconButton>
        <CustomIconButton handleOnClickButton={handleClickList}>
          <RiPlayListFill size="1.5rem" color="#FFFFF" />
        </CustomIconButton>
      </S.RightWrapper>
    </S.BarWrapper>
  );
};

export default MusicPlayerBar;
