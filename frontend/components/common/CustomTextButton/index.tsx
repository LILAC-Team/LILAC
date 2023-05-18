import * as S from "./style";
import BasicText from "../BasicText";
import BasicImage from "../BasicImage";

interface CustomTextButtonProps {
  text: string;
  size?: string;
  font?: string;
  fontColor?: string;
  border?: string;
  isBackground?: boolean;
  isDisabled?: boolean;
  radius?: string;
  isImage?: boolean;
  src?: string;
  handleOnClickButton?: () => void;
}

const CustomTextButton = ({
  text,
  size = "100%",
  font,
  fontColor,
  border = "none",
  isBackground = true,
  isDisabled = false,
  radius = "1rem",
  isImage = false,
  src = "",
  handleOnClickButton,
}: CustomTextButtonProps) => {
  return (
    <S.CustomTextButton
      onClick={handleOnClickButton}
      border={border}
      isBackground={isBackground}
      isDisabled={isDisabled}
      radius={radius}
    >
      {isImage && (
        <S.IconImage>
          <BasicImage isAlbumPage={true} src={src} size="1.6rem" />
        </S.IconImage>
      )}
      <S.TextDiv>
        <BasicText text={text} size={size} color={fontColor} font={font} />
      </S.TextDiv>
    </S.CustomTextButton>
  );
};

export default CustomTextButton;
