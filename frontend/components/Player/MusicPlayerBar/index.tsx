import { useState } from "react";
import * as S from "./style";
import CustomIconButton from "@/components/common/CustomIconButton";
import BasicImage from "@/components/common/BasicImage";
import BasicText from "@/components/common/BasicText";
import { IoPlay, IoPause, IoPlayForward } from "react-icons/io5";
import { RiPlayListFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import ReactPlayer from "react-player";
import { togglePlay, nextTrack, setTrack } from "@/store/modules/playList";

interface MusicPlayerBarProps {
  data: {
    name: string;
    albumImage: string;
    nickname: string;
  };
  onClickEvent: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

interface MusicControllerState {
  playList: {
    playing: boolean;
    currentTrackingIndex: number;
    currSrc: string;
    musicList: Array<Object>;
    listSize: number;
  };
}

const MusicPlayerBar = ({ data, onClickEvent }: MusicPlayerBarProps) => {
  const [playState, setPlayState] = useState(false);
  const dispatch = useDispatch();
  const { playing, currentTrackingIndex, currSrc } = useSelector(
    (state: MusicControllerState) => state.playList
  );

  const handleClickPlay = () => {
    console.log("playing Change");
    dispatch(togglePlay());
    console.log("playing: ", playing);
  };

  const handleClickForward = () => {
    dispatch(nextTrack());
    console.log("Play next music");
  };

  const handleClickList = () => {
    console.log("Show Music List Modal");
  };

  return (
    <div>
      <S.ReactPlayerWrap>
        <ReactPlayer
          playing={playing}
          url="https://d1nj0um6xv6zar.cloudfront.net/musics/music-b08846fb-87be-4acf-a842-4df6a2e12464.m3u8"
          config={{
            file: {
              forceAudio: true,
              forceHLS: true,
            },
          }}
        />
      </S.ReactPlayerWrap>
      <S.BarWrapper>
        <S.LeftWrapper onClick={onClickEvent}>
          <S.AlbumImg>
            <BasicImage src={data.albumImage} radius={0.15} />
          </S.AlbumImg>
          <S.TextWrapper>
            <S.Title>
              <BasicText
                text={data.name}
                size="1.125rem"
                font="NotoSansKR700"
              />
            </S.Title>
            <S.Artist>
              <BasicText
                text={data.nickname}
                size="0.75rem"
                font="NotoSansKR400"
              />
            </S.Artist>
          </S.TextWrapper>
        </S.LeftWrapper>
        <S.RightWrapper>
          <CustomIconButton handleOnClickButton={handleClickPlay}>
            {playing ? (
              <IoPlay size="2.5rem" color="#FFFFFF" />
            ) : (
              <IoPause size="2.5rem" color="#FFFFFF" />
            )}
          </CustomIconButton>
          <CustomIconButton handleOnClickButton={handleClickForward}>
            <IoPlayForward size="1.5rem" color="#FFFFFF" />
          </CustomIconButton>
          <CustomIconButton handleOnClickButton={handleClickList}>
            <RiPlayListFill size="1.5rem" color="#FFFFFF" />
          </CustomIconButton>
        </S.RightWrapper>
      </S.BarWrapper>
    </div>
  );
};

export default MusicPlayerBar;
