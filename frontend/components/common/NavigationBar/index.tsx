import * as S from "./style";
import CustomIconButton from "../CustomIconButton";
import { RiHome4Line, RiAddLine } from "react-icons/ri";
import { MdOutlineLibraryMusic } from "react-icons/md";
import Link from "next/link";

const NavigationBar = () => {
  const handleHomeClick = () => {
    console.log("Navigate to Main Page");
  };
  const handleAddClick = () => {
    console.log("Navigate to Add-Album Page");
  };
  const handlePlaylistClick = () => {
    console.log("Navigate to Playlist Page");
  };

  return (
    <S.NavigationWrapper>
      <S.ButtonWrapper>
        <Link href={"/"}>
          <CustomIconButton handleOnClickButton={handleHomeClick}>
            <RiHome4Line size="1.125rem" color="#CCA4FC" />
          </CustomIconButton>
        </Link>
      </S.ButtonWrapper>
      <S.ButtonWrapper>
        <Link href={"/"}>
          <CustomIconButton handleOnClickButton={handleAddClick}>
            <RiAddLine size="1.125rem" color="#CCA4FC" />
          </CustomIconButton>
        </Link>
      </S.ButtonWrapper>
      <S.ButtonWrapper>
        <Link href={"/"}>
          <CustomIconButton handleOnClickButton={handlePlaylistClick}>
            <MdOutlineLibraryMusic size="1.125rem" color="#CCA4FC" />
          </CustomIconButton>
        </Link>
      </S.ButtonWrapper>
    </S.NavigationWrapper>
  );
};

export default NavigationBar;
