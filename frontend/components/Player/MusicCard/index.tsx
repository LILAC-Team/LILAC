import BasicImage from "../../common/BasicImage";
import BasicText from "../../common/BasicText";
import * as S from "./style";
import { RxHamburgerMenu } from "react-icons/rx";

interface MusicCardProps {
  onClickEvent: () => void;
  data: {
    name: string;
    albumImage: string;
    nickname: string;
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
            <BasicText text={data.name} size="125%" />
          </S.Title>
          <S.Singer>
            <BasicText text={data.nickname} />
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
