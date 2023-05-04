import * as S from "./style";
import BasicImage from "../../common/BasicImage";
import BasicText from "../../common/BasicText";
import { RxHamburgerMenu } from "react-icons/rx";

interface MusicCardProps {
  onClickEvent?: () => void;
  data: {
    code: string;
    name: string;
    albumImage: string | ArrayBuffer;
    artistName: string;
  };
  isEditable: boolean;
}

const MusicCard = ({
  onClickEvent,
  data,
  isEditable = false,
}: MusicCardProps) => {
  return (
    <S.MusicCard onClick={onClickEvent}>
      <S.LeftWrapper>
        <S.CoverImg>
          <BasicImage src={data.albumImage} radius={0.75} />
        </S.CoverImg>
        <S.TextWrapper>
          <S.Title>
            <BasicText text={data.name} size="125%" font="NotoSansKR700" />
          </S.Title>
          <S.Singer>
            <BasicText text={data.artistName} font="NotoSansKR400" />
          </S.Singer>
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
