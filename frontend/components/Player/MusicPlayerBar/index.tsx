import React, { useState } from "react";
import * as S from "./style";
import CustomIconButton from "@/components/common/CustomIconButton";
import BasicImage from "@/components/common/BasicImage";
import BasicText from "@/components/common/BasicText";
import { IoPlay, IoPause, IoPlayForward } from "react-icons/io5";
import { RiPlayListFill } from "react-icons/ri";
import Drawer from "@/components/common/Drawer";

interface MusicPlayerBarProps {
  data: {
    name: string;
    albumImage: string;
    nickname: string;
  };
  onClickEvent: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const MusicPlayerBar = ({ data, onClickEvent }: MusicPlayerBarProps) => {
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
  const [state, setState] = React.useState({ bottom: false });
  const [nowOpen, setNowOpen] = useState("");
  const toggleDrawer =
    (anchor: string, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <div>
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
            {playState ? (
              <IoPlay size="2.5rem" color="#FFFFFF" />
            ) : (
              <IoPause size="2.5rem" color="#FFFFFF" />
            )}
          </CustomIconButton>
          <CustomIconButton handleOnClickButton={handleClickForward}>
            <IoPlayForward size="1.5rem" color="#FFFFFF" />
          </CustomIconButton>
          <CustomIconButton
            handleOnClickButton={(e) => {
              toggleDrawer("bottom", true)(e);
              setNowOpen("playlist");
            }}
          >
            <RiPlayListFill size="1.5rem" color="#FFFFFF" />
          </CustomIconButton>
        </S.RightWrapper>
      </S.BarWrapper>
      <Drawer
        inner={nowOpen}
        toggleDrawer={toggleDrawer}
        state={{ ...state }}
        anchor={"bottom"}
      />
    </div>
  );
};

export default MusicPlayerBar;
