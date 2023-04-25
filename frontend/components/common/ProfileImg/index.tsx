import { Fragment } from "react";
import * as S from "./style";
import { MdModeEdit } from "@react-icons/all-files/md/MdModeEdit";

interface ProfileImgProps {
  src?: string;
  size: number;
  to?: string;
  isEditable?: boolean;
}

const ProfileImg = ({
  src = "/defaultProfile.svg",
  size,
  isEditable,
  to = "",
}: ProfileImgProps) => {
  return (
    <Fragment>
      {isEditable ? (
        <S.ProfileImage src={src} size={size}>
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
    </Fragment>
  );
};

export default ProfileImg;
