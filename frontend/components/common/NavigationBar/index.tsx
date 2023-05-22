import * as S from "./style";
import CustomIconButton from "../CustomIconButton";
import { RiHome4Line, RiAddLine } from "react-icons/ri";
import { MdOutlineLibraryMusic } from "react-icons/md";
import Link from "next/link";

const NavigationBar = () => {
  return (
    <div>
      <S.NavigationWrapper>
        <S.ButtonWrapper>
          <Link href={"/"}>
            <CustomIconButton size="2.5rem">
              <RiHome4Line size="1.5rem" color="#CCA4FC" />
            </CustomIconButton>
          </Link>
        </S.ButtonWrapper>
        <S.ButtonWrapper>
          <Link href={"/form"}>
            <CustomIconButton size="2.5rem">
              <RiAddLine size="1.5rem" color="#CCA4FC" />
            </CustomIconButton>
          </Link>
        </S.ButtonWrapper>
        <S.ButtonWrapper>
          <Link href={"/album"}>
            <CustomIconButton size="2.5rem">
              <MdOutlineLibraryMusic size="1.5rem" color="#CCA4FC" />
            </CustomIconButton>
          </Link>
        </S.ButtonWrapper>
      </S.NavigationWrapper>
    </div>
  );
};

export default NavigationBar;
