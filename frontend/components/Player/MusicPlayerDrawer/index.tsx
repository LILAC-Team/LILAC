import BasicImage from "@/components/common/BasicImage";
import * as S from "./style";
import music from "../../../pages/music.json";
import MenuBar from "@/components/common/MenuBar";
import BasicText from "@/components/common/BasicText";
import MusicController from "../MusicController";

const MusicPlayerDrawer = () => {
  return (
    <S.Player>
      <S.AlbumCover>
        <BasicImage
          src={music.albumImage}
          size="15rem"
          radius={10}
          isRotate={true}
        />
      </S.AlbumCover>
      <S.Title>
        <BasicText text={music.name} size="2rem" />
      </S.Title>
      <S.Artist>
        <BasicText text={music.artistName} />
      </S.Artist>
      <S.MusicBar>
        <div>tmp</div>
      </S.MusicBar>
      <S.ControllBar>
        <MusicController />
      </S.ControllBar>
      <MenuBar />
    </S.Player>
  );
};

export default MusicPlayerDrawer;
