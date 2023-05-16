import * as S from "./style";
import BasicImage from "../BasicImage";
import BasicText from "../BasicText";
import { CLOUD_FRONT } from "@/api";

interface AlbumCardProps {
  onClickEvent?: () => void;
  data: {
    name: string;
    albumImage: string;
    releasedDate: string;
    nickname: string;
  };
  albumSize?: string;
  titleSize?: string;
  font?: string;
  showAlbumDetail: boolean;
}

const AlbumCard = ({
  onClickEvent,
  data,
  albumSize = "100%",
  titleSize = "100%",
  font,
  showAlbumDetail = false,
}: AlbumCardProps) => {
  return (
    <S.AlbumCard showAlbumDetail={showAlbumDetail} onClick={onClickEvent}>
      <S.AlbumCardImg>
        <BasicImage src={CLOUD_FRONT + data.albumImage} size={albumSize} />
      </S.AlbumCardImg>
      <S.AlbumCardDiv>
        <S.AlbumCardTitle>
          <S.AlbumTitleText>{data.name}</S.AlbumTitleText>
        </S.AlbumCardTitle>
        {showAlbumDetail && (
          <S.AlbumCardDetail>
            <BasicText
              text={
                data.nickname +
                " · " +
                data.releasedDate.split("-")[0] +
                "." +
                data.releasedDate.split("-")[1]
              }
              size="80%"
            />
          </S.AlbumCardDetail>
        )}
      </S.AlbumCardDiv>
    </S.AlbumCard>
  );
};

export default AlbumCard;
