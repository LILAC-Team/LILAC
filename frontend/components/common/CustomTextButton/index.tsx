import * as S from "./style";
import BasicText from "../BasicText";

interface CustomTextButtonProps {
  text: string;
  size: string;
  font: string;
  fontColor: string;
  border?: string;
  isBackground?: boolean;
  isDisabled?: boolean;
  handleOnClickButton: () => void;
}

const CustomTextButton = ({
  text,
  size,
  font,
  fontColor,
  border,
  isBackground,
  isDisabled,
  handleOnClickButton,
}: CustomTextButtonProps) => {
  return (
    <S.CustomTextButton
      onClick={handleOnClickButton}
      border={border}
      isBackground={isBackground}
      isDisabled={isDisabled}
    >
      <BasicText text={text} size={size} color={fontColor} font={font} />
    </S.CustomTextButton>
  );
};

export default CustomTextButton;
