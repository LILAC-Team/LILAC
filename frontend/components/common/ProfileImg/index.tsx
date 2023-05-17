import { Fragment } from "react";
import * as S from "./style";
import { MdModeEdit } from "@react-icons/all-files/md/MdModeEdit";

interface ProfileImgProps {
  src?: string;
  size?: string;
  onClickEvent?: (e: any) => void;
  isEditable?: boolean;
}

const ProfileImg = ({
  src = "/defaultProfile.svg",
  size = "100%",
  onClickEvent,
  isEditable = false,
}: ProfileImgProps) => {
  return (
    <Fragment>
      {isEditable ? (
        <S.ProfileImage src={src} size={size} onChange={onClickEvent}>
          <S.EditIconWrapper>
            <label htmlFor="featured-image">
              <MdModeEdit className="edit-icon" size={20} color="white" />
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
        <S.ProfileImage src={src} size={size} onChange={onClickEvent} />
      )}
    </Fragment>
  );
};

export default ProfileImg;
