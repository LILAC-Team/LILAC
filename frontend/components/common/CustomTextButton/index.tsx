import * as S from "./style";
import BasicText from "../BasicText";

interface CustomTextButtonProps {
  text: string;
  size?: string;
  font?: string;
  fontColor?: string;
  border?: string;
  isBackground?: boolean;
  isDisabled?: boolean;
  radius?: string;
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
      <BasicText text={text} size={size} color={fontColor} font={font} />
    </S.CustomTextButton>
  );
};

export default CustomTextButton;
