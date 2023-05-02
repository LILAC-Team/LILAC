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
            <CustomIconButton>
              <RiHome4Line size="1.25rem" color="#CCA4FC" />
            </CustomIconButton>
          </Link>
        </S.ButtonWrapper>
        <S.ButtonWrapper>
          <Link href={"/"}>
            <CustomIconButton>
              <RiAddLine size="1.25rem" color="#CCA4FC" />
            </CustomIconButton>
          </Link>
        </S.ButtonWrapper>
        <S.ButtonWrapper>
          <Link href={"/"}>
            <CustomIconButton>
              <MdOutlineLibraryMusic size="1.25rem" color="#CCA4FC" />
            </CustomIconButton>
          </Link>
        </S.ButtonWrapper>
      </S.NavigationWrapper>
    </div>
  );
};

export default NavigationBar;
