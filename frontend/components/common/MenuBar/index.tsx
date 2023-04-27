import * as S from "./style";
import CustomIconButton from "../CustomIconButton";
import { BiCommentDetail } from "react-icons/bi";
import { RiPlayListFill } from "react-icons/ri";

const MenuBar = () => {
  const handleCommentClick = () => {
    console.log("Show Comment List Modal");
  };
  const handleListClick = () => {
    console.log("Show Music List Modal");
  };

  return (
    <S.MenuWrapper>
      <CustomIconButton handleOnClickButton={handleCommentClick}>
        <BiCommentDetail size="1.125rem" color="#FFFFF" />
      </CustomIconButton>
      <CustomIconButton handleOnClickButton={handleListClick}>
        <RiPlayListFill size="1.125rem" color="#FFFFF" />
      </CustomIconButton>
    </S.MenuWrapper>
  );
};

export default MenuBar;
