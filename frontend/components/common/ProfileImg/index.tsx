import * as S from "./style";

const ProfileImg = ({
  src,
  size,
  to,
  isEditable,
}: {
  src: string;
  size: number;
  to?: string;
  isEditable: boolean;
}) => {
  return (
    <>
      <S.ProfileImage src={src} />
    </>
  );
};

export default ProfileImg;
