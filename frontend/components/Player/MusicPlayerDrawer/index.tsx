import BasicImage from "@/components/common/BasicImage";
import * as S from "./style";
import music from "../../../pages/music.json";
import MenuBar from "@/components/common/MenuBar";

const MusicPlayerDrawer = () => {
  return (
    <S.Player>
      <BasicImage
        src={music.albumImage}
        size="20rem"
        radius={10}
        isRotate={true}
      />
      <MenuBar />
    </S.Player>
  );
};

export default MusicPlayerDrawer;
