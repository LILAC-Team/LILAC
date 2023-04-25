import * as S from "./style";
import { MdModeEdit } from "@react-icons/all-files/md/MdModeEdit";
import defalutProfile from "../../../assets/img/common/defaultProfile.png";

interface ProfileImgProps {
  src: string;
  size: number;
  to?: string;
  isEditable?: boolean;
}

const ProfileImg = ({ src, size, isEditable, to = "" }: ProfileImgProps) => {
  return (
    <>
      {isEditable ? (
        <S.ProfileImage className="editable" src={src} size={size}>
          <S.EditIconWrapper>
            <label htmlFor="featured-image">
              <MdModeEdit className="edit-icon" size={20} />
            </label>
            <S.EditIcon
              id="featured-image"
              type="file"
              accept="image/*"
              defaultValue=""
            />
          </S.EditIconWrapper>
        </S.ProfileImage>
      ) : (
        <S.ProfileImage src={src} size={size} to={to} />
      )}
    </>
  );
};

export default ProfileImg;
