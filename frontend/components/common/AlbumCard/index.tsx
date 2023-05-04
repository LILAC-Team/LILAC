import * as S from "./style";
import BasicImage from "../BasicImage";
import BasicText from "../BasicText";

interface AlbumCardProps {
  onClickEvent: () => void;
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
  albumSize = "150%",
  titleSize = "100%",
  font,
  showAlbumDetail = false,
}: AlbumCardProps) => {
  return (
    <S.AlbumCard showAlbumDetail={showAlbumDetail} onClick={onClickEvent}>
      <S.AlbumCardImg>
        <BasicImage src={data.albumImage} size={albumSize} />
      </S.AlbumCardImg>
      <S.AlbumCardTitle>
        <BasicText
          text={data.name}
          size={titleSize}
          isOverflow={true}
          font={font}
        />
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
          />
        </S.AlbumCardDetail>
      )}
    </S.AlbumCard>
  );
};

export default AlbumCard;
