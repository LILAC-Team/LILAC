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
  showAlbumDetail: boolean;
}

const AlbumCard = ({
  onClickEvent,
  data,
  showAlbumDetail = false,
}: AlbumCardProps) => {
  return (
    <S.AlbumCard showAlbumDetail={showAlbumDetail} onClick={onClickEvent}>
      <S.AlbumCardImg>
        <BasicImage src={data.albumImage} size="100%" />
      </S.AlbumCardImg>
      <S.AlbumCardTitle>
        <BasicText
          text={data.name}
          size="1rem"
          color={"#ffffff"}
          font={""}
        ></BasicText>
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
            size="1rem"
            color={"#ffffff"}
            font={""}
          ></BasicText>
        </S.AlbumCardDetail>
      )}
    </S.AlbumCard>
  );
};

export default AlbumCard;
